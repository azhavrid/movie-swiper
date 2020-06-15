import React from 'react';
import { ActivityIndicator, Modal, ModalProps, StyleSheet, View } from 'react-native';

import { theme } from '../../theme';
import { FixDefaults } from '../../types';

/* ------------- Props and State ------------- */
type Props = {
  visible: boolean;
} & typeof defaultProps;

const defaultProps = {
  onRequestClose: (() => {}) as ModalProps['onRequestClose'],
};

/* ------------- Component ------------- */
const PageSpinner: FixDefaults<React.FC<Props>, typeof defaultProps> = ({ onRequestClose, visible }) => (
  <Modal transparent={true} onRequestClose={onRequestClose} visible={visible}>
    <View style={styles.container}>
      <ActivityIndicator size={theme.specifications.activityIndicatorSize} color={theme.gray.lightest} />
    </View>
  </Modal>
);

PageSpinner.defaultProps = defaultProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PageSpinner;
