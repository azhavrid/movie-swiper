import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Theme from '../Theme';

class FooterLoading extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={30} color={Theme.gray.lightest} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.small
  }
});

export default FooterLoading;
