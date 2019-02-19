import React from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import { View, StyleSheet } from 'react-native';
import AppText from './common/AppText';
import Theme from '../Theme';

class InfoAbsoluteBlock extends React.PureComponent {
  render() {
    const { Icon, imageSource, text, subtext } = this.props;

    return (
      <View style={styles.container}>
        {Icon || <FastImage source={imageSource} style={styles.image} resizeMode="contain" />}
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
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: 140,
    width: '100%'
  },
  text: {
    marginTop: Theme.spacing.small
  },
  subtext: {
    marginTop: Theme.spacing.xTiny,
    color: Theme.gray.lighter
  }
});

InfoAbsoluteBlock.propTypes = {
  Icon: PropTypes.element,
  imageSource: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  text: PropTypes.string,
  subtext: PropTypes.string
};

export default InfoAbsoluteBlock;
