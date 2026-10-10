import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './reducer';
import { afterRehydrate } from './rehydrate/actions';
import { rootSaga } from './saga';
import StoreService from './StoreService';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(sagaMiddleware)));
export const persistor = persistStore(store, {}, () => store.dispatch(afterRehydrate()));

StoreService.setStoreReference(store);

sagaMiddleware.run(rootSaga);
