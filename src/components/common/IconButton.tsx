import React from 'react';
import { StyleSheet } from 'react-native';

import { theme } from '../../theme';
import AppText from './AppText';
import TouchableHighlightView, { TouchableHighlightViewProps } from './TouchableHighlightView';

/* ------------- Props and State ------------- */
type OwnProps = {
  Icon: React.ReactNode;
  text: string;
};
type Props = OwnProps & TouchableHighlightViewProps;

/* ------------- Component ------------- */
const IconButton: React.FC<Props> = ({ text, Icon, ...props }) => (
  <TouchableHighlightView {...props} contentStyle={styles.touchable}>
    {Icon}
    {text && (
      <AppText style={styles.text} type="caption2">
        {text}
      </AppText>
    )}
  </TouchableHighlightView>
);

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: theme.spacing.xTiny,
  },
});

export default React.memo(IconButton);
