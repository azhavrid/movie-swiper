import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';
import { getFontStyleObject } from '../../utils/font';
import Theme from '../../Theme';

const AppText = props => {
  const { children, style, type } = props;
  !Theme.typography[type] && console.warn(`AppText: There is no ${type} type in typography.`);
  const textStyles = [styles.text, Theme.typography[type], style];

  return (
    <Text {...props} style={textStyles}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Theme.gray.lightest,
    ...getFontStyleObject()
  }
});

AppText.propTypes = {
  type: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.any
};

AppText.defaultProps = {
  type: 'body'
};

export default AppText;
