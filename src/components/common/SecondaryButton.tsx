import React from 'react';
import { StyleSheet } from 'react-native';
import PrimaryButton, { Props as PrimaryButtonProps } from './PrimaryButton';
import { theme } from '../../theme';

/* ------------- Props and State ------------- */
type Props = PrimaryButtonProps;

/* ------------- Class ------------- */
const SecondaryButton: React.FC<Props> = props => {
  const { children, style, textStyle, color = theme.colors.primaryVariant, ...otherProps } = props;
  return (
    <PrimaryButton
      style={[styles.button, style]}
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
