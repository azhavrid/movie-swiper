import React from 'react';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import FastImage from 'react-native-fast-image';
import { View, StyleSheet } from 'react-native';
import AppToast from '../../components/AppToast';
import PageSpinner from '../../components/common/PageSpinner';
import ImageOpacityCycler from '../../components/ImageOpacityCycler';
import { AppButton, AppText } from '../../components/common';
import withDelayedLoading from '../../components/hoc/withDelayedLoading';
import { clearLoginFields, createGuestSession } from '../../actions';
import { safeOpenURL } from '../../utils/network';
import { REGISTRATION_URL } from '../../api/urls';
import RouteNames from '../../RouteNames';
import Theme from '../../Theme';

const WELCOME_IMAGES = [
  require('../../assets/img/welcome_background_images/jurassic_world.jpg'),
  require('../../assets/img/welcome_background_images/spider_man.jpg'),
  require('../../assets/img/welcome_background_images/shutter_island.jpg'),
  require('../../assets/img/welcome_background_images/bumblebee.jpg'),
  require('../../assets/img/welcome_background_images/the_godfather.jpg'),
  require('../../assets/img/welcome_background_images/the_sixth_sense.jpg')
];

class AuthWelcome extends React.Component {
  static navigationOptions = {
    header: null
  };

  onToastRef = ref => (this.toast = ref);
  onLoginPress = () => this.props.navigation.navigate(RouteNames.AuthLogin);
  onSignUpPress = () => safeOpenURL(REGISTRATION_URL);
  onScreenFocused = () => this.props.clearLoginFields();

  onGuestLoginPress = () => {
    const { createGuestSession, navigation } = this.props;

    createGuestSession({
      showToast: this.showToast,
      onSuccess: () => navigation.navigate(RouteNames.HomeStack)
    });
  };

  showToast = message => this.toast.show(message, 2000);

  render() {
    const { isGuestSessionCreating } = this.props;

    return (
      <View style={styles.container}>
        <ImageOpacityCycler style={StyleSheet.absoluteFill} images={WELCOME_IMAGES} />

        <View style={styles.content}>
          <View>
            <FastImage
              style={styles.tmdbLogo}
              source={require('../../assets/img/tmdb.png')}
              resizeMode="contain"
            />
            <AppText style={styles.welcomeText} type="title1">
              Welcome to MovieSwiper
            </AppText>
            <AppText style={styles.welcomeCaption} type="titleCaption">
              Powered by The Movie Database
            </AppText>
          </View>

          <AppButton
            onlyText
            style={styles.guestButton}
            color={Theme.gray.lighter}
            onPress={this.onGuestLoginPress}
          >
            Continue as Guest
          </AppButton>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            solid
            toScale={false}
            style={styles.button}
            textStyle={styles.buttonText}
            color={Theme.colors.success}
            onPress={this.onLoginPress}
          >
            Log In
          </AppButton>
          <AppButton
            solid
            toScale={false}
            style={styles.button}
            textStyle={styles.buttonText}
            color={Theme.colors.info}
            onPress={this.onSignUpPress}
          >
            Sign Up
          </AppButton>
        </View>

        <AppToast refProp={this.onToastRef} />
        <PageSpinner visible={isGuestSessionCreating} />
        <NavigationEvents onDidFocus={this.onScreenFocused} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background
  },
  content: {
    flex: 7,
    justifyContent: 'space-between'
  },
  tmdbLogo: {
    width: null,
    height: 100,
    marginTop: Theme.spacing.large * 2,
    marginBottom: Theme.spacing.large
  },
  welcomeText: {
    textAlign: 'center'
  },
  welcomeCaption: {
    color: Theme.gray.lighter,
    textAlign: 'center'
  },
  guestButton: {
    height: 48,
    alignSelf: 'center',
    paddingHorizontal: Theme.spacing.base
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#000000'
  },
  button: {
    flex: 1
  },
  buttonText: {
    fontSize: 26
  }
});

const mapStateToProps = ({ auth }) => {
  const { isGuestSessionCreating } = auth;
  return { isGuestSessionCreating };
};

export default connect(
  mapStateToProps,
  { createGuestSession, clearLoginFields }
)(withDelayedLoading(AuthWelcome));
