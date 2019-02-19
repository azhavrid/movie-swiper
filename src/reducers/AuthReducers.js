import { Auth } from '../actions/types';

const INITIAL_STATE = {
  loginUsername: '',
  loginPassword: '',
  loginUsernameError: '',
  loginPasswordError: '',
  loginIsLoading: false,
  isGuestSessionCreating: false,
  user: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Auth.USERNAME_CHANGED:
      return { ...state, loginUsernameError: '', loginUsername: action.payload };
    case Auth.USERNAME_INCORRECT:
      return { ...state, loginUsernameError: action.payload };
    case Auth.PASSWORD_CHANGED:
      return { ...state, loginPasswordError: '', loginPassword: action.payload };
    case Auth.PASSWORD_INCORRECT:
      return { ...state, loginPasswordError: action.payload };
    case Auth.LOGIN_USER_ATTEMPT:
      return { ...state, loginUsernameError: '', loginPasswordError: '', loginIsLoading: true };
    case Auth.LOGIN_USER_SUCCESS:
      return { ...INITIAL_STATE, user: action.payload };
    case Auth.LOGIN_USER_FAIL:
      return {
        ...state,
        loginPassword: '',
        loginPasswordError: action.payload,
        loginIsLoading: false
      };
    case Auth.CREATE_GUEST_SESSION_ATTEMPT:
      return { ...state, isGuestSessionCreating: true };
    case Auth.CREATE_GUEST_SESSION_SUCCESS:
      return { ...state, isGuestSessionCreating: false, user: action.payload };
    case Auth.CREATE_GUEST_SESSION_FAIL:
      return { ...state, isGuestSessionCreating: false };
    case Auth.CLEAR_LOGIN_FIELDS:
      return {
        ...state,
        loginUsername: '',
        loginPassword: '',
        loginUsernameError: '',
        loginPasswordError: ''
      };
    case Auth.USER_LOADED:
      return { ...INITIAL_STATE, user: action.payload };
    case Auth.LOG_OUT:
      return { ...INITIAL_STATE };
    default:
      return { ...state };
  }
};
