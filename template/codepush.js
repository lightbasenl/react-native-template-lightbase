const http = require('https');
const { spawn } = require('child_process');

const bundleOutputIOS = 'build/CodePush/main.jsbundle';
const bundleMapOutputIOS = 'build/CodePush/main.jsbundle.map';

const bundleOutputAndroid = 'build/CodePush/index.android.bundle';
const hermesOutputMap = 'build/CodePush/index.android.bundle.hbc.map';
const composedMapOutputAndroid = 'build/CodePush/index.android.bundle.composed.map';
const bundleMapOutputAndroid = 'build/CodePush/index.android.bundle.map';

const flags = ['bugsnag_token', 'ios_app', 'ios_token', 'android_app', 'android_token', 'deployment'];

async function main() {
  try {
    await checkGitStatus();
  } catch (e) {
    return logError(e);
  }

  for (const flag of flags) {
    if (!process.argv.find((el) => el.includes(`${flag}=`))) {
      return logError(`Please provide ${flag}= flag`);
    }
  }

  const ios_token = process.argv.find((el) => el.includes('ios_token=')).replace('ios_token=', '');
  const android_token = process.argv
    .find((el) => el.includes('android_token='))
    .replace('android_token=', '');

  const ios_app = process.argv.find((el) => el.includes('ios_app=')).replace('ios_app=', '');
  const android_app = process.argv.find((el) => el.includes('android_app=')).replace('android_app=', '');

  try {
    // IOS
    info('Starting ios codepush deployment');

    await createAppcenterRelease({ app: ios_app });

    info('Uploading ios source maps to bugsnag');

    const codepushVersionIos = await getLatestDeploymentVersion({
      app: ios_app,
      token: ios_token,
    });

    await uploadToBugsnag({
      bundleId: `codepush:v${codepushVersionIos}`,
      source: bundleMapOutputIOS,
      bundle: bundleOutputIOS,
      platform: 'ios',
    });

    // ANDROID
    info('Starting android codepush deployment');

    await createAppcenterRelease({ app: android_app });

    info('Uploading android source maps to bugsnag');

    await combineSourceMaps();

    const codepushVersionAndroid = await getLatestDeploymentVersion({
      app: android_app,
      token: android_token,
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
    const appcenterArgs = [
      'codepush',
      'release-react',
      `--app=${app}`,
      '--output-dir=build',
      '-m',
      '--disable-duplicate-release-error',
    ];

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
  const BUGSNAG_TOKEN = process.argv
    .find((el) => el.includes('bugsnag_token='))
    .replace('bugsnag_token=', '');

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
    const deploymentName = process.argv.find((el) => el.includes('deployment=')).replace('deployment=', '');

    const options = {
      host: 'api.appcenter.ms',
      path: `/v0.1/apps/${app}/deployments/${deploymentName}`,
      headers: { 'X-API-Token': token },
      methiod: 'GET',
    };

    const req = http.request(options, (res) => {
      let str = '';
      res.on('data', (chunk) => {
        str += chunk;
      });
      res.on('end', () => {
        const data = JSON.parse(str);

        const latestCodepushVersion = Number((data?.latest_release?.label || 'v0').replace('v', ''));

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
