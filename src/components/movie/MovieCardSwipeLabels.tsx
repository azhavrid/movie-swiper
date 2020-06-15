import React from 'react';
import { StyleSheet, View } from 'react-native';

import { socialActionMap } from '../../redux/explore/exploreData';
import { SwipeThresholds } from '../Deck';
import SwipeLabel from './SwipeLabel';

/* ------------- Props and State ------------- */
type Props = {
  swipeThresholds: SwipeThresholds;
};

/* ------------- Component ------------- */
class MovieCardSwipeLabels extends React.PureComponent<Props> {
  render() {
    const { swipeThresholds } = this.props;
    const { toRight, toLeft, toTop } = swipeThresholds;

    return (
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <SwipeLabel style={styles.toLeft} opacity={toLeft} type={socialActionMap.left} />
        <SwipeLabel style={styles.toRight} opacity={toRight} type={socialActionMap.right} />
        <SwipeLabel style={styles.toTop} opacity={toTop} type={socialActionMap.top} />
      </View>
    );
  }
}

const horizontalMargin = 30;
const verticalMargin = 70;
const rotationDegrees = 15;

const styles = StyleSheet.create({
  toLeft: {
    top: verticalMargin,
    right: horizontalMargin,
    transform: [{ rotate: `${rotationDegrees}deg` }],
  },
  toRight: {
    top: verticalMargin,
    left: horizontalMargin,
    transform: [{ rotate: `-${rotationDegrees}deg` }],
  },
  toTop: {
    alignSelf: 'center',
    bottom: verticalMargin * 1.5,
  },
});

export default MovieCardSwipeLabels;
