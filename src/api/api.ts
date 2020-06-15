import axios, { AxiosError, AxiosResponse } from 'axios';

import { config } from '../configs/config';
import { logOut } from '../redux/auth/actions';
import StoreService from '../redux/StoreService';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 8000,
});

api.interceptors.request.use(
  requestConfig => {
    if (config.logNetworkMessages) {
      console.log('[Request interceptor]', requestConfig);
    }

    return requestConfig;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (config.logNetworkMessages) {
      console.log('[Response interceptor]', response);
    }

    return response;
  },
  (error: AxiosError) => {
    // On unauthorized error logout and navigate to AuthStack
    if (error?.response?.status === 401) {
      StoreService.dispatch(logOut());
    }

    if (config.logNetworkMessages) {
      console.log('[Error interceptor]', error);
    }

    return Promise.reject(error);
  },
);

export default api;
