import React from 'react';
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';

import { AppTypographyKeys, theme } from '../../theme';
import { getFontStyle } from '../../utils/fonts';

/* ------------- Props and State ------------- */
type OwnProps = {
  children: React.ReactNode;
  type?: AppTypographyKeys;
  style?: TextStyle;
};
type Props = OwnProps & TextProps;

/* ------------- Component ------------- */
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
