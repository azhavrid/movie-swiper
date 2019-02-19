import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Animated } from 'react-native';
import Header from './Header';
import InnerShadow from './InnerShadow';
import { StatusBarSpacer } from './common';
import Theme from '../Theme';

class OpacityHeader extends React.PureComponent {
  render() {
    const { scene, opacity, ...props } = this.props;
    const animatedOpacity = typeof opacity === 'number' ? new Animated.Value(opacity) : opacity;

    return (
      <View>
        <StatusBarSpacer />
        <View style={styles.headerContainer}>
          <InnerShadow top style={styles.innerShadow} size={Theme.specifications.headerHeight} />
          <Header scene={scene} backgroundStyle={{ opacity: animatedOpacity }} {...props} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    width: '100%',
    top: 0
  },
  innerShadow: {
    marginTop: Theme.specifications.statusBarHeight
  }
});

OpacityHeader.propTypes = {
  opacity: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
};

OpacityHeader.defaultProps = {
  opacity: 0
};

export default OpacityHeader;
