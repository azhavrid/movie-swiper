import { isArray } from 'lodash';

import { isNetworkError, isServerError } from '../../utils/network';
import {
  ClearReduxActionsFromQueue,
  HandleNetworkReduxError,
  NetworkAction,
  NetworkReduxErrorsResolved,
  NetworkStateChanged,
} from './actions';
import * as networkConstants from './constants';
import { FailedRequest } from './types';
import { isSameActionsByType } from './utils';

/* ------------- State ------------- */
type NetworkStateType = typeof initialState;
export interface NetworkState extends NetworkStateType {}

export const initialState = {
  isConnected: true,
  isInternetReachable: true,
  ipAddress: undefined as string | undefined,
  failedRequestsQueue: [] as FailedRequest[],
};

/* ------------- Reducers ------------- */
const networkStateChanged = (state: NetworkState, action: NetworkStateChanged): NetworkState => {
  const { networkState } = action;
  const { isConnected, isInternetReachable, details } = networkState;

  // @ts-ignore. networkSxtate.details doesn't have correct TS support
  const ipAddress = details?.ipAddress;
  const isInternetReachableUpdated = isInternetReachable ?? state.isInternetReachable;

  return {
    ...state,
    isConnected,
    isInternetReachable: isInternetReachableUpdated,
    ipAddress,
  };
};

const handleNetworkReduxError = (state: NetworkState, action: HandleNetworkReduxError): NetworkState => {
  const { error, reDispatchAction, reDispatchConfig } = action;
  const { isSameAction: isSameActionFromConfig } = reDispatchConfig;

  if (!isNetworkError(error) && !isServerError(error)) return state;

  const isSameAction = isSameActionFromConfig || isSameActionsByType;

  const filteredFailedRequestsQueue = state.failedRequestsQueue.filter(
    failedRequest => !isSameAction(failedRequest.action, reDispatchAction),
  );

  return {
    ...state,
    failedRequestsQueue: [...filteredFailedRequestsQueue, { action: reDispatchAction, error }],
  };
};

const networkReduxErrorsResolved = (state: NetworkState, {}: NetworkReduxErrorsResolved): NetworkState => ({
  ...state,
  failedRequestsQueue: [],
});

const clearReduxActionsFromQueue = (state: NetworkState, action: ClearReduxActionsFromQueue): NetworkState => {
  const { clearTypes } = action;
  const typesArray = isArray(clearTypes) ? clearTypes : [clearTypes];

  return {
    ...state,
    failedRequestsQueue: state.failedRequestsQueue.filter(
      failedRequest => !typesArray.includes(failedRequest.action.type),
    ),
  };
};

const networkReducer = (state: NetworkState | undefined = initialState, action: NetworkAction): NetworkState => {
  switch (action.type) {
    case networkConstants.NETWORK_STATE_CHANGED:
      return networkStateChanged(state, action);
    case networkConstants.HANDLE_NETWORK_REDUX_ERROR:
      return handleNetworkReduxError(state, action);
    case networkConstants.NETWORK_REDUX_ERRORS_RESOLVED:
      return networkReduxErrorsResolved(state, action);
    case networkConstants.CLEAR_REDUX_ACTIONS_FROM_QUEUE:
      return clearReduxActionsFromQueue(state, action);
    default:
      return state;
  }
};

export default networkReducer;
