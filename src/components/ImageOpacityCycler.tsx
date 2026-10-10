import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View, ViewStyle } from 'react-native';

import { theme } from '../theme';

type Props = {
  images: ImageSourcePropType[];
  style?: ViewStyle;
};

/** Simplified static backdrop (animation removed for RN 0.87 stability). */
class ImageOpacityCycler extends React.PureComponent<Props> {
  render() {
    const { style, images } = this.props;
    const source = images[0];

    return (
      <View style={style} pointerEvents="none">
        {!!source && <Image source={source} style={styles.image} resizeMode="cover" />}
        <View style={styles.dimmer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  dimmer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
});

export default ImageOpacityCycler;
