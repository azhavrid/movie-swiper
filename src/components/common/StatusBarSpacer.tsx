import React from 'react';
import { StyleSheet, View } from 'react-native';

import { theme } from '../../theme';

const StatusBarSpacer = () => <View style={styles.container} />;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: theme.specifications.statusBarHeight,
    backgroundColor: theme.colors.header,
  },
});

export default StatusBarSpacer;
