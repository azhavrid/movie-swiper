import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import TouchableScale from './TouchableScale';

class TouchableHighlightView extends React.PureComponent {
  state = { backgroundColor: undefined };

  onPressIn = () => {
    const { onPressIn, highlightColor } = this.props;

    this.setState({ backgroundColor: highlightColor });
    onPressIn();
  };

  onPressOut = () => {
    const { onPressOut } = this.props;

    this.setState({ backgroundColor: undefined });
    onPressOut();
  };

  render() {
    const { children, style, contentStyle, highlightColor, ...props } = this.props;

    return (
      <View style={[style, { backgroundColor: this.state.backgroundColor }]}>
        <TouchableScale
          {...props}
          style={contentStyle}
          highlightColor={highlightColor}
          onPressIn={this.onPressIn}
          onPressOut={this.onPressOut}
        >
          {children}
        </TouchableScale>
      </View>
    );
  }
}

TouchableHighlightView.propTypes = {
  highlightColor: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.any,
  contentStyle: PropTypes.any
};

TouchableHighlightView.defaultProps = {
  highlightColor: 'rgba(0,0,0,0.2)',
  onPressIn: () => {},
  onPressOut: () => {}
};

export default TouchableHighlightView;
