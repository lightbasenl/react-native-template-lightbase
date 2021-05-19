# Generate sourcemaps for Bugsnag

# REPLACE <MYAPP_NAME> with your app name and <MY_GITHUB_REPO_SSH> with your repo ssh

BUILD_NUMBER=$(git show -s --format=%ct)
VERSION=$(/usr/libexec/PlistBuddy -c "Print :CFBundleShortVersionString" ios/<MYAPP_NAME>/info.plist)
export $(egrep -v '^#' .env | xargs)

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


if [ "$AGENT_JOBSTATUS" == "Succeeded" ]; then
  if [ "$PLATFORM_TYPE" == "ANDROID" ]; then    
    echo "Uploading Android Source Maps..."
    npx bugsnag-source-maps upload-react-native \
    --platform=android \
    --api-key=$BUGSNAG_API_KEY \
    --code-bundle-id=$BUILD_NUMBER \
    --bundle=android/app/build/generated/assets/react/$APPCENTER_ANDROID_VARIANT/index.android.bundle \
    --source-map=android/app/build/generated/sourcemaps/react/$APPCENTER_ANDROID_VARIANT/index.android.bundle.map

  else 
    echo "Creating iOS Source Maps..."
    npx react-native bundle \
    --platform ios \
    --dev false \
    --entry-file index.js \
    --bundle-output ios-release.bundle \
    --sourcemap-output ios-release.bundle.map
    echo "Uploading iOS Source Maps..."
    npx  bugsnag-source-maps upload-react-native \
    --platform=ios \
    --api-key=$BUGSNAG_API_KEY \
    --code-bundle-id=$BUILD_NUMBER \
    --source-map=ios-release.bundle.map \
    --bundle=ios-release.bundle
  fi
  
  if [ "$APPCENTER_BRANCH" == "master" ]; then
    git tag "$BUILD_NUMBER"
    git remote set-url origin "https://${GITHUB_TOKEN}@<MY_GITHUB_REPO_SSH>" > /dev/null 2>&1
    git push origin "$BUILD_NUMBER"
  fi
else
  notifySlack "Test failed on $APPCENTER_BRANCH $APP_CENTER_CURRENT_PLATFORM :doomer:"
fi