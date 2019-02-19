import React from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import { StyleSheet } from 'react-native';

const LABELS = {
  like: { src: require('../../assets/img/swipe_labels/LIKE.png'), ratio: 2.28 },
  save: { src: require('../../assets/img/swipe_labels/SAVE.png'), ratio: 2.5 },
  skip: { src: require('../../assets/img/swipe_labels/SKIP.png'), ratio: 2.28 }
};

class MovieSwipeImageLabel extends React.PureComponent {
  render() {
    const { type, style } = this.props;
    const label = LABELS[type];

    return (
      <FastImage
        resizeMode="contain"
        style={[styles.container, { aspectRatio: label.ratio }, style]}
        source={label.src}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 60
  }
});

MovieSwipeImageLabel.propTypes = {
  type: PropTypes.string,
  style: PropTypes.any
};

export default MovieSwipeImageLabel;
