import React from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import { StyleSheet, View, Animated } from 'react-native';

const SHOW_TIME = 7000;
const SCALE_VALUE = 1.2;
const TRANSITION_DURATION = 1000;

class ImageOpacityCycler extends React.PureComponent {
  componentWillMount() {
    const { images } = this.props;
    this.configureCycler(images);
  }

  componentWillReceiveProps(nextProps) {
    const { images } = nextProps;
    if (this.props.images !== images) {
      this.configureCycler(images);
    }
  }

  getAnimatedSlideStyle(index) {
    const { scale, opacity } = this.state;
    return { transform: [{ scale: scale[index] }], opacity: opacity[index] };
  }

  configureCycler(images) {
    const loopedImages = [...images, images[0]];

    this.setState(
      {
        loopedImages,
        scale: loopedImages.map(() => new Animated.Value(1)),
        opacity: loopedImages.map(() => new Animated.Value(1))
      },
      () => {
        this.launchSlideAnimation(0);
      }
    );
  }

  launchSlideAnimation(index) {
    const { opacity, scale, loopedImages } = this.state;
    const isLastLoopedImage = index === loopedImages.length - 1;
    const nextIndex = isLastLoopedImage ? 0 : index + 1;

    this.resetAnimationValues(nextIndex);

    if (isLastLoopedImage) {
      this.launchSlideAnimation(0);
      return;
    }

    Animated.timing(scale[index], {
      toValue: SCALE_VALUE,
      duration: SHOW_TIME + TRANSITION_DURATION
    }).start();

    Animated.timing(opacity[index], {
      toValue: 1,
      duration: SHOW_TIME
    }).start(() => {
      this.launchSlideAnimation(nextIndex);

      Animated.timing(opacity[index], {
        toValue: 0,
        duration: TRANSITION_DURATION
      }).start();
    });
  }

  resetAnimationValues(index) {
    const { opacity, scale } = this.state;
    scale[index].setValue(1);
    opacity[index].setValue(1);
  }

  renderSlides() {
    const { loopedImages } = this.state;
    return (
      loopedImages &&
      loopedImages
        .map((image, index) => (
          <Animated.View key={index} style={[styles.slide, this.getAnimatedSlideStyle(index)]}>
            <FastImage source={image} style={styles.image} resizeMode="cover" />
          </Animated.View>
        ))
        .reverse()
    );
  }

  render() {
    const { style } = this.props;

    return (
      <View style={style}>
        {this.renderSlides()}
        <View style={styles.dimmer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    ...StyleSheet.absoluteFillObject
  },
  image: {
    height: '100%',
    width: '100%'
  },
  dimmer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.8)'
  }
});

ImageOpacityCycler.propTypes = {
  images: PropTypes.array.isRequired
};

export default ImageOpacityCycler;
