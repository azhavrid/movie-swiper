import { AsyncStorage } from 'react-native';
import { getCurrentUsersAccountId } from '../utils/store';

// User
const stUserKey = 'user';
export const stGetUser = () =>
  getJsonObjectFromStorage(stUserKey, { onJsonParseError: stRemoveUser });
export const stSaveUser = user => AsyncStorage.setItem(stUserKey, JSON.stringify(user));
export const stRemoveUser = () => AsyncStorage.removeItem(stUserKey);

// Current movies
const stCurrentMoviesKey = 'currentMovies';
export const stGetCurrentMovies = () => getJsonObjectFromStorage(stCurrentMoviesKey);
export const stSaveCurrentMovies = movies =>
  AsyncStorage.setItem(stCurrentMoviesKey, JSON.stringify(movies));
export const stRemoveCurrentMovies = () => AsyncStorage.removeItem(stCurrentMoviesKey);

// Requests
const stRequestsKey = 'requests';
export const stGetRequests = () => getJsonObjectFromStorage(stRequestsKey);
export const stSaveRequests = requests =>
  AsyncStorage.setItem(stRequestsKey, JSON.stringify(requests));

// Explore movies
const getExploredMoviesKey = () => `user:${getCurrentUsersAccountId()}:explored`;
export const stGetExploredMovies = () => getJsonObjectFromStorage(getExploredMoviesKey());
export const stSaveExploredMovies = movies =>
  AsyncStorage.setItem(getExploredMoviesKey(), JSON.stringify(movies));

// Local functions
const getJsonObjectFromStorage = (key, params = {}) =>
  new Promise(async resolve => {
    const { onJsonParseError } = params;

    try {
      const dataJson = await AsyncStorage.getItem(key);
      if (!dataJson) resolve(null);

      const data = JSON.parse(dataJson);
      resolve(data);
    } catch (e) {
      onJsonParseError && onJsonParseError();
      resolve(null);
    }
  });
