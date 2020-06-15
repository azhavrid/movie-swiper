import { Platform } from 'react-native';

export const config = {
  isAndroid: Platform.OS === 'android',
  logGeneral: false,
  logNetworkMessages: false,
  reactotronHost: '192.168.0.15',
};
