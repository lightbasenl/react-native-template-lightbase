import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { setConsole } from 'react-query';
import { name as appName } from './app.json';
import App from 'app/App';
const oldConsoleLog = console.log;

if (__DEV__) {
  const ReactotronFlipper = require('reactotron-react-native/dist/flipper');
  const Reactotron = require('reactotron-react-native').default;
  const AsyncStorage = require('@react-native-community/async-storage').default;

  console.log = (...args) => {
    oldConsoleLog(...args);
    Reactotron.log(...args);
  };

  Reactotron.setAsyncStorageHandler(AsyncStorage);
  Reactotron.configure({
    name: 'Etos+',
    createSocket: (path) => new ReactotronFlipper(path),
  });

  Reactotron.useReactNative();
  Reactotron.connect();
  Reactotron.clear();

  // const snoopy = require('./app/utils/snoopy');
  // snoopy.ReanimatedModule();
  // snoopy.logCteateViews();
  // snoopy.logUpdateViews();
} else {
  setConsole({
    log: () => {},
    warn: () => {},
    error: () => {},
  });
}

AppRegistry.registerComponent(appName, () => App);
