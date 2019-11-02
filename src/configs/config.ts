import { Platform } from 'react-native';

export const config = {
  isAndroid: Platform.OS === 'android',
  logGeneral: false,
  logNetworkMessages: false,
};
