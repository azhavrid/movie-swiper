import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import Header, { HeaderProps } from './Header';
import InnerShadow from './InnerShadow';
import { StatusBarSpacer } from './common';
import { theme } from '../theme';

/* ------------- Props and State ------------- */
type Props = HeaderProps & typeof defaultProps;

const defaultProps = {
  opacity: 0 as number,
};

/* ------------- Class ------------- */
class OpacityHeader extends React.PureComponent<Props> {
  static defaultProps = defaultProps;

  render() {
    const { opacity, ...props } = this.props;

    return (
      <View>
        <StatusBarSpacer />
        <View style={styles.headerContainer}>
          <InnerShadow position="top" style={styles.innerShadow} size={theme.specifications.headerHeight} />
          <Header backgroundStyle={{ opacity }} {...props} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    width: '100%',
    top: 0,
  },
  innerShadow: {
    marginTop: theme.specifications.statusBarHeight,
  },
});

export default OpacityHeader;
