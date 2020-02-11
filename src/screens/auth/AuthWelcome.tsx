import React from 'react';
import { View, StyleSheet } from 'react-native';

import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';

import PageSpinner from '../../components/common/PageSpinner';
import ImageOpacityCycler from '../../components/ImageOpacityCycler';
import { AppText, TextButton, PrimaryButton, SecondaryButton } from '../../components/common';
import { withDelayedLoading } from '../../components/hoc/withDelayedLoading';
import { createGuestSessionRequest } from '../../redux/auth/actions';
import { RootState } from '../../redux/types';
import { safeOpenURL } from '../../utils/network';
import { REGISTRATION_URL } from '../../api/urls';
import { routeNames } from '../../routes/routeNames';
import { theme } from '../../theme';
import images from '../../images';
import { createGuestSessionPendingSelector } from '../../redux/auth/selectors';
import { globalStyles } from '../../globalStyles';
import { NavigationStackScreenProps } from 'react-navigation-stack/lib/typescript/types';

/* ------------- Props and State ------------- */
type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type Props = NavigationStackScreenProps<{}> & ReduxProps;

/* ------------- Class ------------- */
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
      <View style={globalStyles.screenContainer}>
        <ImageOpacityCycler style={styles.opacityCircler} images={images.welcomeArray} />
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <FastImage style={styles.tmdbLogo} source={images.tmdbLogo} resizeMode="contain" />
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
      </View>
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
  tmdbLogo: {
    width: undefined,
    height: 100,
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
