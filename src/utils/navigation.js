import { Animated, Easing } from 'react-native';
import Theme from '../Theme';

export const fromRightWithPreviousScreenScale = (duration = 450) => ({
  transitionSpec: {
    duration,
    easing: Easing.out(Easing.cubic),
    timing: Animated.timing,
    useNativeDriver: true
  },
  screenInterpolator: ({ layout, position, scene }) => {
    const { index } = scene;
    const { initWidth } = layout;

    const translateX = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [initWidth, 0, 0]
    });

    const opacity = position.interpolate({
      inputRange: [index - 1, index - 0.99, index],
      outputRange: [0, 1, 1]
    });

    const scale = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [1, 1, 0.8]
    });

    return {
      opacity,
      transform: [{ translateX }, { scaleX: scale }, { scaleY: scale }],
      backgroundColor: Theme.colors.background
    };
  },
  containerStyle: {
    backgroundColor: '#000'
  }
});

export const fromRightWithFade = (duration = 200) => ({
  transitionSpec: {
    duration,
    easing: Easing.out(Easing.sin),
    timing: Animated.timing,
    useNativeDriver: true
  },
  screenInterpolator: ({ layout, position, scene }) => {
    const { index } = scene;
    const { initWidth } = layout;

    const translateX = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [initWidth * 0.3, 0, 0]
    });

    const opacity = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [0, 1, 1]
    });

    return {
      opacity,
      transform: [{ translateX }],
      backgroundColor: Theme.colors.background
    };
  },
  containerStyle: {
    backgroundColor: '#000'
  }
});

export const fadeIn = (duration = 250) => ({
  transitionSpec: {
    duration,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
    useNativeDriver: true
  },
  screenInterpolator: ({ position, scene }) => {
    const { index } = scene;

    const opacity = position.interpolate({
      inputRange: [index - 1, index],
      outputRange: [0, 1]
    });

    return { opacity };
  }
});
