import React from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import { StyleSheet, View, Dimensions, Animated } from 'react-native';

const { width } = Dimensions.get('window');
const SHOW_TIME = 5000;
const SCALE_VALUE = 1.2;
const TRANSITION_DURATION = 300;

class ImageSlider extends React.PureComponent {
  componentWillMount() {
    const { images } = this.props;
    this.configureSlider(images);
  }

  componentWillReceiveProps(nextProps) {
    const { images } = nextProps;
    if (this.props.images !== images) {
      this.configureSlider(images);
    }
  }

  getAnimatedSlideStyle(index) {
    const { position, scale } = this.state;
    return {
      ...position[index].getLayout(),
      transform: [{ scale: scale[index] }]
    };
  }

  configureSlider(images) {
    const loopedImages = [...images, images[0]];

    this.setState(
      {
        loopedImages,
        scale: loopedImages.map(() => new Animated.Value(1)),
        position: loopedImages.map((p, i) => new Animated.ValueXY({ x: i > 0 ? width : 0, y: 0 }))
      },
      () => {
        this.launchSlideAnimation(0);
      }
    );
  }

  launchSlideAnimation(index) {
    const { zooming } = this.props;
    const { position, scale, loopedImages } = this.state;
    const isLastLoopedImage = index === loopedImages.length - 1;
    const nextIndex = isLastLoopedImage ? 0 : index + 1;

    if (isLastLoopedImage) {
      this.resetAnimationValues(index);
      this.launchSlideAnimation(0);
      return;
    }

    if (zooming) {
      Animated.timing(scale[index], {
        toValue: SCALE_VALUE,
        duration: SHOW_TIME + TRANSITION_DURATION
      }).start();
    }

    Animated.timing(position[nextIndex], {
      toValue: { x: 0, y: 0 },
      delay: SHOW_TIME,
      duration: TRANSITION_DURATION
    }).start(() => {
      this.resetAnimationValues(index);
      this.launchSlideAnimation(nextIndex);
    });
  }

  resetAnimationValues(index) {
    const { scale, position } = this.state;
    const isInitialImage = index === 0;
    scale[index].setValue(1);
    position[index].setValue({ x: isInitialImage ? 0 : width, y: 0 });
  }

  renderSlides() {
    const { loopedImages } = this.state;
    return (
      loopedImages &&
      loopedImages.map((image, index) => (
        <Animated.View key={index} style={[styles.slide, this.getAnimatedSlideStyle(index)]}>
          <FastImage source={image} style={styles.image} resizeMode="cover" />
        </Animated.View>
      ))
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

ImageSlider.propTypes = {
  images: PropTypes.array.isRequired,
  zooming: PropTypes.bool,
  style: PropTypes.any
};

ImageSlider.defaultProps = {
  zooming: true
};

export default ImageSlider;
