import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { hexToRgb } from '../utils/colors';

class InnerShadow extends React.PureComponent {
  render() {
    const {
      top,
      right,
      bottom,
      left,
      startOpacity,
      endOpacity,
      hexColor,
      size,
      style,
      ...props
    } = this.props;

    let shadowStart, shadowEnd, sizeStyle; // eslint-disable-line
    const shadowStyles = [styles.default];
    const rgbColor = hexColor ? hexToRgb(hexColor) : { r: 0, g: 0, b: 0 };
    const colors = [
      `rgba(${rgbColor.r},${rgbColor.g},${rgbColor.b},${startOpacity})`,
      `rgba(${rgbColor.r},${rgbColor.g},${rgbColor.b},${endOpacity})`
    ];

    if (right) {
      shadowStyles.push(styles.right);
      shadowStart = { x: 1, y: 0.5 };
      shadowEnd = { x: 0, y: 0.5 };
      sizeStyle = { width: size, height: '100%' };
    } else if (bottom) {
      shadowStyles.push(styles.bottom);
      shadowStart = { x: 0.5, y: 1 };
      shadowEnd = { x: 0.5, y: 0 };
      sizeStyle = { width: '100%', height: size };
    } else if (left) {
      shadowStyles.push(styles.left);
      shadowStart = { x: 0, y: 0.5 };
      shadowEnd = { x: 1, y: 0.5 };
      sizeStyle = { width: size, height: '100%' };
    } else if (top) {
      shadowStyles.push(styles.top);
      shadowStart = { x: 0.5, y: 0 };
      shadowEnd = { x: 0.5, y: 1 };
      sizeStyle = { width: '100%', height: size };
    }
    shadowStyles.push(sizeStyle);
    shadowStyles.push(style);

    return (
      <LinearGradient
        style={shadowStyles}
        start={shadowStart}
        end={shadowEnd}
        colors={colors}
        {...props}
      />
    );
  }
}

const styles = StyleSheet.create({
  default: {
    ...StyleSheet.absoluteFillObject
  },
  top: {
    bottom: undefined
  },
  right: {
    left: undefined
  },
  bottom: {
    top: undefined
  },
  left: {
    right: undefined
  }
});

InnerShadow.propTypes = {
  top: PropTypes.bool,
  right: PropTypes.bool,
  bottom: PropTypes.bool,
  left: PropTypes.bool,

  size: PropTypes.number,
  startOpacity: PropTypes.number,
  endOpacity: PropTypes.number,
  hexColor: PropTypes.string,
  style: PropTypes.any
};

InnerShadow.defaultProps = {
  top: true,
  size: 80,
  startOpacity: 0.6,
  endOpacity: 0
};

export default InnerShadow;
