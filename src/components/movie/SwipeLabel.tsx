import React from 'react';
import { Animated, ImageStyle, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

import images from '../../images';

/* ------------- Props and State ------------- */
type Props = {
  type: keyof typeof images.swipeLabels;
  opacity: Animated.Animated;
  style: ImageStyle;
};

/* ------------- Component ------------- */
const SwipeLabel = (props: Props) => {
  const { type, style, opacity } = props;
  const labelSource = images.swipeLabels[type];

  return (
    <Animated.View style={[styles.container, style, { opacity }]}>
      <FastImage resizeMode="contain" style={styles.label} source={labelSource} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  label: {
    height: 64,
    aspectRatio: 2.5,
  },
});

export default React.memo(SwipeLabel);
