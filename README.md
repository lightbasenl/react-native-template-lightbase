# Lightbase React Native Template

## Initialise new project with the template

`npx react-native init LightbaseProjectName --template react-native-template-lightbase`
`yarn install` - will also configure husky pre commits for semantic realse conformity

## Pre-requisites after initialisation

### Semantic relases and commitlint with husky

- appcenter build scripts manage the semantic relases with automated changelogs and release commits
- commits need to conform to the commitlint config `chore: feat: fix:` types are currently only supported

### Setup git branches

- development branch (main) - alpha release cycle
- acceptance branch - rc pre-release cycle
- production branch - main release cycle

### Create Slack channel to subscribed to github updates

- used for pinging members of updates to repo and MR review comments

### Create Appcenter projects for android and iOS

- ENV VARIABLES within appcenter
  - GITHUB_TOKEN - used for semantic relases
  - SLACK_CHANNEL - to inform sla
  - SLACK_TOKEN
  - SKIP_FLIPPER=YES - improves iOS build times considerably
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
- `npx semantic-release --no-ci` - assume GITHUB_TOKEN is included in bash or zshl profile
