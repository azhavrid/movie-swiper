import { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';

import {
  createAuthenticatedSessionApi,
  CreateAuthenticatedSessionApiResponse,
  createGuestSessionApi,
  CreateGuestSessionApiResponse,
  createRequestTokenApi,
  CreateRequestTokenApiResponse,
  getAccountDetailsApi,
  GetAccountDetailsApiResponse,
  validateUserCredentialsApi,
} from '../../api/auth';
import { getTmdbErrorMessage } from '../../api/errors';
import AppToast from '../../components/AppToast';
import { emoticons } from '../../helpers/emoticons';
import NavigationService from '../../routes/NavigationService';
import { routeNames } from '../../routes/routeNames';
import { createResponseError } from '../../utils/errors';
import { createAuthenticatedUserFromAccountData } from '../../utils/user';
import {
  createAuthenticatedSessionFailure,
  CreateAuthenticatedSessionRequest,
  createAuthenticatedSessionSuccess,
  createGuestSessionFailure,
  CreateGuestSessionRequest,
  createGuestSessionSuccess,
} from './actions';

export function* createGuestSessionSaga({ onError, onSuccess }: CreateGuestSessionRequest) {
  try {
    const { data }: AxiosResponse<CreateGuestSessionApiResponse> = yield call(createGuestSessionApi);
    if (!data.success) {
      throw new Error('Session creation was unsuccessful');
    }

    yield put(createGuestSessionSuccess({ sessionId: data.guest_session_id, isGuest: true }));
    yield call(createSessionSuccessSaga);
    onSuccess && onSuccess();
  } catch (error) {
    AppToast.show(`Something went wrong ${emoticons.shrug}\nPlease try again later.`);
    yield put(createGuestSessionFailure(createResponseError(error.message)));
    onError && onError();
  }
}

export function* createAuthenticatedSessionSaga({
  username,
  password,
  onSuccess,
  onError,
}: CreateAuthenticatedSessionRequest) {
  try {
    const {
      data: { request_token },
    }: AxiosResponse<CreateRequestTokenApiResponse> = yield call(createRequestTokenApi);

    const {
      data: { success },
    }: AxiosResponse<CreateRequestTokenApiResponse> = yield call(validateUserCredentialsApi, {
      request_token,
      username,
      password,
    });

    if (!success) {
      throw new Error('Validation of user credentials was unsuccessful');
    }

    const {
      data: { session_id },
    }: AxiosResponse<CreateAuthenticatedSessionApiResponse> = yield call(createAuthenticatedSessionApi, {
      request_token,
    });

    const { data }: AxiosResponse<GetAccountDetailsApiResponse> = yield call(getAccountDetailsApi, { session_id });

    const user = createAuthenticatedUserFromAccountData(data, session_id);
    yield put(createAuthenticatedSessionSuccess(user));
    yield call(createSessionSuccessSaga);
    onSuccess && onSuccess();
  } catch (error) {
    const errorMessage = getTmdbErrorMessage(error?.response?.data?.status_code);
    yield put(createAuthenticatedSessionFailure(createResponseError(errorMessage)));
    onError && onError();
  }
}

function* createSessionSuccessSaga() {
  yield call(NavigationService.navigate, routeNames.HomeStack);
}

export function* logOutSaga() {
  NavigationService.navigate(routeNames.AuthStack);
}
