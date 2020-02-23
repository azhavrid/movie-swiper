import React from 'react';
import { View } from 'react-native';

import { globalStyles } from '../globalStyles';

/* ------------- Props and State ------------- */
type Props = {};

/* ------------- Component ------------- */
const ScreenWrapper: React.FC<Props> = props => {
  const { children } = props;
  return <View style={globalStyles.screenContainer}>{children}</View>;
};

export default ScreenWrapper;
