// Configure reactotron
if (__DEV__) {
  import('./src/configs/reactotron');
}

// App
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, (): React.ComponentType<{}> => App);
