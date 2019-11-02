import Reactotron from 'reactotron-react-native';
import sagaPlugin from 'reactotron-redux-saga';
import { reactotronRedux } from 'reactotron-redux';

export const reactotron = Reactotron.configure({ name: 'Movie Swiper' })
  // TODO: Check which plugins to use
  // .use(
  //   trackGlobalErrors({
  //     // ignore all error frames from react-native (for example)
  //     veto: frame => frame.fileName.indexOf('/node_modules/react-native/') >= 0,
  //   }),
  // )
  // .use(networking())
  .use(sagaPlugin({}))
  .use(reactotronRedux({}))
  .useReactNative({})
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
