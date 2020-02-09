import React from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import AppText from './AppText';
import TouchableScale, { TouchableScaleProps } from './TouchableScale';
import { theme } from '../../theme';

/* ------------- Props and State ------------- */
type OwnProps = {
  onlyText?: boolean;
  outline?: boolean;
  rounded?: boolean;
  solid?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
} & typeof defaultProps;

type Props = OwnProps & TouchableScaleProps;

const defaultProps = {
  color: theme.colors.primary,
};

/* ------------- Class ------------- */
class AppButton extends React.PureComponent<Props> {
  static defaultProps = defaultProps;

  render() {
    const { children, color, onlyText, outline, rounded, solid, style, textStyle, ...props } = this.props;

    const buttonStyles = StyleSheet.flatten([
      styles.defaultButton,
      { backgroundColor: color, borderColor: color },
      onlyText && styles.onlyTextButton,
      outline && styles.outlineButton,
      rounded && styles.roundedButton,
      solid && styles.solidButton,
      style,
    ]);

    const textStyles = StyleSheet.flatten([
      onlyText ? styles.onlyTextText : styles.defaultText,
      (onlyText || outline) && { color },
      textStyle,
    ]);

    return (
      <TouchableScale {...props} style={buttonStyles}>
        <AppText style={textStyles}>{children}</AppText>
      </TouchableScale>
    );
  }
}

const styles = StyleSheet.create({
  defaultButton: {
    minWidth: 140,
    borderWidth: 0,
    borderRadius: 6,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  solidButton: {
    borderRadius: 0,
  },
  outlineButton: {
    backgroundColor: undefined,
    borderWidth: 1,
  },
  roundedButton: {
    borderRadius: 999,
  },
  onlyTextButton: {
    borderRadius: undefined,
    backgroundColor: undefined,
    minWidth: undefined,
    paddingVertical: undefined,
  },
  defaultText: {
    ...theme.typography.button,
    paddingHorizontal: theme.spacing.small,
    color: theme.gray.lightest,
  },
  onlyTextText: {
    ...theme.typography.onlyTextButton,
  },
});

export default AppButton;
