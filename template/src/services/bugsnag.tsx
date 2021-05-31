import Bugsnag from '@bugsnag/react-native';
import BugsnagPluginReactNavigation from '@bugsnag/plugin-react-navigation';
import Config from 'react-native-config';
import { NavigationContainer } from '@react-navigation/native';
import CodePush from 'react-native-code-push';

// @ts-ignore
if (!Bugsnag._client) {
  Bugsnag.start({
    codeBundleId: Config.BUILD_NUMBER,
    plugins: [new BugsnagPluginReactNavigation()],
    onError: async (event) => {
      if (__DEV__) {
        return false;
      }
      const update = await CodePush.getUpdateMetadata();
      if (update) {
        event.app.codeBundleId = `codepush:${update.label}`;
      }
    },
  });
}

const createNavigationContainer = Bugsnag.getPlugin('reactNavigation')?.createNavigationContainer;
export const BugsnagNavigationContainer =
  createNavigationContainer?.(NavigationContainer) || NavigationContainer;
