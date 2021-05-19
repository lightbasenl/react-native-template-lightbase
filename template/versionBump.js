const fs = require('fs');

function processLineByLine() {
  const contents = fs.readFileSync('package.json');
  const packageJson = JSON.parse(contents);
  const { name, version } = packageJson;
  const [major, minor, patch] = version.split('.');

  console.log('current version: ', { major }, { minor }, { patch }, 'name: ', name);

  let newPatch = patch;
  let newMinor = minor;
  let newMajor = major;

  const flag = process.argv.filter((el) => el.includes('version='));
  if (!flag.length) {
    newPatch = Number(patch) + 1;
  } else if (flag[0].includes('minor')) {
    newMinor = Number(minor) + 1;
    newPatch = 0;
  } else {
    newMajor = Number(major) + 1;
    newMinor = 0;
    newPatch = 0;
  }
  const newVersion = `${newMajor}.${newMinor}.${newPatch}`;
  console.log({ newVersion });

  replace({
    file: './package.json',
    from: /"version": "\d{1,}\.\d{1,}\.\d{1,}"/,
    to: `"version": "${newVersion}"`,
  });

  replace({
    file: './android/gradle.properties',
    from: /versionName=\d{1,}\.\d{1,}\.\d{1,}/,
    to: `versionName=${newVersion}`,
  });

  replace({
    file: `./ios/${name}/Info.plist`,
    from: /<string>\d{1,}\.\d{1,}\.\d{1,}<\/string>/,
    to: `<string>${newVersion}</string>`,
  });
}

function replace({ file, from, to }) {
  const data = fs.readFileSync(file, 'utf8');
  const result = data.replace(from, to);
  fs.writeFile(file, result, 'utf8', (err) => !!err && console.log(err));
}

processLineByLine();
