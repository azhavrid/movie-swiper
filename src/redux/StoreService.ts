import { Store } from 'redux';

import { RootAction, RootState } from './types';

// StoreService is used to avoid cyclic dependencies when dispatching actions
// outside of React Component and redux sagas
let _store: Store<RootState, RootAction>;

const setStoreReference = (storeRef: Store<RootState, RootAction>) => {
  _store = storeRef;
};

const getState = () => _store.getState();

const dispatch = (action: RootAction) => {
  _store.dispatch(action);
};

export default {
  setStoreReference,
  getState,
  dispatch,
};
