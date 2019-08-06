import React from 'react';
import Navigation from 'navigation/Navigation';
import CodePush from 'react-native-code-push';

import 'services/bugsnag';

const App = () => {
  return <Navigation />;
};

const codePushonfig = {
  checkFrequency: __DEV__ ? CodePush.CheckFrequency.MANUAL : CodePush.CheckFrequency.ON_APP_RESUME,
};

export default CodePush(codePushonfig)(App);
