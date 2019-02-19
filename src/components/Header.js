import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { View, StyleSheet, Animated } from 'react-native';
import { AppText, TouchableScale } from './common';
import { getHeaderBackIcon } from '../utils/icons';
import Theme from '../Theme';

class Header extends React.PureComponent {
  render() {
    const { scene, navigation, backgroundStyle } = this.props;
    // Get properties from static object navigationOptions
    const navigationOptions = scene ? scene.descriptor.options : {};
    const { title, headerLeft, headerRight } = navigationOptions;
    const routeName = navigation ? navigation.state.routeName : '';
    const routeIndex = scene ? scene.index : 0;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.background, backgroundStyle]} />
        <View style={styles.headerWrapper}>
          <View style={styles.leftContainer}>
            {headerLeft
              ? headerLeft()
              : routeIndex > 0 && (
                  <TouchableScale
                    activeOpacity={0.7}
                    onPress={() => {
                      navigation.goBack();
                    }}
                  >
                    {getHeaderBackIcon()}
                  </TouchableScale>
                )}
          </View>
          <View style={styles.titleContainer}>
            <AppText numberOfLines={1} type="header">
              {title || routeName}
            </AppText>
          </View>
          <View style={styles.rightContainer}>{headerRight && headerRight()}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Theme.specifications.headerHeight + Theme.specifications.statusBarHeight
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Theme.colors.header
  },
  headerWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Theme.specifications.statusBarHeight
  },
  leftContainer: {
    flex: 1,
    marginLeft: Theme.spacing.tiny,
    overflow: 'hidden',
    flexDirection: 'row'
  },
  titleContainer: {
    flex: 0,
    maxWidth: '60%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightContainer: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row-reverse'
  }
});

Header.propTypes = {
  scene: PropTypes.object.isRequired,
  backgroundStyle: PropTypes.any
};

export default withNavigation(Header);
