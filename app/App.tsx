import React from 'react';
import Navigation from 'navigation/Navigation';
import { enableScreens } from 'react-native-screens';
enableScreens();
// import CodePush from 'react-native-code-push';

// import 'services/bugsnag';

const App = () => {
  return <Navigation />;
};

export default App;

// const codePushonfig = {
//   checkFrequency: __DEV__ ? CodePush.CheckFrequency.MANUAL : CodePush.CheckFrequency.ON_APP_RESUME,
// };

// export default CodePush(codePushonfig)(App);
