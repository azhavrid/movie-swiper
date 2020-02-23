import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonComponentProps } from 'react-navigation-tabs/lib/typescript/src/types';

import TouchableScale from './common/TouchableScale';

/* ------------- Component ------------- */
const NavbarButtonWrapper: React.FC<ButtonComponentProps> = ({ children, style, onPress }) => (
  <View style={[style, styles.container]}>
    <TouchableScale onPress={onPress} initialScale={0.9} scaleFactor={0.9} style={styles.touchable}>
      {children}
    </TouchableScale>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
  },
  touchable: {
    flex: 1,
  },
});

export default NavbarButtonWrapper;
