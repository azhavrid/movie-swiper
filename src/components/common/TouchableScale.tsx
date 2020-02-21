import React from 'react';
import {
  Animated,
  ViewStyle,
  GestureResponderEvent,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import { throttle } from 'throttle-debounce';
import { WithDefaultProps } from '../../types';

/* ------------- Props and State ------------- */
export type TouchableScaleProps = WithDefaultProps<Props, typeof defaultProps>;

type OwnProps = {
  toScale?: boolean;
  style?: ViewStyle;
} & typeof defaultProps;

type Props = OwnProps & TouchableWithoutFeedbackProps;
type State = ReturnType<typeof getInitialState>;

const defaultProps = {
  throttleTime: 800,
  activeOpacity: 0.7,
  initialScale: 1,
  animationTime: 1,
  scaleFactor: 0.95,
};

const getInitialState = (props: Props) => ({
  isHovered: false,
  buttonAnimatedValue: new Animated.Value(props.initialScale),
});

/* ------------- Class ------------- */

class TouchableScale extends React.PureComponent<Props, State> {
  static defaultProps = defaultProps;
  state = getInitialState(this.props);

  scaleToValue = this.props.initialScale * this.props.scaleFactor;

  onPressIn = (event: GestureResponderEvent) => {
    const { animationTime, onPressIn } = this.props;
    const { buttonAnimatedValue } = this.state;

    this.setState({ isHovered: true });

    buttonAnimatedValue.stopAnimation(() => {
      Animated.timing(buttonAnimatedValue, {
        toValue: this.scaleToValue,
        duration: animationTime,
      }).start();
    });

    onPressIn && onPressIn(event);
  };

  onPressOut = (event: GestureResponderEvent) => {
    const { animationTime, initialScale, onPressOut } = this.props;
    const { buttonAnimatedValue } = this.state;

    this.setState({ isHovered: false });

    buttonAnimatedValue.stopAnimation(() => {
      Animated.timing(buttonAnimatedValue, {
        toValue: initialScale,
        duration: animationTime,
      }).start();
    });

    onPressOut && onPressOut(event);
  };

  onPress = (event: GestureResponderEvent) => {
    const { onPress } = this.props;
    onPress(event);
  };

  throttlePress = throttle(this.props.throttleTime, true, this.onPress);

  getAnimatedStyle = () => {
    const { activeOpacity, initialScale, toScale } = this.props;
    const { buttonAnimatedValue } = this.state;

    const opacity = buttonAnimatedValue.interpolate({
      inputRange: [this.scaleToValue, initialScale],
      outputRange: [activeOpacity, 1],
    });

    return {
      transform: toScale ? [{ scale: buttonAnimatedValue }] : [],
      opacity,
    };
  };

  render() {
    const { children, style, ...props } = this.props;

    return (
      <TouchableWithoutFeedback
        {...props}
        onPress={this.throttlePress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
      >
        <Animated.View style={[style, this.getAnimatedStyle()]}>{children}</Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

export default TouchableScale;
