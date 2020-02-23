import React from 'react';
import { Animated, Easing, StyleSheet, View, ViewStyle } from 'react-native';

import { theme } from '../theme';

/* ------------- Local ------------- */
const scaleTime = 1000;
const easingFunction = Easing.out(Easing.bezier(0.445, 0.05, 0.55, 0.95));

/* ------------- Props and State ------------- */
type Props = {
  style?: ViewStyle;
} & typeof defaultProps;

const defaultProps = {
  color: theme.gray.lightest,
  size: 50,
};

/* ------------- Component ------------- */
class CircleLoadingIndicator extends React.PureComponent<Props> {
  static defaultProps = defaultProps;
  scaleValues = [new Animated.Value(1), new Animated.Value(0)];

  componentDidMount() {
    this.animate(true);
  }

  scale = (index: number, toShrink: boolean, onComplete?: () => void) => {
    const animatedValue = this.scaleValues[index];
    const toValue = toShrink ? 0.01 : 1;

    Animated.timing(animatedValue, {
      toValue,
      easing: easingFunction,
      duration: scaleTime,
      useNativeDriver: true,
    }).start(() => onComplete && onComplete());
  };

  animate = (toShrink: boolean) => {
    this.scale(0, toShrink);
    this.scale(1, !toShrink, () => this.animate(!toShrink));
  };

  getAnimatedStyle = (index: number) => ({ transform: [{ scale: this.scaleValues[index] }] });

  render() {
    const { color, size, style } = this.props;

    const circleStyle = {
      width: size,
      height: size,
      backgroundColor: color,
    };

    return (
      <View style={style}>
        <Animated.View style={[styles.circle, circleStyle, this.getAnimatedStyle(0)]} />
        <Animated.View style={[styles.circle, circleStyle, this.getAnimatedStyle(1), styles.absolute]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    borderRadius: 999,
    opacity: 0.6,
  },
  absolute: {
    position: 'absolute',
  },
});

export default CircleLoadingIndicator;
