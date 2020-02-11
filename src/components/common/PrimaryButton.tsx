import React from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import AppText from './AppText';
import TouchableScale, { TouchableScaleProps } from './TouchableScale';
import { theme } from '../../theme';

/* ------------- Props and State ------------- */
type OwnProps = {
  style?: ViewStyle;
  textStyle?: TextStyle;
  color?: string;
  text?: string;
  stretch?: boolean;
};

export type Props = OwnProps & TouchableScaleProps;

/* ------------- Class ------------- */
const PrimaryButton: React.FC<Props> = props => {
  const { children, text, style, textStyle, stretch, color = theme.colors.primary, ...otherProps } = props;
  return (
    <TouchableScale
      style={[styles.button, { backgroundColor: color, borderColor: color }, stretch && styles.stretch, style]}
      {...otherProps}
    >
      {text && (
        <AppText style={[styles.text, textStyle]} type="button">
          {text}
        </AppText>
      )}
      {children}
    </TouchableScale>
  );
};

const styles = StyleSheet.create({
  button: {
    minWidth: 140,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stretch: {
    alignSelf: 'stretch',
    marginHorizontal: 26,
  },
  text: {
    paddingVertical: 16,
    paddingHorizontal: theme.spacing.small,
    color: theme.gray.lightest,
  },
});

export default PrimaryButton;
