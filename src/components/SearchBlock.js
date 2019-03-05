import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { TextInput, StyleSheet, View, BackHandler } from 'react-native';
import { AppText, TouchableScale } from './common';
import { getFontStyleObject } from '../utils/font';
import {
  getSearchInputBackIcon,
  getSearchInputCloseIcon,
  getSearchInputLabelIcon
} from '../utils/icons';
import Theme from '../Theme';
import Config from '../Config';

class SearchBlock extends React.PureComponent {
  state = {
    focused: false
  };

  componentWillMount() {
    this.timerId = null;
    BackHandler.addEventListener('hardwareBackPress', this.onHardwareBackPress);
  }

  componentDidUpdate(prevProps, prevState) {
    const { focused } = this.state;
    if (focused !== prevState.focused) {
      const { onBlockBlur, onBlockFocus } = this.props;
      const focusFunction = focused ? onBlockFocus : onBlockBlur;
      focusFunction && focusFunction();
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onHardwareBackPress);
    clearTimeout(this.timerId);
  }

  onFocus = () => {
    const { onFocus } = this.props;
    this.setState({ focused: true });
    onFocus && onFocus();
  };

  onBlur = () => {
    const { onBlur } = this.props;
    onBlur && onBlur();
  };

  onSearchTextChange = text => {
    const { onChangeText, onDelayedInput, delayTime } = this.props;
    onChangeText(text);

    if (!onDelayedInput) return;

    clearTimeout(this.timerId);
    if (text.length > 0) {
      this.timerId = setTimeout(() => {
        onDelayedInput();
      }, delayTime);
    }
  };

  onSearchLabelPress = () => {
    this.setState({ focused: true });
    // eslint-disable-next-line
    requestAnimationFrame(() => this.textInput.focus());
  };

  onBackPress = () => {
    this.setState({ focused: false }, () => {
      this.textInput.blur();
      clearTimeout(this.timerId);
      // eslint-disable-next-line
      requestAnimationFrame(() => requestAnimationFrame(() => this.clearInput()));
    });
  };

  onHardwareBackPress = () => {
    const { navigation } = this.props;
    const { focused } = this.state;

    if (navigation.isFocused() && focused) {
      this.onBackPress();
      return true;
    }
  };

  onClearPress = () => {
    this.clearInput();
  };

  onRef = ref => {
    const { inputRef } = this.props;
    this.textInput = ref;
    inputRef && inputRef(ref);
  };

  clearInput = () => {
    this.textInput.clear();
    this.onSearchTextChange('');
  };

  render() {
    const { value, style, ...props } = this.props;
    const { focused } = this.state;
    const showSearchHelpLabel = !focused && value.length === 0;

    return (
      <View style={[styles.container, style]}>
        <View style={styles.inputContainer}>
          <TouchableScale onPress={this.onBackPress} style={styles.touchableInputIcon}>
            {getSearchInputBackIcon({ style: { opacity: showSearchHelpLabel ? 0 : 1 } })}
          </TouchableScale>
          <TextInput
            selectionColor={Theme.colors.textInputSelection}
            autoCorrect={false}
            spellCheck={false}
            style={styles.input}
            value={value}
            ref={this.onRef}
            {...props}
            onFocus={this.onFocus}
            onChangeText={this.onSearchTextChange}
          />
          {value.length > 0 && (
            <TouchableScale onPress={this.onClearPress} style={styles.touchableInputIcon}>
              {getSearchInputCloseIcon()}
            </TouchableScale>
          )}
        </View>

        {showSearchHelpLabel && (
          <TouchableScale
            onPress={this.onSearchLabelPress}
            style={styles.labelTouchable}
            scaleFactor={0.98}
          >
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
    width: '100%'
  },
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 4,
    marginHorizontal: Theme.spacing.small,
    backgroundColor: Theme.gray.lightest
  },
  touchableInputIcon: {
    paddingHorizontal: Theme.spacing.tiny,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    flex: 1,
    color: Theme.gray.darkest,
    paddingVertical: Config.isAndroid ? 0 : 12,
    ...Theme.typography.body,
    ...getFontStyleObject()
  },
  labelTouchable: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center'
  },
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  labelText: {
    color: Theme.gray.darkest,
    ...getFontStyleObject({ weight: 'Bold' })
  }
});

SearchBlock.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onBlockBlur: PropTypes.func,
  onBlockFocus: PropTypes.func,
  inputRef: PropTypes.func,
  delayTime: PropTypes.number,
  onDelayedInput: PropTypes.func
};

SearchBlock.defaultProps = {
  delayTime: 200,

  onDelayedInput: () => {}
};

export default withNavigation(SearchBlock);
