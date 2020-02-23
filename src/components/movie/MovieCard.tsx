import React from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';

import { getMovieSelectorById } from '../../redux/movies/selectors';
import { MovieId } from '../../redux/movies/types';
import { RootState } from '../../redux/types';
import { theme } from '../../theme';
import { AppText } from '../common';
import { SwipeThresholds } from '../Deck';
import InnerShadow from '../InnerShadow';
import MovieCardPosterImage from './MovieCardPosterImage';
import MovieScoreYear from './MovieScoreYear';

/* ------------- Props and State ------------- */
type ReduxProps = ReturnType<ReturnType<typeof makeMapStateToProps>> & typeof mapDispatchToProps;
type OwnProps = {
  movieId: MovieId;
  swipeThresholds?: SwipeThresholds;
};
type Props = OwnProps & ReduxProps;
type State = typeof initialState;

const initialState = {
  isExpanded: false,
};

/* ------------- Component ------------- */
class MovieCard extends React.PureComponent<Props, State> {
  state = initialState;
  isAnimating = false;
  detailsVisibilityAnimatedValue = new Animated.Value(0);

  onCardPress = () => {
    if (this.isAnimating) return;
    const { isExpanded } = this.state;

    this.isAnimating = true;
    isExpanded ? this.hideDetails() : this.showDetails();
  };

  showDetails = () => {
    const { isExpanded } = this.state;
    this.setState({ isExpanded: !isExpanded });
    Animated.timing(this.detailsVisibilityAnimatedValue, {
      toValue: 1,
      duration: 100,
    }).start(() => {
      this.isAnimating = false;
    });
  };

  hideDetails = () => {
    const { isExpanded } = this.state;
    Animated.timing(this.detailsVisibilityAnimatedValue, {
      toValue: 0,
      duration: 100,
    }).start(() => {
      this.setState({ isExpanded: !isExpanded }, () => {
        this.isAnimating = false;
      });
    });
  };

  getDetailsDimmerAnimatedStyle = () => {
    const opacity = this.detailsVisibilityAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.8],
    });

    return { opacity };
  };

  renderMovieDetails = () => {
    const { movie } = this.props;
    const { title, overview, vote_average, year } = movie;

    return (
      <Animated.View style={[styles.detailsContainer, { opacity: this.detailsVisibilityAnimatedValue }]}>
        <Animated.View style={[styles.detailsDimmer, this.getDetailsDimmerAnimatedStyle()]} />
        <View style={styles.detailsContentContainer}>
          <AppText numberOfLines={2} type="largeTitle">
            {title}
          </AppText>
          <MovieScoreYear score={vote_average} year={year} style={styles.movieScore} />
          <AppText numberOfLines={12} type="body">
            {overview}
          </AppText>
        </View>
      </Animated.View>
    );
  };

  renderSwipeDimmer = () => {
    const { swipeThresholds } = this.props;
    const maxThreshold = Animated.add(
      Animated.add(swipeThresholds.toLeft, swipeThresholds.toRight),
      swipeThresholds.toTop,
    );
    const opacity = Animated.diffClamp(Animated.divide(maxThreshold, 3), 0, 0.4);
    return <Animated.View style={[styles.swipeDimmer, { opacity }]} />;
  };

  render() {
    const { movie, swipeThresholds } = this.props;
    const { isExpanded } = this.state;
    const { poster_path } = movie;

    return (
      <TouchableWithoutFeedback onPress={this.onCardPress}>
        <View style={styles.container}>
          <MovieCardPosterImage path={poster_path} style={styles.card} />
          <InnerShadow position="top" startOpacity={0.5} size={80} />
          <InnerShadow position="bottom" startOpacity={0.5} size={100} />
          {isExpanded && this.renderMovieDetails()}
          {swipeThresholds && this.renderSwipeDimmer()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const borderRadius = 12;
const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    borderRadius: borderRadius,
  },
  card: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.gray.dark,
  },
  swipeDimmer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.gray.darker,
  },
  detailsContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
  },
  detailsDimmer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.gray.darkest,
  },
  detailsContentContainer: {
    padding: theme.spacing.small,
  },
  movieScore: {
    marginBottom: theme.spacing.xTiny,
  },
});

const makeMapStateToProps = (state: RootState, props: OwnProps) => {
  const { movieId } = props;
  const movieSelector = getMovieSelectorById(movieId);

  return (state: RootState) => ({
    movieId,
    movie: movieSelector(state),
  });
};

const mapDispatchToProps = {};

export default connect(makeMapStateToProps, mapDispatchToProps)(MovieCard);
