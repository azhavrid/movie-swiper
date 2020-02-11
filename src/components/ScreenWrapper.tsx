import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { globalStyles } from '../globalStyles';

/* ------------- Props and State ------------- */
type Props = {};

/* ------------- Class ------------- */
const ScreenWrapper: React.FC<Props> = props => {
  const { children } = props;
  return <SafeAreaView style={globalStyles.screenContainer}>{children}</SafeAreaView>;
};

export default ScreenWrapper;
