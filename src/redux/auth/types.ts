/* ------------- User ------------- */
interface UserBase {
  isGuest: boolean;
  sessionId: string;
}

interface AuthenticatedUserParams {
  accountId: number;
  name: string;
  username: string;
  includeAdultContent: boolean;
}

export interface GuestUser extends UserBase {
  isGuest: true;
}

export interface AuthenticatedUser extends UserBase, AuthenticatedUserParams {
  isGuest: false;
}

export type User = GuestUser | AuthenticatedUser;
