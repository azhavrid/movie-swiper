import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { hexToRgb } from '../utils/colors';

/* ------------- Types ------------- */
type ShadowPosition = 'top' | 'right' | 'left' | 'bottom';
type xyValue = {
  x: number;
  y: number;
};

interface ShadowData {
  style: ViewStyle;
  shadowStart: xyValue;
  shadowEnd: xyValue;
  sizeStyle: ViewStyle;
}

/* ------------- Props and State ------------- */
type Props = {
  hexColor?: string;
  style?: ViewStyle;
} & typeof defaultProps;

const defaultProps = {
  position: 'top' as ShadowPosition,
  size: 80,
  startOpacity: 0.6,
  endOpacity: 0,
};

/* ------------- Component ------------- */
class InnerShadow extends React.PureComponent<Props> {
  static defaultProps = defaultProps;

  shadowDataMap: Record<ShadowPosition, ShadowData> = {
    right: {
      style: styles.right,
      shadowStart: { x: 1, y: 0.5 },
      shadowEnd: { x: 0, y: 0.5 },
      sizeStyle: { width: this.props.size },
      // asd: { width: this.props.size, height: '100%' },
    },
    bottom: {
      style: styles.bottom,
      shadowStart: { x: 0.5, y: 1 },
      shadowEnd: { x: 0.5, y: 0 },
      sizeStyle: { height: this.props.size },
    },
    left: {
      style: styles.left,
      shadowStart: { x: 0, y: 0.5 },
      shadowEnd: { x: 1, y: 0.5 },
      sizeStyle: { width: this.props.size },
      // asd: { width: this.props.size, height: '100%' },
    },
    top: {
      style: styles.top,
      shadowStart: { x: 0.5, y: 0 },
      shadowEnd: { x: 0.5, y: 1 },
      sizeStyle: { height: this.props.size },
    },
  };

  getShadowColors = () => {
    const { startOpacity, endOpacity, hexColor } = this.props;
    const rgbColor = hexToRgb(hexColor) || { r: 0, g: 0, b: 0 };
    const colors = [
      `rgba(${rgbColor.r},${rgbColor.g},${rgbColor.b},${startOpacity})`,
      `rgba(${rgbColor.r},${rgbColor.g},${rgbColor.b},${endOpacity})`,
    ];

    return colors;
  };

  render() {
    const { position, style, ...props } = this.props;

    const colors = this.getShadowColors();
    const shadowData = this.shadowDataMap[position];
    const shadowStyles = StyleSheet.flatten([styles.absoluteFill, shadowData.style, shadowData.sizeStyle, style]);

    return (
      <LinearGradient
        style={shadowStyles}
        start={shadowData.shadowStart}
        end={shadowData.shadowEnd}
        colors={colors}
        {...props}
      />
    );
  }
}

const styles = StyleSheet.create({
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  top: {
    bottom: undefined,
  },
  right: {
    left: undefined,
  },
  bottom: {
    top: undefined,
  },
  left: {
    right: undefined,
  },
});

export default InnerShadow;
