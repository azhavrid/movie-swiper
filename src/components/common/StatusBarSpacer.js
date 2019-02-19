import React from 'react';
import { View, StyleSheet } from 'react-native';
import Theme from '../../Theme';

const StatusBarSpacer = () => <View style={styles.container} />;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Theme.specifications.statusBarHeight,
    backgroundColor: Theme.colors.header
  }
});

export default StatusBarSpacer;
