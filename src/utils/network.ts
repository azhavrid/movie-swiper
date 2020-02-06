import { Linking, Image } from 'react-native';
import { AxiosError } from 'axios';

export const isNetworkError = (error: any) => !error.response;

export const isServerError = (error: AxiosError) => error.code.startsWith('5');

export const safeOpenURL = (url: string) => {
  Linking.canOpenURL(url).then(supported => {
    supported && Linking.openURL(url);
  });
};

export const prefetchImage = (url: string) => Image.prefetch(url);

export const prefetchImages = (urls: string[]) => Promise.all(urls.map(url => prefetchImage(url)));
