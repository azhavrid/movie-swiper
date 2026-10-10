import React, { useRef, useState } from 'react';
import { Animated, Easing, ImageProps, ImageSourcePropType, ImageStyle, StyleSheet, ViewStyle } from 'react-native';

import FastImage from '../shims/FastImage';

type OwnProps = {
  source: ImageSourcePropType;
  thumbnailSource: ImageSourcePropType;
  style?: ViewStyle;
  imageStyle?: ImageStyle;
};

type Props = OwnProps & Omit<ImageProps, 'source'>;

const ProgressiveImage = (props: Props) => {
  const { style, source, imageStyle, thumbnailSource, onLoad, ...otherProps } = props;
  const [isImageShown, setIsImageShown] = useState(false);
  const imageOpacity = useRef(new Animated.Value(0)).current;

  const onImageLoad: ImageProps['onLoad'] = event => {
    Animated.timing(imageOpacity, {
      toValue: 1,
      duration: 250,
      easing: Easing.out(Easing.sin),
      useNativeDriver: true,
    }).start(() => {
      setIsImageShown(true);
    });

    onLoad && onLoad(event);
  };

  return (
    <Animated.View style={style}>
      {!isImageShown && (
        <FastImage {...otherProps} source={thumbnailSource} style={[StyleSheet.absoluteFill, imageStyle]} />
      )}
      <Animated.Image
        {...otherProps}
        source={source}
        onLoad={onImageLoad}
        style={[StyleSheet.absoluteFill, { opacity: imageOpacity }, imageStyle]}
      />
    </Animated.View>
  );
};

export default React.memo(ProgressiveImage);
