import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { initDevEnvironment } from './src/utils/initDevEnvironment';

initDevEnvironment();

AppRegistry.registerComponent(appName, () => App);
