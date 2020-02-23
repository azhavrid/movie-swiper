import React from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from 'react-native';

import { globalStyles } from '../globalStyles';
import { getSearchInputBackIcon, getSearchInputCloseIcon, getSearchInputLabelIcon } from '../helpers/icons';
import { theme } from '../theme';
import { getFontStyle } from '../utils/fonts';
import { AppText, TouchableScale } from './common';

/* ------------- Props and State ------------- */
type OwnProps = {
  value: string;
  onChangeText: (text: string) => void;
};

type Props = OwnProps & Pick<TextInputProps, 'onBlur' | 'onFocus'>;

type State = typeof initialState;

const initialState = {
  isFocused: false,
};

/* ------------- Component ------------- */
class SearchInput extends React.PureComponent<Props, State> {
  state = initialState;
  textInputRef = React.createRef<TextInput>();

  blur = () => this.textInputRef?.current?.blur();

  focus = () => this.textInputRef?.current?.focus();

  onFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    const { onFocus } = this.props;
    this.setState({ isFocused: true });
    onFocus && onFocus(event);
  };

  onBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    const { onBlur } = this.props;
    this.setState({ isFocused: false });
    onBlur && onBlur(event);
  };

  onSearchLabelPress = () => {
    this.focus();
  };

  onBackPress = () => {
    this.blur();
    this.clearInput();
  };

  onClosePress = () => {
    this.focus();
    this.clearInput();
  };

  clearInput = () => {
    const { onChangeText } = this.props;
    onChangeText('');
  };

  render() {
    const { value, onChangeText } = this.props;
    const { isFocused } = this.state;
    const isValueEmpty = value.length === 0;
    const showSearchLabel = !isFocused && isValueEmpty;

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TouchableScale onPress={this.onBackPress} style={styles.touchableInputIcon}>
            {getSearchInputBackIcon(!showSearchLabel)}
          </TouchableScale>
          <TextInput
            ref={this.textInputRef}
            value={value}
            onChangeText={onChangeText}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            autoCorrect={false}
            style={styles.input}
            selectionColor={theme.colors.textInputSelection}
          />
          <TouchableScale onPress={this.onClosePress} style={styles.touchableInputIcon}>
            {getSearchInputCloseIcon(!isValueEmpty)}
          </TouchableScale>
        </View>
        {showSearchLabel && (
          <TouchableScale onPress={this.onSearchLabelPress} style={styles.labelTouchable} scaleFactor={0.98}>
            <View style={styles.labelWrapper}>
              {getSearchInputLabelIcon()}
              <AppText style={styles.labelText} type="headline">
                Search for Movies
              </AppText>
            </View>
          </TouchableScale>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: theme.spacing.tiny,
  },
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 4,
    marginHorizontal: theme.spacing.small,
    backgroundColor: theme.gray.lightest,
  },
  touchableInputIcon: {
    paddingHorizontal: theme.spacing.tiny,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    color: theme.gray.darkest,
    ...globalStyles.inputPaddingVertical,
    ...theme.typography.body,
    ...getFontStyle(),
  },
  labelTouchable: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    color: theme.gray.darkest,
    ...getFontStyle({ weight: 'Bold' }),
  },
});

export default SearchInput;
