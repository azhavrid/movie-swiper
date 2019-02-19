import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { AppText, TouchableHighlightView } from './common';
import Theme from '../Theme';

class BlockButton extends React.PureComponent {
  render() {
    const { text, subtext, color, style, Icon, ...props } = this.props;

    return (
      <TouchableHighlightView
        scaleFactor={0.98}
        {...props}
        contentStyle={[styles.container, style]}
      >
        <View style={styles.contentWrapper}>
          {Icon}
          <View style={[styles.textWrapper, Icon && { marginLeft: Theme.spacing.small }]}>
            <AppText style={{ color }} type="headline">
              {text}
            </AppText>
            {subtext && (
              <AppText style={styles.subText} type="caption2">
                {subtext}
              </AppText>
            )}
          </View>
        </View>
      </TouchableHighlightView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    height: 72
  },
  contentWrapper: {
    marginLeft: Theme.spacing.base,
    flexDirection: 'row'
  },
  textWrapper: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  subText: {
    marginTop: Theme.spacing.xTiny,
    color: Theme.gray.lighter
  }
});

BlockButton.propTypes = {
  Icon: PropTypes.element,
  text: PropTypes.string,
  subText: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.any
};

BlockButton.defaultProps = {
  text: 'Default button text',
  color: Theme.gray.lightest
};

export default BlockButton;
