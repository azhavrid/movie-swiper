import React from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { theme } from '../../theme';
import AppText from './AppText';
import TouchableScale, { TouchableScaleProps } from './TouchableScale';

/* ------------- Props and State ------------- */
type OwnProps = {
  style?: ViewStyle;
  textStyle?: TextStyle;
  color?: string;
  text?: string;
  stretch?: boolean;
};
type Props = OwnProps & TouchableScaleProps;
export type PrimaryButtonProps = Props;

/* ------------- Component ------------- */
const PrimaryButton: React.FC<Props> = props => {
  const { children, text, style, textStyle, stretch, color = theme.colors.primary, ...otherProps } = props;
  return (
    <TouchableScale
      style={[styles.button, { backgroundColor: color, borderColor: color }, stretch && styles.stretch, style]}
      {...otherProps}
    >
      {text && (
        <AppText style={[styles.text, textStyle]} type="button" numberOfLines={1}>
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
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stretch: {
    alignSelf: 'stretch',
    marginHorizontal: 26,
  },
  text: {
    paddingHorizontal: theme.spacing.small,
    color: theme.gray.lightest,
  },
});

export default PrimaryButton;
