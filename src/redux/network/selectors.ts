import { createSelector } from 'reselect';

import { RootState } from '../types';

export const networkStateSelector = (state: RootState) => state.network;

export const inNetworkConnectedSelector = createSelector(networkStateSelector, network => network.isConnected);

export const isInternetReachableSelector = createSelector(networkStateSelector, network => network.isInternetReachable);

export const networkIpAddressSelector = createSelector(networkStateSelector, network => network.ipAddress);

export const failedRequestsQueueSelector = createSelector(networkStateSelector, network => network.failedRequestsQueue);
