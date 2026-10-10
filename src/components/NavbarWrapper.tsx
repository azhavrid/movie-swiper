import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomTabBar, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';

import { isInternetReachableSelector } from '../redux/network/selectors';
import { RootState } from '../redux/types';
import { theme } from '../theme';
import { AppText } from './common';

const INFO_BAR_HEIGHT = 22;

type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type Props = ReduxProps & BottomTabBarProps;

const NavbarWrapper = (props: Props) => {
  const { isInternetReachable, ...tabBarProps } = props;

  return (
    <View>
      {!isInternetReachable && (
        <View style={styles.noConnectionContainer}>
          <AppText style={styles.noConnectionText} type="caption2">
            No Connection
          </AppText>
        </View>
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
    zIndex: 1,
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
