# Environemnt setup

- [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) (this should be used instead of npm as the project has a yarn lock file, using npm will cause conflicts)
- [Flipper](https://fbflipper.com/) - this is used as the react native debugging tool, two additional plugins need to be installed within flipper.
- [ios-deploy](https://github.com/ios-control/ios-deploy#readme) - This will allow building the ios apps to device from the command line

Flipper plugins - These are found within the manage plugins tab when using the flipper client

- Flipper plugin - reactotron
- Flipper plugin - flipper-plugin-bridgespy
- Flipper plugin - rn-async-storage-flipper

Follow the `React Native CLI Quickstart` guide on the [React Native environment setup docs](https://reactnative.dev/docs/environment-setup)

### Additional requirements for Apple M1 machines

- Minimum Node version 15.X
- ruby version 2.7.2 - use [ruby version manager](https://rvm.io/) the project .ruby-gemset file will set the correct version
- cocoapods should be installed via the local project gemfile (bundle install)

## Managing ios provisioning profiles

FastLane match is used for provisioning iOS builds.
Make sure bundle install has run.
Use any of these commands to setup provisioning:

- fastlane match adhoc
- fastlane match appstore
- fastlane match development

## Building iOS target

```bash
bundle install
yarn install
bundle exec pod install --project-directory=./ios
```

- `yarn ios` builds against staging environment to the ios simulator with the React Native debugging tools attached allowing flipper to be used.
- `yarn iosStaging` builds release app (no dev tools attached) that is targetting the STAGING environment
- `yarn iosRelease` builds release app (no dev tools attached) that is targetting the PRODUCTION environment
- `yarn ios --device "NAME OF DEVICE"` This will build to the ios device plugged into the machine - this requires AD HOC profivisioning profiles setup in the signing and configuration section of xcode and installed on the developers machine.

## Building Android target

```bash
yarn install
```

Android will default to building the device to any device attached to the machine, as long as USB debugging has been enabled in the device developer tools.

If no device is attached it will look for simulators installed via android studio

- `yarn android` builds against staging environment to the ios simulator with the React Native debugging tools attached allowing flipper to be used.
- `yarn androidStaging` builds release app (no dev tools attached) that is targetting the STAGING environment
- `yarn androidRelease` builds release app (no dev tools attached) that is targetting the PRODUCTION environment.