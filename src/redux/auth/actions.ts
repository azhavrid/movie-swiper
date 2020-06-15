import { ResponseError } from '../../utils/errors';
import { WithCallbacks } from '../types';
import * as authConstants from './constants';
import { AuthenticatedUser, GuestUser } from './types';

/* ------------- Types ------------- */
export interface CreateAuthenticatedSessionRequest extends ReturnType<typeof createAuthenticatedSessionRequest> {}
export interface CreateAuthenticatedSessionFailure extends ReturnType<typeof createAuthenticatedSessionFailure> {}
export interface CreateAuthenticatedSessionSuccess extends ReturnType<typeof createAuthenticatedSessionSuccess> {}
export interface CreateGuestSessionRequest extends ReturnType<typeof createGuestSessionRequest> {}
export interface CreateGuestSessionFailure extends ReturnType<typeof createGuestSessionFailure> {}
export interface CreateGuestSessionSuccess extends ReturnType<typeof createGuestSessionSuccess> {}
export interface LogOut extends ReturnType<typeof logOut> {}

export type AuthAction =
  | CreateAuthenticatedSessionRequest
  | CreateAuthenticatedSessionFailure
  | CreateAuthenticatedSessionSuccess
  | CreateGuestSessionRequest
  | CreateGuestSessionFailure
  | CreateGuestSessionSuccess
  | LogOut;

/* ------------- Actions ------------- */
export const createAuthenticatedSessionRequest = (params: { username: string; password: string } & WithCallbacks) =>
  <const>{
    type: authConstants.CREATE_AUTHENTICATED_SESSION_REQUEST,
    ...params,
  };

export const createAuthenticatedSessionSuccess = (user: AuthenticatedUser) =>
  <const>{
    type: authConstants.CREATE_AUTHENTICATED_SESSION_SUCCESS,
    user,
  };

export const createAuthenticatedSessionFailure = (error: ResponseError) =>
  <const>{
    type: authConstants.CREATE_AUTHENTICATED_SESSION_FAILURE,
    error,
  };

export const createGuestSessionRequest = (params: WithCallbacks = {}) =>
  <const>{
    type: authConstants.CREATE_GUEST_SESSION_REQUEST,
    ...params,
  };

export const createGuestSessionSuccess = (user: GuestUser) =>
  <const>{
    type: authConstants.CREATE_GUEST_SESSION_SUCCESS,
    user,
  };

export const createGuestSessionFailure = (error: ResponseError) =>
  <const>{
    type: authConstants.CREATE_GUEST_SESSION_FAILURE,
    error,
  };

export const logOut = () =>
  <const>{
    type: authConstants.LOG_OUT,
  };
