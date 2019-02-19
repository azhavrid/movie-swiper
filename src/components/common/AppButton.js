import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import AppText from './AppText';
import TouchableScale from './TouchableScale';
import Theme from '../../Theme';

class AppButton extends React.PureComponent {
  render() {
    const {
      children,
      color,
      onlyText,
      outline,
      rounded,
      solid,
      style,
      textStyle,
      ...props
    } = this.props;
    
    const buttonStyles = [
      styles.defaultButton,
      { backgroundColor: color, borderColor: color },
      onlyText && styles.onlyTextButton,
      outline && styles.outlineButton,
      rounded && styles.roundedButton,
      solid && styles.solidButton,
      style
    ];

    const textStyles = [
      onlyText ? styles.onlyTextText : styles.defaultText,
      (onlyText || outline) && { color },
      textStyle
    ];

    return (
      <TouchableScale style={buttonStyles} {...props}>
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
    alignItems: 'center'
  },
  solidButton: {
    borderRadius: 0
  },
  outlineButton: {
    backgroundColor: undefined,
    borderWidth: 1
  },
  roundedButton: {
    borderRadius: 999
  },
  onlyTextButton: {
    borderRadius: undefined,
    backgroundColor: undefined,
    minWidth: undefined,
    paddingVertical: undefined
  },
  defaultText: {
    ...Theme.typography.button,
    paddingHorizontal: Theme.spacing.small,
    color: Theme.gray.lightest
  },
  onlyTextText: {
    ...Theme.typography.onlyTextButton
  }
});

AppButton.propTypes = {
  color: PropTypes.string,
  onlyText: PropTypes.bool,
  outline: PropTypes.bool,
  rounded: PropTypes.bool,
  solid: PropTypes.bool,
  children: PropTypes.any,
  style: PropTypes.any,
  textStyle: PropTypes.any
};

AppButton.defaultProps = {
  color: Theme.colors.primary
};

export default AppButton;
