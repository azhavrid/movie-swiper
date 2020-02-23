import React from 'react';
import { ActivityIndicator, Modal, ModalProps, StyleSheet, View } from 'react-native';

import { theme } from '../../theme';

/* ------------- Props and State ------------- */
type Props = {
  visible: boolean;
} & typeof defaultProps;

const defaultProps = {
  onRequestClose: (() => {}) as ModalProps['onRequestClose'],
};

/* ------------- Class ------------- */
class PageSpinner extends React.Component<Props> {
  static defaultProps = defaultProps;

  render() {
    const { onRequestClose, visible } = this.props;
    return (
      <Modal transparent={true} onRequestClose={onRequestClose} visible={visible}>
        <View style={styles.container}>
          <ActivityIndicator size={theme.specifications.activityIndicatorSize} color={theme.gray.lightest} />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PageSpinner;
