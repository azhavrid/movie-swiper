import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView } from 'react-native';

import { PageSpinner, PrimaryButton, TextButton } from '../../components/common';
import LoginInput from '../../components/LoginInput';
import { createAuthenticatedSessionRequest } from '../../redux/auth/actions';
import { RootState } from '../../redux/types';
import { RESET_PASSWORD_URL } from '../../api/urls';
import { safeOpenURL } from '../../utils/network';
import { theme } from '../../theme';
import { validateUsername, validatePassword } from '../../utils/validators';
import {
  createAuthenticatedSessionPendingSelector,
  createAuthenticatedSessionErrorSelector,
  userSelector,
} from '../../redux/auth/selectors';
import { NavigationStackScreenProps } from 'react-navigation-stack/lib/typescript/types';
import ScreenWrapper from '../../components/ScreenWrapper';

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

/* ------------- Class ------------- */
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
          <PrimaryButton stretch text="LOG IN" style={styles.loginButton} onPress={this.onLoginPress} />
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
