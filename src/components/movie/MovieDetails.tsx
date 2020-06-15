import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { Movie } from '../../redux/movies/types';
import { theme } from '../../theme';
import { AppText } from '../common';
import MovieBackdropWithTitle from './MovieBackdropWithTitle';
import MovieDetailsButtons from './MovieDetailsButtons';
import MovieGenres from './MovieGenres';
import { getMoviePreviewHeight } from './MoviePreview';
import MovieScoreYear from './MovieScoreYear';
import MoviesHorizontalFlatList from './MoviesHorizontalFlatList';

/* ------------- Local ------------- */
const previewAdditionalProps = { withRatingBadge: true };

/* ------------- Props and State ------------- */
type Props = {
  movie: Movie;
};

/* ------------- Component ------------- */
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
      <MoviesHorizontalFlatList movieIds={recommendations || []} moviePreviewAdditionalProps={previewAdditionalProps} />
    );
  };

  render() {
    const { movie } = this.props;
    const { title, overview, movieDetailed, backdrop_path, vote_average, year } = movie;

    return (
      <View>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
        >
          <MovieBackdropWithTitle title={title} backdropPath={backdrop_path} />
          <View style={styles.marginHorizontal}>
            <MovieScoreYear style={styles.marginBottom} score={vote_average} year={year} />
            {movieDetailed && <MovieGenres style={styles.marginBottom} detailedMovie={movieDetailed} />}
            <MovieDetailsButtons movie={movie} detailedMovie={movieDetailed} />
            <AppText style={styles.marginBottom} type="headline">
              Overview
            </AppText>
            <AppText style={styles.overview}>{overview}</AppText>
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
