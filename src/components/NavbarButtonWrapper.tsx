import React from 'react';
import { View, StyleSheet } from 'react-native';

import TouchableScale from './common/TouchableScale';
import { ButtonComponentProps } from 'react-navigation-tabs/lib/typescript/src/types';

/* ------------- Class ------------- */
class NavbarButtonWrapper extends React.PureComponent<ButtonComponentProps> {
  render() {
    const { children, style, onPress } = this.props;
    return (
      <View style={[style, styles.container]}>
        <TouchableScale onPress={onPress} initialScale={0.9} scaleFactor={0.9} style={styles.touchable}>
          {children}
        </TouchableScale>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
  },
  touchable: {
    flex: 1,
  },
});

export default NavbarButtonWrapper;
