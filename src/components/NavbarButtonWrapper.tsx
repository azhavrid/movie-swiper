import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import TouchableScale from './common/TouchableScale';

type Props = {
  children?: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
};

const NavbarButtonWrapper: React.FC<Props> = ({ children, style, onPress }) => (
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
