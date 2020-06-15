import { GetAccountDetailsApiResponse } from '../api/auth';
import { AuthenticatedUser } from '../redux/auth/types';

export const createAuthenticatedUserFromAccountData = (
  data: GetAccountDetailsApiResponse,
  sessionId: string,
): AuthenticatedUser => ({
  sessionId,
  isGuest: false,
  accountId: data.id,
  name: data.name,
  username: data.username,
  includeAdultContent: data.include_adult,
});
