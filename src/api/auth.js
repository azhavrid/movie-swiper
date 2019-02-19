import axios from 'axios';
import {
  NEW_SESSION,
  NEW_GUEST_SESSION,
  NEW_REQUEST_TOKEN,
  VALIDATE_TOKEN_WITH_LOGIN,
  ACCOUNT_DETAILS
} from '../api/urls';
import Config from '../Config';

export const requestToCreateNewGuestUser = () =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        data: { guest_session_id: sessionId }
      } = await axios.get(NEW_GUEST_SESSION);

      resolve({ sessionId });
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

export const requestToCreateNewAuthenticatedUser = ({ username, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const {
        data: { request_token }
      } = await axios.get(NEW_REQUEST_TOKEN);

      await axios.post(VALIDATE_TOKEN_WITH_LOGIN, { request_token, username, password });

      const {
        data: { session_id }
      } = await axios.post(NEW_SESSION, { request_token });

      const {
        data: { id: accountId }
      } = await axios.get(ACCOUNT_DETAILS, { params: { session_id } });

      resolve({ accountId, sessionId: session_id });
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });
