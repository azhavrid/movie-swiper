import { NetInfoState } from '@react-native-community/netinfo';
import { AnyAction } from 'redux';

import * as networkConstants from './constants';
import { ReDispatchConfig } from './types';

/* ------------- Types ------------- */
export interface InitiateNetworkMonitoring extends ReturnType<typeof initiateNetworkMonitoring> {}
export interface StopNetworkMonitoring extends ReturnType<typeof stopNetworkMonitoring> {}
export interface CheckNetworkConnection extends ReturnType<typeof checkNetworkConnection> {}
export interface NetworkStateChanged extends ReturnType<typeof networkStateChanged> {}
export interface HandleNetworkReduxError extends ReturnType<typeof handleNetworkReduxError> {}
export interface NetworkReduxErrorsResolved extends ReturnType<typeof networkReduxErrorsResolved> {}
export interface ClearReduxActionsFromQueue extends ReturnType<typeof clearReduxActionsFromQueue> {}

export type NetworkAction =
  | InitiateNetworkMonitoring
  | StopNetworkMonitoring
  | CheckNetworkConnection
  | NetworkStateChanged
  | HandleNetworkReduxError
  | NetworkReduxErrorsResolved
  | ClearReduxActionsFromQueue;

/* ------------- Actions ------------- */
export const initiateNetworkMonitoring = () =>
  <const>{
    type: networkConstants.INITIATE_NETWORK_MONITORING,
  };

export const stopNetworkMonitoring = () =>
  <const>{
    type: networkConstants.STOP_NETWORK_MONITORING,
  };

export const checkNetworkConnection = () =>
  <const>{
    type: networkConstants.CHECK_NETWORK_CONNECTION,
  };

export const networkStateChanged = (networkState: NetInfoState) =>
  <const>{
    type: networkConstants.NETWORK_STATE_CHANGED,
    networkState,
  };

export const handleNetworkReduxError = (
  error: any,
  reDispatchAction: AnyAction,
  reDispatchConfig: ReDispatchConfig = {},
) =>
  <const>{
    type: networkConstants.HANDLE_NETWORK_REDUX_ERROR,
    error,
    reDispatchAction,
    reDispatchConfig,
  };

export const networkReduxErrorsResolved = () =>
  <const>{
    type: networkConstants.NETWORK_REDUX_ERRORS_RESOLVED,
  };

export const clearReduxActionsFromQueue = (clearTypes: string | string[]) =>
  <const>{
    type: networkConstants.CLEAR_REDUX_ACTIONS_FROM_QUEUE,
    clearTypes,
  };
