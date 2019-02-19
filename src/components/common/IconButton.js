import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import AppText from './AppText';
import TouchableHighlightView from './TouchableHighlightView';
import Theme from '../../Theme';

class IconButton extends React.PureComponent {
  render() {
    const { text, Icon, textStyle, ...props } = this.props;

    return (
      <TouchableHighlightView {...props} contentStyle={styles.touchable}>
        {Icon}
        {text && (
          <AppText style={[styles.text, textStyle]} type="caption2">
            {text}
          </AppText>
        )}
      </TouchableHighlightView>
    );
  }
}

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    marginTop: Theme.spacing.xTiny
  }
});

IconButton.propTypes = {
  Icon: PropTypes.element.isRequired,
  text: PropTypes.string,
  textStyle: PropTypes.any
};

export default IconButton;
