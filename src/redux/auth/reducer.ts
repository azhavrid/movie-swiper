import { ResponseError } from '../../utils/errors';
import { AfterRehydrate } from '../rehydrate/actions';
import { AFTER_REHYDRATE } from '../rehydrate/constants';
import {
  AuthAction,
  CreateAuthenticatedSessionFailure,
  CreateAuthenticatedSessionSuccess,
  CreateGuestSessionFailure,
  CreateGuestSessionSuccess,
} from './actions';
import * as authConstants from './constants';
import { User } from './types';

/* ------------- State ------------- */
type AuthStateType = typeof initialState;
export interface AuthState extends AuthStateType {}

export const initialState = {
  user: undefined as User | undefined,
  requests: {
    createAuthenticatedSessionPending: false,
    createAuthenticatedSessionError: undefined as ResponseError | undefined,
    createGuestSessionPending: false,
    createGuestSessionError: undefined as ResponseError | undefined,
  },
};

/* ------------- Reducers ------------- */
const createAuthenticatedSessionRequest = (state: AuthState): AuthState => ({
  ...state,
  requests: {
    ...state.requests,
    createAuthenticatedSessionPending: true,
    createAuthenticatedSessionError: undefined,
  },
});

const createAuthenticatedSessionSuccess = (state: AuthState, action: CreateAuthenticatedSessionSuccess): AuthState => ({
  ...state,
  user: action.user,
  requests: {
    ...state.requests,
    createAuthenticatedSessionPending: false,
    createAuthenticatedSessionError: undefined,
  },
});

const createAuthenticatedSessionFailure = (state: AuthState, action: CreateAuthenticatedSessionFailure): AuthState => ({
  ...state,
  requests: {
    ...state.requests,
    createAuthenticatedSessionPending: false,
    createAuthenticatedSessionError: action.error,
  },
});

const createGuestSessionRequest = (state: AuthState): AuthState => ({
  ...state,
  requests: {
    ...state.requests,
    createGuestSessionPending: true,
    createGuestSessionError: undefined,
  },
});

const createGuestSessionSuccess = (state: AuthState, action: CreateGuestSessionSuccess): AuthState => ({
  ...state,
  user: action.user,
  requests: {
    ...state.requests,
    createGuestSessionPending: false,
    createGuestSessionError: undefined,
  },
});

const createGuestSessionFailure = (state: AuthState, action: CreateGuestSessionFailure): AuthState => ({
  ...state,
  requests: {
    ...state.requests,
    createGuestSessionPending: false,
    createGuestSessionError: action.error,
  },
});

const logOut = (): AuthState => ({
  ...initialState,
});

const afterRehydrate = (state: AuthState): AuthState => ({
  ...state,
  requests: initialState.requests,
});

const authReducer = (state: AuthState | undefined = initialState, action: AuthAction | AfterRehydrate): AuthState => {
  switch (action.type) {
    case authConstants.CREATE_AUTHENTICATED_SESSION_REQUEST:
      return createAuthenticatedSessionRequest(state);
    case authConstants.CREATE_AUTHENTICATED_SESSION_SUCCESS:
      return createAuthenticatedSessionSuccess(state, action);
    case authConstants.CREATE_AUTHENTICATED_SESSION_FAILURE:
      return createAuthenticatedSessionFailure(state, action);
    case authConstants.CREATE_GUEST_SESSION_REQUEST:
      return createGuestSessionRequest(state);
    case authConstants.CREATE_GUEST_SESSION_SUCCESS:
      return createGuestSessionSuccess(state, action);
    case authConstants.CREATE_GUEST_SESSION_FAILURE:
      return createGuestSessionFailure(state, action);
    case authConstants.LOG_OUT:
      return logOut();
    case AFTER_REHYDRATE:
      return afterRehydrate(state);
    default:
      return state;
  }
};

export default authReducer;
