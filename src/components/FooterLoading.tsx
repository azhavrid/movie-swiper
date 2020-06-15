import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { theme } from '../theme';

/* ------------- Component ------------- */
const FooterLoading: React.FC = () => (
  <View style={styles.container}>
    <ActivityIndicator size={theme.specifications.activitySmallIndicatorSize} color={theme.gray.lightest} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.small,
  },
});

export default FooterLoading;
