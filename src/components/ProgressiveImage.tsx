import React, { useState } from 'react';
import FastImage, { FastImageProperties, OnLoadEvent } from 'react-native-fast-image';
import { StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage) as FastImage;

/* ------------- Local ------------- */
const { Value, timing, Clock, startClock, stopClock } = Animated;

/* ------------- Props and State ------------- */
type OwnProps = {
  source: FastImageProperties['source'];
  thumbnailSource: FastImageProperties['source'];
  style?: ViewStyle;
  imageStyle?: ImageStyle;
};

type Props = OwnProps & FastImageProperties;

/* ------------- Class ------------- */
const ProgressiveImage = (props: Props) => {
  const { style, source, imageStyle, thumbnailSource, onLoad, ...otherProps } = props;
  const [isImageShown, setIsImageShown] = useState(false);
  const [imageOpacity] = useState(new Value(0));

  const onImageLoad = (event: OnLoadEvent) => {
    onLoad && onLoad(event);
    Animated.timing(imageOpacity, {
      toValue: 1,
      duration: 250,
      easing: Easing.out(Easing.sin),
    }).start(() => {
      setIsImageShown(true);
    });
  };

  return (
    <Animated.View style={style}>
      {!isImageShown && (
        <FastImage {...otherProps} source={thumbnailSource} style={[StyleSheet.absoluteFill, imageStyle]} />
      )}
      <AnimatedFastImage
        {...otherProps}
        source={source}
        onLoad={onImageLoad}
        style={[StyleSheet.absoluteFill, { opacity: imageOpacity } as any, imageStyle]}
      />
    </Animated.View>
  );
};

export default React.memo(ProgressiveImage);
