import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import { reactotron } from '../configs/reactotron/reactotron';
import { rootReducer } from './reducer';
import { afterRehydrate } from './rehydrate/actions';
import { rootSaga } from './saga';
import StoreService from './StoreService';

const middleware = [];
let sagaMonitor;

// Reactotron
if (__DEV__) {
  if (reactotron.createSagaMonitor) {
    sagaMonitor = reactotron.createSagaMonitor();
  }
  reactotron.createEnhancer && middleware.push(reactotron.createEnhancer());
}

// Redux saga
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
middleware.push(applyMiddleware(sagaMiddleware));

// Redux
export const store = createStore(rootReducer, {}, composeWithDevTools(...middleware));
export const persistor = persistStore(store, {}, () => store.dispatch(afterRehydrate()));

StoreService.setStoreReference(store);

// Run saga middleware; Must be called after store is created
sagaMiddleware && sagaMiddleware.run(rootSaga);
