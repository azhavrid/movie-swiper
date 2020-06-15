import React from 'react';
import { StyleSheet, View } from 'react-native';

import { theme } from '../theme';
import { AppText, TouchableHighlightView } from './common';
import { TouchableHighlightViewProps } from './common/TouchableHighlightView';

/* ------------- Props and State ------------- */
type OwnProps = {
  Icon?: React.ReactNode;
  subtext?: string;
} & typeof defaultProps;
type Props = OwnProps & TouchableHighlightViewProps;

const defaultProps = {
  text: 'XXXXX',
  color: theme.gray.lightest,
};

/* ------------- Component ------------- */
class BlockButton extends React.PureComponent<Props> {
  static defaultProps = defaultProps;

  render() {
    const { text, subtext, color, Icon, ...props } = this.props;

    return (
      <TouchableHighlightView scaleFactor={0.98} {...props} contentStyle={styles.container}>
        <View style={styles.contentWrapper}>
          {Icon}
          <View style={[styles.textWrapper, Icon && { marginLeft: theme.spacing.small }]}>
            <AppText style={{ color }} type="headline">
              {text}
            </AppText>
            {subtext && (
              <AppText style={styles.subText} type="caption2">
                {subtext}
              </AppText>
            )}
          </View>
        </View>
      </TouchableHighlightView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    height: 72,
  },
  contentWrapper: {
    marginLeft: theme.spacing.base,
    flexDirection: 'row',
  },
  textWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  subText: {
    marginTop: theme.spacing.xTiny,
    color: theme.gray.lighter,
  },
});

export default BlockButton;
