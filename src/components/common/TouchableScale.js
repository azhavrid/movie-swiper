import React from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

class TouchableScale extends React.PureComponent {
  constructor(props) {
    super(props);

    const { initialScale, scaleFactor } = props;
    this.state = {
      buttonAnimatedValue: new Animated.Value(initialScale),
      isPressed: false
    };

    this.scaleToValue = initialScale * scaleFactor;
  }

  onPressIn = () => {
    const { animationTime, onPressIn } = this.props;
    const { buttonAnimatedValue } = this.state;

    this.setState({ isPressed: true });
    Animated.timing(buttonAnimatedValue, {
      toValue: this.scaleToValue,
      duration: animationTime
    }).start();

    onPressIn();
  };

  onPressOut = () => {
    const { animationTime, initialScale, onPressOut } = this.props;
    const { buttonAnimatedValue } = this.state;

    this.setState({ isPressed: false });

    Animated.timing(buttonAnimatedValue, {
      toValue: initialScale,
      duration: animationTime
    }).start();

    onPressOut();
  };

  getAnimatedStyle = () => {
    const { activeOpacity, initialScale, toScale } = this.props;
    const { buttonAnimatedValue } = this.state;

    const opacity = buttonAnimatedValue.interpolate({
      inputRange: [this.scaleToValue, initialScale],
      outputRange: [activeOpacity, 1]
    });

    return {
      transform: toScale ? [{ scale: buttonAnimatedValue }] : [],
      opacity
    };
  };

  render() {
    const { children, style, ...props } = this.props;

    return (
      <TouchableWithoutFeedback {...props} onPressIn={this.onPressIn} onPressOut={this.onPressOut}>
        <Animated.View style={[style, this.getAnimatedStyle()]}>{children}</Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

TouchableScale.propTypes = {
  activeOpacity: PropTypes.number,
  initialScale: PropTypes.number,
  animationTime: PropTypes.number,
  scaleFactor: PropTypes.number,
  toScale: PropTypes.bool,
  children: PropTypes.any,
  style: PropTypes.any
};

TouchableScale.defaultProps = {
  activeOpacity: 0.7,
  initialScale: 1,
  animationTime: 1,
  scaleFactor: 0.95,
  toScale: true,

  onPressIn: () => {},
  onPressOut: () => {}
};

export default TouchableScale;
