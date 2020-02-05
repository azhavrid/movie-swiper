import Reactotron from 'reactotron-react-native';
import sagaPlugin from 'reactotron-redux-saga';
import { reactotronRedux } from 'reactotron-redux';

export const reactotron = Reactotron.configure({ name: 'Movie Swiper' })
  .use(sagaPlugin({}))
  .use(reactotronRedux({}))
  .useReactNative({
    // Ignore netinfo package ping url
    networking: { ignoreUrls: /generate_204/ },
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
