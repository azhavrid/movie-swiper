import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../common';
import MovieBackdropWithTitle from './MovieBackdropWithTitle';
import MovieDetailsButtons from './MovieDetailsButtons';
import MovieGenres from './MovieGenres';
import MovieScoreYear from './MovieScoreYear';
import MoviesHorizontalFlatList from './MoviesHorizontalFlatList';
import { theme } from '../../theme';
import { getMoviePreviewHeight } from './MoviePreview';
import { Movie } from '../../redux/movies/types';
import Animated from 'react-native-reanimated';

/* ------------- Props and State ------------- */
type Props = {
  movie: Movie;
};

/* ------------- Class ------------- */
class MovieDetails extends React.PureComponent<Props> {
  renderEmptyRecommendations = () => (
    <View style={styles.emptyMoviesContainer}>
      <AppText type="title2">No movies found</AppText>
    </View>
  );

  renderMovieRecommendations = () => {
    const { movie } = this.props;
    const { recommendations } = movie;
    const isRecommendationsEmpty = recommendations && recommendations.length === 0;

    return isRecommendationsEmpty ? (
      this.renderEmptyRecommendations()
    ) : (
      <MoviesHorizontalFlatList
        movieIds={recommendations || []}
        moviePreviewAdditionalProps={{ withRatingBadge: true }}
      />
    );
  };

  render() {
    const { movie } = this.props;
    const { title, movieDetailed, backdrop_path } = movie;

    return (
      <View>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
        >
          <MovieBackdropWithTitle title={title} backdropPath={backdrop_path} />
          <View style={styles.marginHorizontal}>
            <MovieScoreYear style={styles.marginBottom} movie={movie} />
            {movieDetailed && <MovieGenres style={styles.marginBottom} detailedMovie={movieDetailed} />}
            <MovieDetailsButtons movie={movie} detailedMovie={movieDetailed} />
            <AppText style={styles.marginBottom} type="headline">
              Overview
            </AppText>
            <AppText style={styles.overview}>{movie.overview}</AppText>
            <AppText style={styles.recommendationsTitle} type="headline">
              You might like
            </AppText>
          </View>
          {this.renderMovieRecommendations()}
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {},
  scrollContent: {
    paddingBottom: theme.spacing.small,
  },
  recommendationsTitle: {
    marginTop: theme.spacing.base,
    marginBottom: theme.spacing.tiny,
  },
  overview: {
    color: theme.gray.lighter,
  },
  marginBottom: {
    marginBottom: theme.spacing.xTiny,
  },
  marginHorizontal: {
    marginHorizontal: theme.spacing.small,
  },
  emptyMoviesContainer: {
    width: '100%',
    height: getMoviePreviewHeight(),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MovieDetails;
