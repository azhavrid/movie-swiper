import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { REGISTRATION_URL } from '../../api/urls';
import { AppText, PrimaryButton, SecondaryButton, TextButton } from '../../components/common';
import PageSpinner from '../../components/common/PageSpinner';
import ScreenWrapper from '../../components/ScreenWrapper';
import FastImage from '../../shims/FastImage';
import images from '../../images';
import { createGuestSessionRequest } from '../../redux/auth/actions';
import { createGuestSessionPendingSelector } from '../../redux/auth/selectors';
import { RootState } from '../../redux/types';
import { routeNames } from '../../routes/routeNames';
import { theme } from '../../theme';
import { safeOpenURL } from '../../utils/network';

type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type Props = { navigation: any } & ReduxProps;

class AuthWelcome extends React.Component<Props> {
  onLoginPress = () => {
    this.props.navigation.navigate(routeNames.AuthLogin);
  };

  onSignUpPress = () => {
    safeOpenURL(REGISTRATION_URL);
  };

  onGuestLoginPress = () => {
    this.props.createGuestSessionRequest();
  };

  render() {
    const { createGuestSessionPending } = this.props;

    return (
      <ScreenWrapper>
        <ImageBackground source={images.welcomeArray[0]} style={styles.background} resizeMode="cover">
          <View style={styles.dimmer} pointerEvents="none" />
          <View style={styles.container}>
            <View style={styles.topContainer}>
              <FastImage style={styles.appLogo} source={images.appLogo} resizeMode="contain" />
              <AppText style={styles.welcomeText} type="title1">
                Welcome to Movie Swiper
              </AppText>
              <AppText style={styles.welcomeCaption} type="titleCaption">
                Powered by The Movie Database
              </AppText>
            </View>
            <View style={styles.bottomContainer}>
              <TextButton
                text="Continue as Guest"
                style={styles.guestButton}
                color={theme.gray.lighter}
                onPress={this.onGuestLoginPress}
              />
              <PrimaryButton stretch text="Log In" style={styles.button} onPress={this.onLoginPress} />
              <SecondaryButton stretch text="Sign Up" style={styles.button} onPress={this.onSignUpPress} />
            </View>
          </View>
        </ImageBackground>
        <PageSpinner visible={!!createGuestSessionPending} />
      </ScreenWrapper>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  dimmer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  bottomContainer: {
    marginBottom: 35,
  },
  appLogo: {
    height: 72,
    width: 200,
    marginTop: theme.spacing.large * 2,
    marginBottom: theme.spacing.large,
  },
  welcomeText: {
    textAlign: 'center',
    color: theme.gray.lightest,
  },
  welcomeCaption: {
    color: theme.gray.lighter,
    textAlign: 'center',
  },
  guestButton: {
    height: 42,
    alignSelf: 'center',
  },
  button: {
    marginBottom: theme.spacing.tiny,
  },
});

const mapStateToProps = (state: RootState) => ({
  createGuestSessionPending: createGuestSessionPendingSelector(state),
});

const mapDispatchToProps = {
  createGuestSessionRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthWelcome);
