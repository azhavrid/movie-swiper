import { Platform } from 'react-native';

export default {
  isAndroid: Platform.OS === 'android',
  logGeneral: false,
  logNetworkMessages: true,
};
