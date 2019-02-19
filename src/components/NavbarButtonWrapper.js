import React from 'react';
import { View } from 'react-native';
import { TouchableScale } from './common';

class NavbarButtonWrapper extends React.Component {
  render() {
    const { children, style, onPress } = this.props;
    return (
      <View style={style}>
        <TouchableScale onPress={onPress} initialScale={0.9} scaleFactor={0.9} style={{ flex: 1 }}>
          {children}
        </TouchableScale>
      </View>
    );
  }
}

export default NavbarButtonWrapper;
