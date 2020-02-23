import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { BottomTabBar } from 'react-navigation-tabs';
import { connect } from 'react-redux';

import { isInternetReachableSelector } from '../redux/network/selectors';
import { RootState } from '../redux/types';
import { theme } from '../theme';
import { AppText } from './common';

const INFO_BAR_HEIGHT = 22;

/* ------------- Props and State ------------- */
// BottomTabBarProps is not yet in react-navigation-tabs
type BottomTabBarProps = any;
type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type Props = ReduxProps & BottomTabBarProps;

/* ------------- Component ------------- */
const NavbarWrapper = (props: Props) => {
  const { isInternetReachable, ...tabBarProps } = props;

  return (
    <View>
      {!isInternetReachable && (
        <Animated.View style={styles.noConnectionContainer}>
          <AppText style={styles.noConnectionText} type="caption2">
            No Connection
          </AppText>
        </Animated.View>
      )}
      <BottomTabBar {...tabBarProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  noConnectionContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: INFO_BAR_HEIGHT,
    width: '100%',
    backgroundColor: theme.colors.warning,
    top: -20,
  },
  noConnectionText: {
    color: theme.gray.darkest,
  },
});

const mapStateToProps = (state: RootState) => ({
  isInternetReachable: isInternetReachableSelector(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(NavbarWrapper));
