import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import { afterRehydrate } from './rehydrate/actions';
import { reactotron } from '../configs/reactotron/reactotron';
import { rootReducer } from './reducer';
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
export const store = createStore(rootReducer, {}, compose(...middleware));
export const persistor = persistStore(store, {}, () => store.dispatch(afterRehydrate()));

StoreService.setStoreReference(store);

// Run saga middleware; Must be called after store is created
sagaMiddleware && sagaMiddleware.run(rootSaga);
