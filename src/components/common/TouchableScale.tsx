import React from 'react';
import {
  Animated,
  GestureResponderEvent,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  ViewStyle,
} from 'react-native';
import { throttle } from 'throttle-debounce';

import { WithDefaultProps } from '../../types';

/* ------------- Props and State ------------- */
export type TouchableScaleProps = WithDefaultProps<Props, typeof defaultProps>;

type OwnProps = {
  style?: ViewStyle;
} & typeof defaultProps;
type Props = OwnProps & TouchableWithoutFeedbackProps;
type State = typeof initialState;

const defaultProps = {
  throttleTime: 800,
  activeOpacity: 0.7,
  initialScale: 1,
  scaleFactor: 0.95,
};

const initialState = {
  isHovered: false,
};

/* ------------- Component ------------- */

class TouchableScale extends React.PureComponent<Props, State> {
  static defaultProps = defaultProps;
  state = initialState;
  buttonAnimatedValue = new Animated.Value(this.props.initialScale);
  scaleToValue = this.props.initialScale * this.props.scaleFactor;

  onPressIn = (event: GestureResponderEvent) => {
    const { onPressIn } = this.props;
    this.setState({ isHovered: true });
    this.buttonAnimatedValue.setValue(this.scaleToValue);
    onPressIn && onPressIn(event);
  };

  onPressOut = (event: GestureResponderEvent) => {
    const { initialScale, onPressOut } = this.props;
    this.setState({ isHovered: false });
    this.buttonAnimatedValue.setValue(initialScale);
    onPressOut && onPressOut(event);
  };

  onPress = (event: GestureResponderEvent) => {
    const { onPress } = this.props;
    onPress(event);
  };

  throttledOnPress = throttle(this.props.throttleTime, true, this.onPress);

  getAnimatedStyle = () => {
    const { activeOpacity, initialScale } = this.props;

    const opacity = this.buttonAnimatedValue.interpolate({
      inputRange: [this.scaleToValue, initialScale],
      outputRange: [activeOpacity, 1],
    });

    return {
      transform: [{ scale: this.buttonAnimatedValue }],
      opacity,
    };
  };

  render() {
    const { children, style, ...props } = this.props;

    return (
      <TouchableWithoutFeedback
        {...props}
        onPress={this.throttledOnPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
      >
        <Animated.View style={[style, this.getAnimatedStyle()]}>{children}</Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

export default TouchableScale;
