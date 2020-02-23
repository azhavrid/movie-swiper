import api from './api';
import { withKey } from './urls';

/* ------------- Types ------------- */
export interface CreateGuestSessionApiResponse {
  success: boolean;
  guest_session_id: string;
  expires_at: string;
}

export interface CreateRequestTokenApiResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface ValidateUserCredentialsApiParams {
  username: string;
  password: string;
  request_token: string;
}

export interface ValidateUserCredentialsApiResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface CreateAuthenticatedSessionApiParams {
  request_token: string;
}

export interface CreateAuthenticatedSessionApiResponse {
  success: boolean;
  session_id: string;
}

export interface GetAccountDetailsApiParams {
  session_id: string;
}

export interface GetAccountDetailsApiResponse {
  avatar: {
    gravatar: {
      hash: string;
    };
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}

/* ------------- Api ------------- */
export const createGuestSessionApi = () =>
  api.get<CreateGuestSessionApiResponse>(withKey('/authentication/guest_session/new'));

export const createRequestTokenApi = () => api.get<CreateRequestTokenApiResponse>(withKey('/authentication/token/new'));

export const validateUserCredentialsApi = (params: ValidateUserCredentialsApiParams) =>
  api.post<ValidateUserCredentialsApiResponse>(withKey('/authentication/token/validate_with_login'), params);

export const createAuthenticatedSessionApi = (params: CreateAuthenticatedSessionApiParams) =>
  api.post<CreateAuthenticatedSessionApiResponse>(withKey('/authentication/session/new'), params);

export const getAccountDetailsApi = (params: GetAccountDetailsApiParams) =>
  api.get<GetAccountDetailsApiResponse>(withKey('/account'), { params });
