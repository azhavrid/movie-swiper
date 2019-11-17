// Configure reactotron
if (__DEV__) {
  import('./src/configs/reactotron/reactotron');
  import('./src/configs/reactotron/commands');
}

// App
import { AppRegistry } from 'react-native';
import AppContainer from './src/AppContainer';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => AppContainer);
