import { createSelector } from 'reselect';

import { UserIdsParams } from '../../api/types';
import { RootState } from '../types';
import { AuthenticatedUser, GuestUser } from './types';

export const authStateSelector = (state: RootState) => state.auth;

export const userSelector = createSelector(authStateSelector, auth => auth.user);

export const isAuthenticatedUserSelector = createSelector(userSelector, user => !!user && !user.isGuest);

export const isGuestUserSelector = createSelector(
  isAuthenticatedUserSelector,
  isAuthenticatedUser => !isAuthenticatedUser,
);

export const usernameSelector = createSelector([userSelector, isGuestUserSelector], (user, isGuestUser) =>
  isGuestUser ? 'guest' : (user as AuthenticatedUser).username,
);

export const authenticatedUserSelector = createSelector(
  [userSelector, isAuthenticatedUserSelector],
  (user, isAuthenticatedUser) => (isAuthenticatedUser ? (user as AuthenticatedUser) : undefined),
);

export const guestUserSelector = createSelector(isGuestUserSelector, userSelector, (isGuest, user) =>
  isGuest ? (user as GuestUser) : undefined,
);

export const sessionIdSelector = createSelector(userSelector, user => (user ? user.sessionId : ''));

export const accountIdSelector = createSelector(authenticatedUserSelector, user => (user ? user.accountId : 0));

export const userIdParamsSelector = createSelector(
  [sessionIdSelector, accountIdSelector],
  (sessionId, accountId): UserIdsParams => ({
    sessionId,
    accountId,
  }),
);

export const createAuthenticatedSessionPendingSelector = createSelector(
  authStateSelector,
  auth => auth.requests.createAuthenticatedSessionPending,
);

export const createAuthenticatedSessionErrorSelector = createSelector(
  authStateSelector,
  auth => auth.requests.createAuthenticatedSessionError,
);

export const createGuestSessionPendingSelector = createSelector(
  authStateSelector,
  auth => auth.requests.createGuestSessionPending,
);

export const createGuestSessionErrorSelector = createSelector(
  authStateSelector,
  auth => auth.requests.createGuestSessionError,
);
