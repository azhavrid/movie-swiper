import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack/lib/typescript/types';
import { connect } from 'react-redux';

import { RESET_PASSWORD_URL } from '../../api/urls';
import { PageSpinner, PrimaryButton, TextButton } from '../../components/common';
import LoginInput from '../../components/LoginInput';
import ScreenWrapper from '../../components/ScreenWrapper';
import { createAuthenticatedSessionRequest } from '../../redux/auth/actions';
import {
  createAuthenticatedSessionErrorSelector,
  createAuthenticatedSessionPendingSelector,
  userSelector,
} from '../../redux/auth/selectors';
import { RootState } from '../../redux/types';
import { theme } from '../../theme';
import { safeOpenURL } from '../../utils/network';
import { validatePassword, validateUsername } from '../../utils/validators';

/* ------------- Props and State ------------- */
type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type Props = NavigationStackScreenProps & ReduxProps;
type State = typeof initialState;

const initialState = {
  username: '',
  usernameValidationError: '',
  password: '',
  passwordValidationError: '',
};

/* ------------- Component ------------- */
class AuthLogin extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Log In',
  };

  state = initialState;

  onForgotPress = () => {
    safeOpenURL(RESET_PASSWORD_URL);
  };

  onUsernameTextChange = (text: string) => {
    this.setState({ username: text, usernameValidationError: '' });
  };

  onPasswordTextChange = (text: string) => {
    this.setState({ password: text, passwordValidationError: '' });
  };

  validateInput = () => {
    const { username, password } = this.state;
    const validateUsernameResponse = validateUsername(username);
    const validatePasswordResponse = validatePassword(password);
    if (validateUsernameResponse.isValid && validatePasswordResponse.isValid) {
      return true;
    }

    this.setState({
      usernameValidationError: validateUsernameResponse.errorMessage,
      passwordValidationError: validatePasswordResponse.errorMessage,
    });

    return false;
  };

  onLoginPress = () => {
    if (this.validateInput()) {
      const { username, password } = this.state;
      const { createAuthenticatedSessionRequest } = this.props;
      createAuthenticatedSessionRequest({ username, password });
    }
  };

  render() {
    const { username, password } = this.state;
    const { createAuthenticatedSessionPending, createAuthenticatedSessionError } = this.props;
    return (
      <ScreenWrapper>
        <ScrollView contentContainerStyle={styles.scrollContentContainer}>
          <LoginInput
            label="Username"
            style={styles.usernameInput}
            value={username}
            errorText={createAuthenticatedSessionError && ' '}
            onChangeText={this.onUsernameTextChange}
          />
          <LoginInput
            label="Password"
            textContentType="password"
            secureTextEntry={true}
            value={password}
            errorText={createAuthenticatedSessionError?.message}
            onChangeText={this.onPasswordTextChange}
          />
          <PrimaryButton stretch text="Log In" style={styles.loginButton} onPress={this.onLoginPress} />
          <TextButton
            text="Forgot the password?"
            style={styles.forgotButton}
            color={theme.gray.lighter}
            onPress={this.onForgotPress}
          />
        </ScrollView>

        <PageSpinner visible={createAuthenticatedSessionPending} />
      </ScreenWrapper>
    );
  }
}

const styles = StyleSheet.create({
  scrollContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  usernameInput: {
    marginTop: theme.spacing.small,
  },
  loginButton: {
    marginVertical: theme.spacing.tiny,
  },
  forgotButton: {
    paddingVertical: theme.spacing.tiny,
    paddingHorizontal: theme.spacing.small,
  },
});

const mapStateToProps = (state: RootState) => ({
  user: userSelector(state),
  createAuthenticatedSessionPending: createAuthenticatedSessionPendingSelector(state),
  createAuthenticatedSessionError: createAuthenticatedSessionErrorSelector(state),
});

const mapDispatchToProps = {
  createAuthenticatedSessionRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLogin);
