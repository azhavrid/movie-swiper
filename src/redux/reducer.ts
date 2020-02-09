import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import mapValues from 'lodash/mapValues';

import authReducer from './auth/reducer';
import sectionsReducer from './sections/reducer';
import moviesReducer from './movies/reducer';
import networkReducer from './network/reducer';
import exploreReducer from './explore/reducer';
import searchReducer from './search/reducer';
import { RootState, RootAction } from './types';

/* ------------- Type ------------- */
type ReducersKey = keyof typeof reducers | keyof PersistPartial;

/* ------------- Reducers ------------- */
const reducers = {
  auth: authReducer,
  explore: exploreReducer,
  movies: moviesReducer,
  network: networkReducer,
  sections: sectionsReducer,
  search: searchReducer,
};

const combinedReducers = combineReducers(reducers);

/* ------------- Persist Reducer ------------- */
const rootConfig = {
  storage: AsyncStorage,
  key: 'root',
  whitelist: ['auth', 'explore'],
};

export const persistedReducer = persistReducer(rootConfig, combinedReducers);

/* ------------- Logout Reducer ------------- */
const persistReducersAfterLogoutKeys: Partial<ReducersKey>[] = ['network', '_persist'];

const logoutReducer = (inputState: RootState, action: RootAction): RootState => {
  const isLogoutAction = action.type === 'auth/LOG_OUT';
  if (!isLogoutAction) return inputState;

  const state = mapValues(inputState, (reducer, key: ReducersKey) => {
    const persistReducer = persistReducersAfterLogoutKeys.includes(key);
    return persistReducer ? reducer : undefined;
  });

  return state as RootState;
};

/* ------------- Root Reducer ------------- */
export const rootReducer = (inputState: RootState, action: RootAction) => {
  const state = logoutReducer(inputState, action);
  return persistedReducer(state, action);
};
