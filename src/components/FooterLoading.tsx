import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '../theme';

/* ------------- Props and State ------------- */

/* ------------- Class ------------- */
class FooterLoading extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={theme.specifications.activitySmallIndicatorSize} color={theme.gray.lightest} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.small,
  },
});

export default FooterLoading;
