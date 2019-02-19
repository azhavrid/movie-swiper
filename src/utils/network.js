import { Linking, Image } from 'react-native';
import Config from '../Config';

export const safeOpenURL = url => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else if (Config.logNetworkErrors) {
      console.log(`Error opening ${url}`);
    }
  });
};

export const prefetchImage = url => Image.prefetch(url);
export const prefetchImages = urls => Promise.all(urls.map(url => Image.prefetch(url)));
