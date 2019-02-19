import React from 'react';
import { BottomTabBar } from 'react-navigation';
import { NetworkConsumer } from 'react-native-offline';
import { View, StyleSheet, Animated } from 'react-native';
import { AppText } from './common';
import Theme from '../Theme';

const INFO_BAR_HEIGHT = 22;

class NavbarWrapper extends React.Component {
  state = {
    connectionAnimatedValue: new Animated.Value(1)
  };

  componentDidMount() {
    this.isConnected = true;
  }

  onNetworkChange = ({ isConnected }) => {
    if (this.isConnected !== isConnected) {
      this.isConnected = isConnected;
      this.animateNoConnectionBar();
    }
  };

  getAnimatedStyle() {
    const { connectionAnimatedValue } = this.state;
    const top = connectionAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-INFO_BAR_HEIGHT, 1]
    });

    return { top };
  }

  animateNoConnectionBar() {
    const { connectionAnimatedValue } = this.state;

    Animated.timing(connectionAnimatedValue, {
      toValue: +this.isConnected,
      duration: 300
    }).start();
  }

  render() {
    return (
      <View>
        <Animated.View style={[styles.noConnectionContainer, this.getAnimatedStyle()]}>
          <AppText style={styles.noConnectionText} type="caption2">
            No Connection
          </AppText>
        </Animated.View>
        <BottomTabBar {...this.props} />
        <NetworkConsumer>{this.onNetworkChange}</NetworkConsumer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  noConnectionContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: INFO_BAR_HEIGHT,
    width: '100%',
    backgroundColor: Theme.colors.warning
  },
  noConnectionText: {
    color: Theme.gray.darkest
  }
});

export default NavbarWrapper;
