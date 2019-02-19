import { Auth } from './types';
import { validateUsername, validatePassword } from '../utils/validators';
import { stSaveUser, stRemoveUser, stRemoveCurrentMovies } from '../utils/storage';
import { requestToCreateNewGuestUser, requestToCreateNewAuthenticatedUser } from '../api/auth';
import { getTmdbErrorMessage } from '../api/codes';
import RouteNames from '../RouteNames';
import Config from '../Config';

export const clearLoginFields = () => ({ type: Auth.CLEAR_LOGIN_FIELDS });
export const loadUserIntoRedux = user => ({ type: Auth.USER_LOADED, payload: user });
export const loginUsernameChanged = text => ({ type: Auth.USERNAME_CHANGED, payload: text });
export const loginPasswordChanged = text => ({ type: Auth.PASSWORD_CHANGED, payload: text });

export const logOutUser = navigation => dispatch => {
  stRemoveUser();
  stRemoveCurrentMovies();
  navigation.navigate(RouteNames.AuthStack);
  dispatch({ type: Auth.LOG_OUT });
};

export const createGuestSession = ({ showToast, onSuccess }) => async dispatch => {
  dispatch({ type: Auth.CREATE_GUEST_SESSION_ATTEMPT });

  try {
    const { sessionId } = await requestToCreateNewGuestUser();

    dispatch({ type: Auth.CREATE_GUEST_SESSION_SUCCESS, payload: createUser({ sessionId }) });
    onSuccess();
  } catch (error) {
    showToast && showToast('Something went wrong. Please try again later.');
    dispatch({ type: Auth.CREATE_GUEST_SESSION_FAIL });
  }
};

export const loginUser = ({ username, password, showToast, onSuccess }) => async dispatch => {
  const usernameValidator = validateUsername(username);
  const passwordValidator = validatePassword(password);
  const isValidCredentials = usernameValidator.isValid && passwordValidator.isValid;

  if (!isValidCredentials) {
    dispatch({ type: Auth.USERNAME_INCORRECT, payload: usernameValidator.message });
    dispatch({ type: Auth.PASSWORD_INCORRECT, payload: passwordValidator.message });
    return;
  }

  dispatch({ type: Auth.LOGIN_USER_ATTEMPT });

  try {
    const { accountId, sessionId } = await requestToCreateNewAuthenticatedUser({
      username,
      password
    });

    dispatch({
      type: Auth.LOGIN_USER_SUCCESS,
      payload: createUser({ accountId, username, sessionId })
    });
    onSuccess();
  } catch (error) {
    const isUnauthorized = error.response && error.response.status === 401;
    if (!isUnauthorized && showToast) {
      showToast('Something went wrong. Please try again later.');
    }
    const errMessage = isUnauthorized ? getTmdbErrorMessage(error.response.data.status_code) : '';
    dispatch({ type: Auth.LOGIN_USER_FAIL, payload: errMessage });
  }
};

// Local functions
const createUser = ({ accountId, sessionId, username }) => {
  const isGuest = !accountId;
  const user = { isGuest, sessionId, accountId, username };
  Config.logGeneral && console.log('Creating user: ', user);
  stSaveUser(user);
  return user;
};
