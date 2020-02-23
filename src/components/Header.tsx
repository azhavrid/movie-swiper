import { isNil } from 'lodash';
import React from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { Scene } from 'react-navigation-stack/lib/typescript/types';

import { getHeaderBackIcon } from '../helpers/icons';
import { theme } from '../theme';
import { AppText, TouchableScale } from './common';

/* ------------- Props and State ------------- */
type OwnProps = {
  scene: Scene;
  backgroundStyle?: ViewStyle;
};
type Props = OwnProps & NavigationInjectedProps;
export type HeaderProps = OwnProps;

/* ------------- Component ------------- */
export class Header extends React.PureComponent<Props> {
  onBackPress = () => this.props.navigation.goBack();

  render() {
    const { scene, navigation, backgroundStyle } = this.props;
    // Get properties from static object navigationOptions
    const navigationOptions = scene ? scene.descriptor.options : {};
    const { title, headerRight } = navigationOptions;
    const routeName = navigation ? navigation.state.routeName : '';
    const routeIndex = scene ? scene.index : 0;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.background, backgroundStyle]} />
        <View style={styles.headerWrapper}>
          <View style={styles.leftContainer}>
            {routeIndex > 0 && (
              <TouchableScale activeOpacity={0.7} onPress={this.onBackPress}>
                {getHeaderBackIcon()}
              </TouchableScale>
            )}
          </View>
          <View style={styles.titleContainer}>
            <AppText numberOfLines={1} type="header">
              {!isNil(title) ? title : routeName}
            </AppText>
          </View>
          <View style={styles.rightContainer}>{!!headerRight && headerRight}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: theme.specifications.fullHeaderHeight,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.header,
  },
  headerWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.specifications.statusBarHeight,
  },
  leftContainer: {
    flex: 1,
    marginLeft: theme.spacing.tiny,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  titleContainer: {
    flex: 0,
    maxWidth: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row-reverse',
  },
});

export default withNavigation(Header);
