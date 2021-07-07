# Generate sourcemaps for Bugsnag

# REPLACE <MY_GITHUB_REPO_SSH> with your repo ssh

[ -z "$APPCENTER_XCODE_PROJECT" ] && PLATFORM_TYPE=android || PLATFORM_TYPE=ios

# Only run post build script for release branches
if [ "$APPCENTER_BRANCH" == "production" ] || [ "$APPCENTER_BRANCH" == "acceptance" ] || [ "$APPCENTER_BRANCH" == "development" ]; then
  BUILD_NUMBER=$(git show -s --format=%ct)
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
    # No xcode project means the build is android
    if [ -z "$APPCENTER_XCODE_PROJECT" ]; then    
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

  else
    notifySlack "Test failed on $APPCENTER_BRANCH $PLATFORM_TYPE :doomer:"
  fi
fi