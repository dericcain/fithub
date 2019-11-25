import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';

import { App } from './src/app';
import { name as appName } from './app.json';

// Load the debugger in dev mode...
if (__DEV__) {
  import('./src/debugger').then(() => console.log('Reactotron Configured'));
}

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
