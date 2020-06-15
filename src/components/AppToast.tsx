import React, { RefObject } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { globalStyles } from '../globalStyles';
import { theme } from '../theme';
import { AppText } from './common';

/* ------------- Container Class ------------- */
class AppToast extends React.Component {
  static ref: RefObject<AppToastView> = React.createRef();

  static show = (message: string) => {
    AppToast.ref?.current?.show(message);
  };

  static close = () => {
    AppToast.ref?.current?.close();
  };

  render() {
    return <AppToastView ref={AppToast.ref} />;
  }
}

/* ------------- Props and State ------------- */
type State = typeof initialState;

const initialState = {
  message: '',
  isVisible: false,
  isClosing: false,
};

/* ------------- Component ------------- */
const displayTime = 2000;
class AppToastView extends React.Component<{}, State> {
  state = initialState;
  animatedValue = new Animated.Value(0);
  timerId?: NodeJS.Timeout;

  show(message: string) {
    this.animatedValue.stopAnimation(() => {
      this.setState({ isVisible: true, message });
      this.clearTimer();

      Animated.timing(this.animatedValue, {
        duration: 200,
        toValue: 1,
        useNativeDriver: true,
      }).start(() => {
        this.timerId = setTimeout(() => {
          this.close();
        }, displayTime);
      });
    });
  }

  close() {
    this.clearTimer();
    Animated.timing(this.animatedValue, {
      duration: 1000,
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ isVisible: false });
    });
  }

  clearTimer = () => this.timerId && clearTimeout(this.timerId);

  getAnimatedStyle = (): any => {
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    const translateY = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [10, 0],
    });

    return { transform: [{ translateY }], opacity };
  };

  render() {
    const { isVisible, message } = this.state;
    return isVisible ? (
      <Animated.View pointerEvents="none" style={[styles.container, this.getAnimatedStyle()]}>
        <View style={styles.toast}>
          <AppText type="body" style={styles.toastText}>
            {message}
          </AppText>
        </View>
      </Animated.View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    width: '80%',
    bottom: 80,
  },
  toast: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.spacing.small,
    backgroundColor: 'black',
    opacity: 0.8,
    ...globalStyles.defaultShadow,
  },
  toastText: {
    textAlign: 'center',
    marginHorizontal: theme.spacing.base,
    marginVertical: theme.spacing.base,
  },
});

export default AppToast;
