import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import FastImage, { FastImageProperties } from 'react-native-fast-image';
import Animated, { Easing, Extrapolate, interpolate } from 'react-native-reanimated';

import { theme } from '../theme';

/* ------------- Props and State ------------- */
type Props = {
  images: FastImageProperties['source'][];
  style?: ViewStyle;
};

/* ------------- Component ------------- */
const showTime = 3500;
const fadeOutTime = 700;
const imageAnimationDuration = showTime + fadeOutTime;

const scaleTo = 1.2;
const firstScaleMiddlePoint = (scaleTo - 1) * (fadeOutTime / imageAnimationDuration) + 1;

class ImageOpacityCycler extends React.PureComponent<Props> {
  imagesLoadedCount = 0;
  fullCycleTime = imageAnimationDuration * this.props.images.length - fadeOutTime;
  cycleAnimationValue = new Animated.Value<number>(0);
  contentDimmerAnimationValue = new Animated.Value<number>(1);

  initiateAnimation = () => {
    this.cycleAnimationValue.setValue(0);
    Animated.timing(this.cycleAnimationValue, {
      toValue: 1,
      duration: this.fullCycleTime,
      easing: Easing.linear,
    }).start(({ finished }) => {
      if (finished) {
        requestAnimationFrame(() => this.initiateAnimation());
      }
    });
  };

  getFractionByIndex = (index: number) => index / this.props.images.length;

  getFractionByTime = (time: number) => time / this.fullCycleTime;

  getAnimatedSlideStyle = (index: number) => {
    const isFirstImage = index === 0;
    const start = this.getFractionByIndex(index);
    const finish = this.getFractionByIndex(index + 1);
    const fadeOutFraction = this.getFractionByTime(fadeOutTime);

    const scale = isFirstImage
      ? interpolate(this.cycleAnimationValue, {
          inputRange: [0, finish, 1 - fadeOutFraction, 1],
          outputRange: [firstScaleMiddlePoint, scaleTo, 1, firstScaleMiddlePoint],
          extrapolate: Extrapolate.CLAMP,
        })
      : interpolate(this.cycleAnimationValue, {
          inputRange: [start - fadeOutFraction, finish, finish + 0.001],
          outputRange: [1, scaleTo, 1],
          extrapolate: Extrapolate.CLAMP,
        });

    const opacity = isFirstImage
      ? interpolate(this.cycleAnimationValue, {
          inputRange: [0, finish - fadeOutFraction, finish, 1 - fadeOutFraction, 1],
          outputRange: [1, 1, 0, 0, 1],
          extrapolate: Extrapolate.CLAMP,
        })
      : interpolate(this.cycleAnimationValue, {
          inputRange: [start - fadeOutFraction, finish - fadeOutFraction, finish],
          outputRange: [1, 1, 0],
          extrapolate: Extrapolate.CLAMP,
        });

    return { transform: [{ scale }], opacity };
  };

  onImageLoad = () => {
    this.imagesLoadedCount++;
    if (this.imagesLoadedCount === this.props.images.length) {
      this.initiateAnimation();

      Animated.timing(this.contentDimmerAnimationValue, {
        toValue: 0,
        duration: 300,
        easing: Easing.linear,
      }).start();
    }
  };

  renderImages = () => {
    const { images } = this.props;

    return images
      .map((image, index) => (
        <Animated.View key={`${image.toString()}${index}`} style={[styles.slide, this.getAnimatedSlideStyle(index)]}>
          <FastImage source={image} style={styles.image} onLoad={this.onImageLoad} resizeMode="cover" />
        </Animated.View>
      ))
      .reverse();
  };

  render() {
    const { style } = this.props;

    return (
      <View style={style}>
        {this.renderImages()}
        <View style={styles.dimmer} />
        <Animated.View style={[styles.backgroundColor, { opacity: this.contentDimmerAnimationValue }]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  dimmer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  backgroundColor: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.background,
  },
});

export default ImageOpacityCycler;
