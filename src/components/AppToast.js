import React from 'react';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-easy-toast';
import { getFontStyleObject } from '../utils/font';
import Theme from '../Theme';

class AppToast extends React.Component {
  onRef = ref => {
    const { refProp } = this.props;
    refProp && refProp(ref);
  };

  render() {
    const { textStyle, ...props } = this.props;
    return (
      <Toast
        ref={this.onRef}
        style={styles.toast}
        textStyle={[styles.toastText, textStyle]}
        {...props}
      />
    );
  }
}

const styles = StyleSheet.create({
  toast: {
    bottom: 64,
    maxWidth: '80%',
    borderRadius: 12,
    backgroundColor: Theme.colors.transparentBlack
  },
  toastText: {
    ...getFontStyleObject(),
    ...Theme.typography.body,
    color: Theme.gray.lightest,
    textAlign: 'center',
    paddingHorizontal: Theme.spacing.tiny,
    paddingVertical: Theme.spacing.xTiny
  }
});

export default AppToast;
