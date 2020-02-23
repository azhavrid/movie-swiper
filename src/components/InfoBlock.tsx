import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage, { FastImageProperties } from 'react-native-fast-image';

import { theme } from '../theme';
import AppText from './common/AppText';

/* ------------- Props and State ------------- */
type Props = {
  imageSource?: FastImageProperties['source'];
  renderIcon?: () => JSX.Element;
  text?: string;
  subtext?: string;
};

/* ------------- Component ------------- */
class InfoBlock extends React.PureComponent<Props> {
  render() {
    const { renderIcon, imageSource, text, subtext } = this.props;

    return (
      <View style={styles.container}>
        {renderIcon
          ? renderIcon()
          : imageSource && <FastImage source={imageSource} style={styles.image} resizeMode="contain" />}
        {text && (
          <AppText type="title3" style={styles.text}>
            {text}
          </AppText>
        )}
        {subtext && (
          <AppText type="caption1" style={styles.subtext}>
            {subtext}
          </AppText>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Required for component to take touch event on whole area
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 140,
    width: '100%',
  },
  text: {
    marginTop: theme.spacing.small,
  },
  subtext: {
    marginTop: theme.spacing.xTiny,
    color: theme.gray.lighter,
  },
});

export default InfoBlock;
