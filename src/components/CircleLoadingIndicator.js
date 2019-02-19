import React from 'react';
import PropTypes from 'prop-types';
import { View, Animated, StyleSheet, Easing } from 'react-native';

const SCALE_TIME = 1000;
const EASING_FUNCTION = Easing.out(Easing.bezier(0.445, 0.05, 0.55, 0.95));

class CircleLoadingIndicator extends React.PureComponent {
  state = {
    scales: [new Animated.Value(1), new Animated.Value(0)]
  };

  componentDidMount() {
    this.animate(true);
  }

  getAnimatedStyle(index) {
    const { scales } = this.state;
    return { transform: [{ scale: scales[index] }] };
  }

  scaleUp(animatedValue, onComplete) {
    Animated.timing(animatedValue, {
      toValue: 1,
      easing: EASING_FUNCTION,
      duration: SCALE_TIME,
      useNativeDriver: true
    }).start(() => onComplete && onComplete());
  }

  scaleDown(animatedValue, onComplete) {
    Animated.timing(animatedValue, {
      toValue: 0.01,
      easing: EASING_FUNCTION,
      duration: SCALE_TIME,
      useNativeDriver: true
    }).start(() => onComplete && onComplete());
  }

  animate(toShrink) {
    const { scales } = this.state;

    const firstCircleFunc = toShrink ? this.scaleDown : this.scaleUp;
    const secondCircleFunc = toShrink ? this.scaleUp : this.scaleDown;

    firstCircleFunc(scales[0]);
    secondCircleFunc(scales[1], () => this.animate(!toShrink));
  }

  render() {
    const { color, size, style } = this.props;

    const circleStyle = {
      width: size,
      height: size,
      backgroundColor: color
    };

    return (
      <View style={[styles.container, style]}>
        <Animated.View style={[styles.circle, circleStyle, this.getAnimatedStyle(0)]} />
        <Animated.View
          style={[styles.circle, circleStyle, { position: 'absolute' }, this.getAnimatedStyle(1)]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  circle: {
    borderRadius: 999,
    opacity: 0.6
  }
});

CircleLoadingIndicator.propTypes = {
  style: PropTypes.any,
  color: PropTypes.string,
  size: PropTypes.number
};

CircleLoadingIndicator.defaultProps = {
  color: '#ffffff',
  size: 50
};

export default CircleLoadingIndicator;
