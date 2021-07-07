#!/bin/bash

COMMIT=$(git show --pretty=format:%s -s HEAD)
echo "Running appcenter-pre-build.sh"

# Only run prebuild script for release branches
if [ "$APPCENTER_BRANCH" == "production" ] || [ "$APPCENTER_BRANCH" == "acceptance" ] || [ "$APPCENTER_BRANCH" == "development" ]; then

    [ -z "$APPCENTER_XCODE_PROJECT" ] && BUILD=android || BUILD=ios

    echo "Checking if current $BUILD needs to be cancelled for $COMMIT"
    cancelBuild () {
    curl -X PATCH "https://api.appcenter.ms/v0.1/apps/Lightbase/MyApp-$BUILD/builds/$APPCENTER_BUILD_ID" -H  "accept: application/json" -H  "X-API-Token: $APPCENTER_TOKEN" -H  "Content-Type: application/json" -d "{  \"status\": \"cancelling\"}"
    }

    # Cancel build if not generated from a semantic release commit to ensure the release commit has all generated release notes
    if  [[ $COMMIT != "chore(release)"* ]]; then
        npx semantic-release
        cancelBuild
    fi

    # Set the build number on android and iOS
    BUILD_NUMBER=$(git show -s --format=%ct)
    # Semantic release will auto bump package.json so ensure ios and android use the same version
    PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')

    echo "Setting build number to $BUILD_NUMBER"
    sed -i '' 's/versionCode=.*/versionCode='$BUILD_NUMBER'/' android/gradle.properties
    plutil -replace CFBundleVersion -string $BUILD_NUMBER ios/MyApp/Info.plist

    echo "Setting app version number to $PACKAGE_VERSION"
    sed -i '' 's/versionName=.*/versionName='$PACKAGE_VERSION'/' android/gradle.properties
    plutil -replace CFBundleShortVersionString -string $PACKAGE_VERSION ios/MyApp/Info.plist

    # Set the correct ENVFILE based on the current branch for ios (android managed by gradle)
    if [ "$APPCENTER_BRANCH" == "production" ]; then
        echo -ne '\nBUILD_NUMBER='$BUILD_NUMBER'' >> .env.production
        cp .env.production .env
    elif [ "$APPCENTER_BRANCH" == "acceptance" ]; then
        echo -ne '\nBUILD_NUMBER='$BUILD_NUMBER'' >> .env.staging
        cp .env.staging .env
    elif [ "$APPCENTER_BRANCH" == "development" ]; then
        echo -ne '\nBUILD_NUMBER='$BUILD_NUMBER'' >> .env.staging
        cp .env.staging .env
    else
        echo -ne '\nBUILD_NUMBER='$BUILD_NUMBER'' >> .env.staging
        cp .env.staging .env
    fi

    cat .env

fi