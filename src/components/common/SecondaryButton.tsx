import React from 'react';
import { StyleSheet } from 'react-native';

import { theme } from '../../theme';
import PrimaryButton, { PrimaryButtonProps } from './PrimaryButton';

/* ------------- Props and State ------------- */
type Props = PrimaryButtonProps;

/* ------------- Component ------------- */
const SecondaryButton: React.FC<Props> = props => {
  const { children, style, textStyle, color = theme.colors.primaryVariant, ...otherProps } = props;
  return (
    <PrimaryButton
      style={[styles.button, style]}
      color={color}
      textStyle={StyleSheet.flatten([{ color }, textStyle])}
      {...otherProps}
    >
      {children}
    </PrimaryButton>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: undefined,
    borderWidth: 1,
  },
});

export default SecondaryButton;
