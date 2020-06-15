import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { NavigationStackScreenProps } from 'react-navigation-stack/lib/typescript/types';
import { connect } from 'react-redux';

import { REGISTRATION_URL } from '../../api/urls';
import { AppText, PrimaryButton, SecondaryButton, TextButton } from '../../components/common';
import PageSpinner from '../../components/common/PageSpinner';
import { withDelayedLoading } from '../../components/hoc/withDelayedLoading';
import ImageOpacityCycler from '../../components/ImageOpacityCycler';
import ScreenWrapper from '../../components/ScreenWrapper';
import images from '../../images';
import { createGuestSessionRequest } from '../../redux/auth/actions';
import { createGuestSessionPendingSelector } from '../../redux/auth/selectors';
import { RootState } from '../../redux/types';
import { routeNames } from '../../routes/routeNames';
import { theme } from '../../theme';
import { safeOpenURL } from '../../utils/network';

/* ------------- Props and State ------------- */
type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type Props = NavigationStackScreenProps<{}> & ReduxProps;

/* ------------- Component ------------- */
class AuthWelcome extends React.Component<Props> {
  static navigationOptions = {
    header: null,
  };

  onLoginPress = () => {
    this.props.navigation.navigate(routeNames.AuthLogin);
  };

  onSignUpPress = () => {
    safeOpenURL(REGISTRATION_URL);
  };

  onGuestLoginPress = () => {
    const { createGuestSessionRequest } = this.props;
    createGuestSessionRequest();
  };

  render() {
    const { createGuestSessionPending } = this.props;

    return (
      <ScreenWrapper>
        <ImageOpacityCycler style={styles.opacityCircler} images={images.welcomeArray} />
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
        <PageSpinner visible={createGuestSessionPending} />
      </ScreenWrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topContainer: {
    marginTop: 60,
  },
  bottomContainer: {
    marginBottom: 35,
  },
  opacityCircler: {
    ...StyleSheet.absoluteFillObject,
  },
  appLogo: {
    height: 72,
    marginTop: theme.spacing.large * 2,
    marginBottom: theme.spacing.large,
  },
  welcomeText: {
    textAlign: 'center',
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

export default connect(mapStateToProps, mapDispatchToProps)(withDelayedLoading(AuthWelcome));
