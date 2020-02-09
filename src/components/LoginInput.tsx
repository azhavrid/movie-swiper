import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native';
import AppText from './common/AppText';
import { getFontStyle } from '../utils/fonts';
import { theme } from '../theme';
import { config } from '../configs/config';
import { globalStyles } from '../globalStyles';

/* ------------- Props and State ------------- */
type OwnProps = {
  label: string;
  errorText?: string;
};
type Props = OwnProps & TextInputProps;

type State = typeof initialState;

const initialState = {
  focused: false,
};

/* ------------- Class ------------- */
class LoginInput extends React.PureComponent<Props, State> {
  state = initialState;

  onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    const { onFocus } = this.props;
    this.setState({ focused: true });
    onFocus && onFocus(e);
  };

  onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    const { onBlur } = this.props;
    this.setState({ focused: false });
    onBlur && onBlur(e);
  };

  render() {
    const { label, errorText, ...props } = this.props;
    const { focused } = this.state;
    const isError = errorText?.length > 0;

    const inputContainerStyle = [
      styles.inputContainer,
      focused && styles.inputContainerFocused,
      isError && styles.inputContainerError,
    ];

    return (
      <View style={styles.container}>
        {label && <AppText style={styles.label}>{label}</AppText>}
        <View style={inputContainerStyle}>
          <TextInput
            selectionColor={theme.colors.textInputSelection}
            autoCorrect={false}
            autoCapitalize="none"
            {...props}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            style={styles.input}
          />
        </View>
        <AppText numberOfLines={2} style={styles.subtext} type="caption1">
          {errorText}
        </AppText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginVertical: theme.spacing.tiny,
  },
  label: {
    ...getFontStyle({ weight: 'Bold' }),
    marginBottom: theme.spacing.tiny,
  },
  inputContainer: {
    borderRadius: 4,
    backgroundColor: 'rgba(250,250,250,0.5)',
  },
  inputContainerFocused: {
    backgroundColor: 'rgba(250,250,250,0.65)',
  },
  inputContainerError: {
    borderWidth: 1,
    borderColor: theme.colors.danger,
  },
  input: {
    color: theme.gray.lightest,
    marginHorizontal: theme.spacing.tiny,
    ...globalStyles.inputPaddingVertical,
    ...theme.typography.input,
    ...getFontStyle(),
  },
  subtext: {
    margin: theme.spacing.xTiny,
  },
});

export default LoginInput;
