import { setLogger } from 'react-query';
const oldConsole = { ...console };
import Reactotron from 'reactotron-react-native';
import Config from 'react-native-config';
import { LogBox } from 'react-native';
// import { queryClient } from './api';

export function initDevEnvironment() {
  if (Config.RELEASE_STAGE === 'test') {
    LogBox.ignoreAllLogs(true);
  }
  if (__DEV__) {
    require('flipper-plugin-bridgespy-client');

    LogBox.ignoreLogs(['startLoadWithResult', 'shouldStartLoad', 'RCTBridge']);
    const ReactotronFlipper = require('reactotron-react-native/dist/flipper');
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    const RNAsyncStorageFlipper = require('rn-async-storage-flipper').default;

    RNAsyncStorageFlipper(AsyncStorage);

    Reactotron.configure({
      name: 'React Native App',
      createSocket: (path) => new ReactotronFlipper(path),
    })
      .setAsyncStorageHandler?.(AsyncStorage)
      .useReactNative()
      .connect?.()
      .clear?.();

    // @ts-ignore
    if (!window.customLogger) {
      // @ts-ignore
      window.customLogger = true;

      console.log = (...args: any) => {
        oldConsole.log(...args);
        Reactotron?.log?.(...args);
      };
      console.warn = (...args: any) => {
        if (args?.[0]?.includes?.('Setting a timer')) {
          return;
        }
        oldConsole.warn(...args);
        Reactotron?.log?.(...args);
      };
      setLogger({
        log: console.log,
        warn: console.warn,
        error: console.warn,
      });
    }
  } else {
    setLogger({
      log: () => {},
      warn: () => {},
      error: () => {},
    });
  }
}
