import React from 'react';
import FastImage from 'react-native-fast-image';
import { StyleSheet, ImageStyle, Animated } from 'react-native';

import images from '../../images';

/* ------------- Props and State ------------- */
type Props = {
  type: keyof typeof images.swipeLabels;
  opacity: Animated.Animated;
  style: ImageStyle;
};

/* ------------- Class ------------- */
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
