# Lightbase React Native Template

## Initialise new project with the template

npx react-native init LightbaseProjectName --template react-native-template-lightbase

## Pre-requisites after initialisation

### Setup git branches

- development branch (main)
- production branch

### Create Appcenter projects for android and iOS

- ENV VARIABLES within appcenter. TODO
- Add build pipelines for android and ios (development and production)

### Setup Codepush for iOS and android projects

- Copy codepush staging tokens to env.staging and .env
- Copy codepush production tokens to env.staging and .env

### Create single bugsnag project for both ios and android

- Copy bugsnag api key to all .env files

### Create private github repo for fastlane match provisioning profiles and certificate handling

- TODO

## Updating Template

- Template should be updated on any major RN release
- Bump project version
- `npm publish` - when ready
