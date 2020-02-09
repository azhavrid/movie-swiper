import React from 'react';
import { View, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import { AppText } from '../common';
import InnerShadow from '../InnerShadow';
import MovieScoreYear from './MovieScoreYear';
import { theme } from '../../theme';
import { connect } from 'react-redux';
import { RootState } from '../../redux/types';
import { getMovieSelectorById } from '../../redux/movies/selectors';
import { MovieId } from '../../redux/movies/types';
import ProgressiveImage from '../ProgressiveImage';
import { getW780ImageUrl, getW92ImageUrl } from '../../api/urls';

/* ------------- Props and State ------------- */
type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type OwnProps = {
  movieId: MovieId;
  disabled?: boolean;
};
type Props = OwnProps & ReduxProps;

type State = typeof initialState;

const initialState = {
  isExpanded: false,
};

/* ------------- Class ------------- */
class MovieCard extends React.Component<Props, State> {
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

  renderPosterImage = () => {
    const { movie } = this.props;
    const { poster_path } = movie;

    return (
      <ProgressiveImage
        resizeMode="cover"
        style={styles.card}
        source={{ uri: getW780ImageUrl(poster_path) }}
        thumbnailSource={{ uri: getW92ImageUrl(poster_path) }}
      />
    );
  };

  renderMovieDetails = () => {
    const { movie } = this.props;
    const { title, overview } = movie;

    return (
      <Animated.View style={[styles.detailsContainer, { opacity: this.detailsVisibilityAnimatedValue }]}>
        <Animated.View style={[styles.detailsDimmer, this.getDetailsDimmerAnimatedStyle()]} />
        <View style={styles.detailsContentContainer}>
          <AppText numberOfLines={2} type="largeTitle">
            {title}
          </AppText>
          <MovieScoreYear movie={movie} style={styles.movieScore} />
          <AppText numberOfLines={12} type="body">
            {overview}
          </AppText>
        </View>
      </Animated.View>
    );
  };

  render() {
    const { isExpanded } = this.state;

    return (
      <TouchableWithoutFeedback onPress={this.onCardPress}>
        <View style={styles.container}>
          {this.renderPosterImage()}
          <InnerShadow position="top" style={styles.topCurved} startOpacity={0.5} size={80} />
          <InnerShadow position="bottom" style={styles.bottomCurved} startOpacity={0.5} size={100} />
          {isExpanded && this.renderMovieDetails()}
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
    // borderRadius: borderRadius,
  },
  topCurved: {
    // borderTopLeftRadius: borderRadius,
    // borderTopRightRadius: borderRadius,
  },
  bottomCurved: {
    // borderBottomLeftRadius: borderRadius,
    // borderBottomRightRadius: borderRadius,
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

const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  movie: getMovieSelectorById(ownProps.movieId)(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);
