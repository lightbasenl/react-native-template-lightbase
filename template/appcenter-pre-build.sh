#!/bin/bash

echo "Running appcenter-pre-build.sh"

function notifySlack () {
    if [ -z "$SLACK_CHANNEL" ]
    then
        echo "You need to define the SLACK_CHANNEL variable in App Center"
        exit 1
    fi
    if [ -z "$SLACK_TOKEN" ]
    then
        echo "You need to define the SLACK_TOKEN variable in App Center"
        exit 1
    fi
    DATA='{"channel":"'$SLACK_CHANNEL'","text":"'$1'",}'
    curl -X POST -H "Authorization: Bearer $SLACK_TOKEN" -H 'Content-type: application/json' --data "$DATA" https://slack.com/api/chat.postMessage
}

# Set the build number on android and iOS
BUILD_NUMBER=$(git show -s --format=%ct)
echo "Setting build number to $BUILD_NUMBER"
sed -i '' 's/versionCode=.*/versionCode='$BUILD_NUMBER'/' android/gradle.properties
plutil -replace CFBundleVersion -string $BUILD_NUMBER ios/MyApp/Info.plist

# Set the correct ENVFILE based on the current branch for ios (android managed by gradle)
if [ "$IS_PRODUCTION" == "true" ]; then
    echo -ne '\nBUILD_NUMBER='$BUILD_NUMBER'' >> .env.production
    cp .env.production .env
else
    echo -ne '\nBUILD_NUMBER='$BUILD_NUMBER'' >> .env.staging
    cp .env.staging .env
fi

cat .env