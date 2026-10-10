import { isNil } from 'lodash';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { getHeaderBackIcon } from '../helpers/icons';
import { theme } from '../theme';
import { AppText, TouchableScale } from './common';
import { withNavigation, NavigationInjectedProps } from '../shims/withNavigation';

type OwnProps = {
  options?: { title?: string; headerRight?: React.ReactNode };
  backgroundStyle?: ViewStyle;
  title?: string;
};
type Props = OwnProps & NavigationInjectedProps;

export class Header extends React.PureComponent<Props> {
  onBackPress = () => this.props.navigation.goBack();

  render() {
    const { navigation, backgroundStyle, options = {}, title: titleProp } = this.props;
    const { title, headerRight } = options;
    const canGoBack = navigation.canGoBack?.() ?? false;

    return (
      <View style={styles.container}>
        <View style={[styles.background, backgroundStyle]} />
        <View style={styles.headerWrapper}>
          <View style={styles.leftContainer}>
            {canGoBack && (
              <TouchableScale activeOpacity={0.7} onPress={this.onBackPress}>
                {getHeaderBackIcon()}
              </TouchableScale>
            )}
          </View>
          <View style={styles.titleContainer}>
            <AppText numberOfLines={1} type="header">
              {!isNil(titleProp) ? titleProp : !isNil(title) ? title : ''}
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
