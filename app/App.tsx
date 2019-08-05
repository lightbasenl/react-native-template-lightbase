import React from 'react';
import Navigation from 'navigation/Navigation';
import CodePush from 'react-native-code-push';

import 'services/bugsnag';
import { Portal } from './components/Portal/Portal';

const App = () => {
  return (
    <Portal.Host>
      <Navigation />
    </Portal.Host>
  );
};

const codePushonfig = {
  checkFrequency: __DEV__ ? CodePush.CheckFrequency.MANUAL : CodePush.CheckFrequency.ON_APP_RESUME,
};

export default CodePush(codePushonfig)(App);
