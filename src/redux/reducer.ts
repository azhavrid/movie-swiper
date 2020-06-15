import AsyncStorage from '@react-native-community/async-storage';
import { mapValues } from 'lodash';
import { combineReducers } from 'redux';
import { getStoredState, persistReducer } from 'redux-persist';
import { PersistPartial } from 'redux-persist/es/persistReducer';

import authReducer from './auth/reducer';
import exploreReducer from './explore/reducer';
import moviesReducer from './movies/reducer';
import networkReducer from './network/reducer';
import searchReducer from './search/reducer';
import sectionsReducer from './sections/reducer';
import { RootAction, RootState } from './types';

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
  version: 2,
  key: 'root',
  whitelist: ['auth', 'explore', 'movies'],
  getStoredState: async persistConfig => {
    const storedState = await getStoredState(persistConfig);
    // @ts-ignore
    // Drop persisted store if persist version has changed
    const isSamePersistVersion = storedState?._persist?.version === persistConfig?.version;
    return isSamePersistVersion ? storedState : ({} as any);
  },
};

export const persistedReducer = persistReducer(rootConfig, combinedReducers);

/* ------------- Logout Reducer ------------- */
// List of sub stores that are not cleared after logout
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
