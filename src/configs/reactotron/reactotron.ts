import AsyncStorage from '@react-native-community/async-storage';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

import { config } from '../config';

export const reactotron = Reactotron
  // NOTE: For debugging with reactotron change reactotronHost to your machine's LOCAL ip address
  .configure({ host: config.reactotronHost, name: 'Movie Swiper' })
  .use(sagaPlugin({}))
  .use(reactotronRedux({}))
  .setAsyncStorageHandler(AsyncStorage)
  .useReactNative({
    // Ignore netinfo package ping url
    networking: { ignoreUrls: /generate_204/ },
    // Ignore AsyncStorage persist events
    asyncStorage: { ignore: ['persist:root'] },
  })
  .connect();

// Clear Reactotron on app start
Reactotron.clear && Reactotron.clear();

// Add reactotron to console
declare global {
  interface Console {
    tron: typeof reactotron;
  }
}

console.tron = reactotron;
