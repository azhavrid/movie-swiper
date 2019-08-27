import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import { reactotron } from '../configs/reactotron';
import { rootReducer } from './reducer';
import { rootSaga } from './saga';

const persistConfig: PersistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

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

// Persisted
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = createStore(persistedReducer, {}, compose(...middleware));
export const persistor = persistStore(store);

// Run saga middleware after store creation
sagaMiddleware && sagaMiddleware.run(rootSaga);
