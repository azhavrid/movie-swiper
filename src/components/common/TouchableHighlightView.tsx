import React from 'react';
import { View, ViewStyle, StyleSheet, GestureResponderEvent } from 'react-native';
import TouchableScale, { TouchableScaleProps } from './TouchableScale';
import { WithDefaultProps } from '../../types';

/* ------------- Props and State ------------- */
export type TouchableHighlightViewProps = WithDefaultProps<Props, typeof defaultProps>;

type OwnProps = {
  style?: ViewStyle;
  contentStyle?: ViewStyle;
} & typeof defaultProps;

type Props = OwnProps & TouchableScaleProps;

const defaultProps = {
  highlightColor: 'rgba(0,0,0,0.2)',
};

type State = typeof initialState;

const initialState = {
  backgroundColor: undefined as undefined | string,
};

/* ------------- Class ------------- */
class TouchableHighlightView extends React.PureComponent<Props, State> {
  static defaultProps = defaultProps;
  state = initialState;

  onPressIn = (event: GestureResponderEvent) => {
    const { onPressIn, highlightColor } = this.props;
    this.setState({ backgroundColor: highlightColor });
    onPressIn && onPressIn(event);
  };

  onPressOut = (event: GestureResponderEvent) => {
    const { onPressOut } = this.props;
    this.setState({ backgroundColor: undefined });
    onPressOut && onPressOut(event);
  };

  render() {
    const { children, style, contentStyle, ...props } = this.props;

    return (
      <View style={StyleSheet.flatten([style, { backgroundColor: this.state.backgroundColor }])}>
        <TouchableScale {...props} style={contentStyle} onPressIn={this.onPressIn} onPressOut={this.onPressOut}>
          {children}
        </TouchableScale>
      </View>
    );
  }
}

export default TouchableHighlightView;
