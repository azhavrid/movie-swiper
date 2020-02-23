import React from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { theme } from '../../theme';
import AppText from './AppText';
import TouchableScale, { TouchableScaleProps } from './TouchableScale';

/* ------------- Props and State ------------- */
type OwnProps = {
  text: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  color?: string;
};
type Props = OwnProps & TouchableScaleProps;
export type TextButtonProps = Props;

/* ------------- Component ------------- */
const TextButton: React.FC<Props> = props => {
  const { text, style, textStyle, color = theme.colors.primary, ...otherProps } = props;
  return (
    <TouchableScale style={[styles.button, style]} {...otherProps}>
      <AppText style={[styles.text, { color }, textStyle]} type="textButton">
        {text}
      </AppText>
    </TouchableScale>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: undefined,
  },
  text: {
    paddingHorizontal: theme.spacing.small,
    color: theme.gray.lightest,
  },
});

export default TextButton;
