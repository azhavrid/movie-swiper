import React from 'react';
import { Text, StyleSheet, TextStyle, TextProps } from 'react-native';

import { getFontStyle } from '../../utils/fonts';
import { theme, AppTypographyKeys } from '../../theme';

/* ------------- Props and State ------------- */
type OwnProps = {
  children: React.ReactNode;
  type?: AppTypographyKeys;
  style?: TextStyle;
};
type Props = OwnProps & TextProps;

/* ------------- Class ------------- */
const AppText = (props: Props) => {
  const { children, style, type = 'body', ...otherProps } = props;
  const textStyles = StyleSheet.flatten([styles.text, theme.typography[type], style]);

  return (
    <Text {...otherProps} style={textStyles}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: theme.gray.lightest,
    ...getFontStyle(),
  },
});

export default AppText;
