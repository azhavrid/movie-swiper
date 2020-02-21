import NetInfo, { NetInfoSubscription } from '@react-native-community/netinfo';
import { put, select, delay } from 'redux-saga/effects';

import {
  networkStateChanged,
  InitiateNetworkMonitoring,
  StopNetworkMonitoring,
  networkReduxErrorsResolved,
  HandleNetworkReduxError,
  clearReduxActionsFromQueue,
} from './actions';
import { isInternetReachableSelector, failedRequestsQueueSelector } from './selectors';
import { FailedRequest } from './types';
import StoreService from '../StoreService';

let unsubscribe: NetInfoSubscription;

export function* initiateNetworkMonitoringSaga({}: InitiateNetworkMonitoring) {
  unsubscribe = NetInfo.addEventListener(state => {
    StoreService.dispatch(networkStateChanged(state));
  });
}

export function* stopNetworkMonitoringSaga({}: StopNetworkMonitoring) {
  unsubscribe && unsubscribe();
}

/*
  I've attempt to create some mechanism to refetch failed network request made in the redux saga.
  In fact this is probably not the best solution for this problem because some hacks are  
  required to make this implementation work properly for all needed use cases.
 */
export function* resolveFailedRequestsSaga() {
  const repeatTime = 2000;

  while (true) {
    yield delay(repeatTime);

    const isInternetReachable: boolean = yield select(isInternetReachableSelector);
    if (isInternetReachable) {
      const failedRequestsQueue: FailedRequest[] = yield select(failedRequestsQueueSelector);
      if (failedRequestsQueue.length > 0) {
        for (let i = 0; i < failedRequestsQueue.length; i++) {
          const failedRequest = failedRequestsQueue[i];
          yield put(failedRequest.action);
        }

        yield put(networkReduxErrorsResolved());
      }
    }
  }
}

export function* handleNetworkReduxErrorSaga({ reDispatchConfig }: HandleNetworkReduxError) {
  const { clearActionsFromQueue } = reDispatchConfig;
  if (!!clearActionsFromQueue) {
    yield put(clearReduxActionsFromQueue(clearActionsFromQueue));
  }
}
