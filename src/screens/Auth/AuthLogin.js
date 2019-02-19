import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView } from 'react-native';
import { loginUsernameChanged, loginPasswordChanged, loginUser } from '../../actions';
import { AppButton, PageSpinner } from '../../components/common';
import AppToast from '../../components/AppToast';
import LoginInput from '../../components/LoginInput';
import { RESET_PASSWORD_URL } from '../../api/urls';
import { safeOpenURL } from '../../utils/network';
import RouteNames from '../../RouteNames';
import Theme from '../../Theme';

class AuthLogin extends React.Component {
  static navigationOptions = () => ({
    title: 'Log In'
  });

  onToastRef = ref => (this.toast = ref);
  onForgotPress = () => safeOpenURL(RESET_PASSWORD_URL);
  onUsernameTextChange = text => this.props.loginUsernameChanged(text);
  onPasswordTextChange = text => this.props.loginPasswordChanged(text);

  onLoginPress = () => {
    const { loginUsername, loginPassword, navigation } = this.props;

    this.props.loginUser({
      username: loginUsername,
      password: loginPassword,
      showToast: this.showToast,
      onSuccess: () => {
        navigation.navigate(RouteNames.HomeStack);
      }
    });
  };

  showToast = message => this.toast.show(message, 2000);

  render() {
    const {
      loginUsername,
      loginUsernameError,
      loginPassword,
      loginPasswordError,
      loginIsLoading
    } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContentContainer}>
          <LoginInput
            label="Username"
            style={styles.input}
            subtext={loginUsernameError}
            error={loginUsernameError.length > 0}
            value={loginUsername}
            onChangeText={this.onUsernameTextChange}
          />
          <LoginInput
            secureTextEntry
            label="Password"
            textContentType="password"
            style={styles.input}
            subtext={loginPasswordError}
            error={loginPasswordError.length > 0}
            value={loginPassword}
            onChangeText={this.onPasswordTextChange}
          />
          <AppButton style={styles.loginButton} onPress={this.onLoginPress}>
            LOG IN
          </AppButton>
          <AppButton
            onlyText
            style={styles.forgotButton}
            color={Theme.gray.lighter}
            onPress={this.onForgotPress}
          >
            Forgot the password?
          </AppButton>
        </ScrollView>

        <AppToast refProp={this.onToastRef} />
        <PageSpinner visible={loginIsLoading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background
  },
  scrollContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Theme.spacing.small
  },
  input: {
    marginTop: Theme.spacing.tiny
  },
  loginButton: {
    alignSelf: 'stretch',
    marginVertical: Theme.spacing.tiny
  },
  forgotButton: {
    paddingVertical: Theme.spacing.tiny,
    paddingHorizontal: Theme.spacing.small
  }
});

const mapStateToProps = ({ auth }) => auth;

export default connect(
  mapStateToProps,
  {
    loginUsernameChanged,
    loginPasswordChanged,
    loginUser
  }
)(AuthLogin);
