const http = require('https');
const { spawn } = require('child_process');

const ANDROID_APP = 'Lightbase/<ANDROID_APP>';
const ANDROID_CODEPUSH_TOKEN = '<ANDROID_CODEPUSH_TOKEN>';
const IOS_APP = 'Lightbase/<IOS_APP>';
const IOS_CODEPUSH_TOKEN = '<IOS_CODEPUSH_TOKEN>';
const BUGSNAG_TOKEN = '<BUGSNAG_TOKEN>';

const bundleOutputIOS = 'build/CodePush/main.jsbundle';
const bundleMapOutputIOS = 'build/CodePush/main.jsbundle.map';

const bundleOutputAndroid = 'build/CodePush/index.android.bundle';
const hermesOutputMap = 'build/CodePush/index.android.bundle.hbc.map';
const composedMapOutputAndroid = 'build/CodePush/index.android.bundle.composed.map';
const bundleMapOutputAndroid = 'build/CodePush/index.android.bundle.map';

// Releases both android and iOS codepushes to the staging environment
// Bugsnag requires new sourcemaps to map the errors from codepush releases
// new bundleIds are assigned to bugsnag based on Codepush version (refer to bugsnag.tsx)
// Fetch latest codepush production release and upload new sourcemaps to bugsnag with this version number attached

async function main() {
  try {
    await checkGitStatus();
  } catch (e) {
    return logError(e);
  }

  try {
    // IOS
    info('Starting ios codepush deployment');

    await createAppcenterRelease({ app: IOS_APP });

    info('Uploading ios source maps to bugsnag');

    const codepushVersionIos = await getLatestDeploymentVersion({
      app: IOS_APP,
      token: IOS_CODEPUSH_TOKEN,
    });

    await uploadToBugsnag({
      bundleId: `codepush:v${codepushVersionIos}`,
      source: bundleMapOutputIOS,
      bundle: bundleOutputIOS,
      platform: 'ios',
    });

    // ANDROID
    info('Starting android codepush deployment');

    await createAppcenterRelease({ app: ANDROID_APP });

    info('Uploading android source maps to bugsnag');

    await combineSourceMaps();

    const codepushVersionAndroid = await getLatestDeploymentVersion({
      app: ANDROID_APP,
      token: ANDROID_CODEPUSH_TOKEN,
    });

    await uploadToBugsnag({
      bundleId: `codepush:v${codepushVersionAndroid}`,
      source: composedMapOutputAndroid,
      bundle: bundleOutputAndroid,
      platform: 'android',
    });
  } catch (error) {
    logError(error);
  }
}

function checkGitStatus() {
  return new Promise((resolve, reject) => {
    const checkUncommited = spawn('git', ['diff', '--cached', '--exit-code']);
    const checkUnstaged = spawn('git', ['diff', '--exit-code']);

    checkUncommited.on('close', (code) => {
      if (code === 0) {
        checkUnstaged.stdout.on('data', (chunk) => {
          console.log(chunk.toString());
        });

        checkUnstaged.on('close', (code2) => {
          if (code2 === 0) {
            resolve();
          } else {
            reject('Please commit your changes before proceeding');
          }
        });
      } else {
        reject('Please commit your changes before proceeding');
      }
    });
  });
}

function createAppcenterRelease({ app }) {
  return new Promise((resolve, reject) => {
    info('Creating staging codepush release');
    const appcenterArgs = ['codepush', 'release-react', `--app=${app}`, '--output-dir=build', '-m'];

    const uploadToAppcenter = spawn('appcenter', appcenterArgs);

    uploadToAppcenter.stdout.on('data', (chunk) => {
      console.log(chunk.toString());
    });

    uploadToAppcenter.on('close', (code) => {
      if (code) {
        reject('upload to appcenter failed');
      }
      resolve();
    });

    uploadToAppcenter.on('error', (error) => {
      if (error.message.includes('ENOENT')) {
        reject('Appcenter cli is not installed globally please run - npm install -g appcenter-cli');
      } else {
        reject(error.message);
      }
    });
  });
}

// https://docs.bugsnag.com/build-integrations/js/source-maps-react-native/#codepush-and-hermes
function combineSourceMaps() {
  const combine = spawn('./node_modules/react-native/scripts/compose-source-maps.js', [
    bundleMapOutputAndroid,
    hermesOutputMap,
    '-o',
    composedMapOutputAndroid,
  ]);

  return new Promise((resolve, reject) => {
    combine.stdout.on('data', (chunk) => {
      console.log(chunk.toString());
    });

    combine.on('close', (code) => {
      if (code) {
        reject('combine sourcemaps failed');
      }
      info(
        'combined sourcemaps: https://docs.bugsnag.com/build-integrations/js/source-maps-react-native/#codepush-and-hermes'
      );
      resolve(null);
    });
  });
}

function uploadToBugsnag({ bundleId, platform, source, bundle }) {
  const bugsnagArgs = [
    'bugsnag-source-maps',
    'upload-react-native',
    `--platform=${platform}`,
    `--api-key=${BUGSNAG_TOKEN}`,
    `--code-bundle-id=${bundleId}`,
    `--source-map=${source}`,
    `--bundle=${bundle}`,
  ];

  const upload = spawn('npx', bugsnagArgs);

  return new Promise((resolve, reject) => {
    upload.stdout.on('data', (chunk) => {
      console.log(chunk.toString());
    });

    upload.on('error', (error) => {
      if (error.message.includes('ENOENT')) {
        reject('bugsnag-source-maps is not installed in the project - yarn add --dev @bugsnag/source-maps');
      } else {
        reject(error.message);
      }
    });

    upload.on('close', (code) => {
      console.log(code);
      if (code === 0) {
        info(`uploaded ${platform} source maps to bugsnag, bundleId: ${bundleId}`);
        resolve();
      } else {
        reject('upload to bugsnag failed');
      }
    });
  });
}

function getLatestDeploymentVersion({ app, token }) {
  return new Promise((resolve, reject) => {
    const options = {
      host: 'api.appcenter.ms',
      path: `/v0.1/apps/${app}/deployments/Production`,
      headers: { 'X-API-Token': token },
      methiod: 'GET',
    };

    const req = http.request(options, (res) => {
      let str = '';
      res.on('data', (chunk) => {
        str += chunk;
      });
      res.on('end', () => {
        const deployments = JSON.parse(str);
        const latestCodepushVersion = Number((deployments.latest_release.label || 'v0').replace('v', ''));
        info(`Latest codepush version for ${app}: ${latestCodepushVersion}`);

        let codepushVersion = latestCodepushVersion + 1;

        resolve(codepushVersion);
      });
    });
    req.on('error', (err) => {
      reject(err);
    });
    req.end();
  });
}

const COLOR = {
  reset: '\x1b[0m',
  fgRed: '\x1b[31m',
  fgBlue: '\x1b[34m',
};

function info(text) {
  console.log(`${COLOR.fgBlue}[info]${COLOR.reset} ${text}`);
  console.log();
}

function logError(text) {
  console.log(`${COLOR.fgRed}[ERROR!]${COLOR.reset} ${text}`);
  console.log();
}

main();
