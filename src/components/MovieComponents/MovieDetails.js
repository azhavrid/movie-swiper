import React from 'react';
import { View, StyleSheet, LayoutAnimation } from 'react-native';
import { AppText } from '../common';
import MovieBackdropWithTitle from './MovieBackdropWithTitle';
import MovieDetailsButtons from './MovieDetailsButtons';
import MovieGenres from './MovieGenres';
import MovieScoreYear from './MovieScoreYear';
import MoviesHorizontalFlatList from './MoviesHorizontalFlatList';
import withRefetch from '../hoc/withRefetch';
import { fetchMovieDetailedInfo, fetchMovieRecommendations } from '../../api/movies';
import Theme from '../../Theme';
import MoviePreview from './MoviePreview';

class MovieDetails extends React.PureComponent {
  state = {
    detailedMovie: null,
    recommendedMovies: null
  };

  componentDidMount() {
    // eslint-disable-next-line
    requestAnimationFrame(() => this.loadDetailedInfo());
  }

  loadDetailedInfo = async () => {
    const {
      movie,
      refetch: { fetchUntilSuccess }
    } = this.props;
    const detailedMovie = await fetchUntilSuccess(() => fetchMovieDetailedInfo({ movie }));
    this.configureDetailsAnimation();
    this.setState({ detailedMovie });

    const { movies: recommendedMovies } = await fetchUntilSuccess(() =>
      fetchMovieRecommendations({ movie })
    );
    this.configureRecommendationsAnimation();
    this.setState({ recommendedMovies });
  };

  configureDetailsAnimation() {
    const { scaleY } = LayoutAnimation.Properties;
    const type = LayoutAnimation.Types.easeOut;

    LayoutAnimation.configureNext({
      duration: 250,
      update: { type, property: scaleY }
    });
  }

  configureRecommendationsAnimation() {
    const { opacity } = LayoutAnimation.Properties;
    const type = LayoutAnimation.Types.easeOut;

    LayoutAnimation.configureNext({
      duration: 250,
      create: { type, property: opacity },
      delete: { type, property: opacity }
    });
  }

  render() {
    const { movie } = this.props;
    const { detailedMovie, recommendedMovies } = this.state;
    const noRecommendedMovies = recommendedMovies && recommendedMovies.length === 0;

    return (
      <View style={styles.container}>
        <MovieBackdropWithTitle movie={movie} />
        <View style={styles.mh}>
          <MovieScoreYear style={styles.mb} movie={movie} />
          {detailedMovie && <MovieGenres style={styles.mb} detailedMovie={detailedMovie} />}
          <MovieDetailsButtons movie={movie} detailedMovie={detailedMovie} />
          <AppText style={styles.mb} type="headline">
            Overview
          </AppText>
          <AppText style={styles.overview}>{movie.overview}</AppText>
          <AppText style={styles.recommendationsTitle} type="headline">
            You might like
          </AppText>
        </View>

        {noRecommendedMovies ? (
          <View style={styles.noMoviesContainer}>
            <AppText type="title2">No movies found</AppText>
          </View>
        ) : (
          <MoviesHorizontalFlatList
            movies={recommendedMovies || []}
            paddingLeft={styles.mh.marginHorizontal}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.small
  },
  recommendationsTitle: {
    marginTop: Theme.spacing.base,
    marginBottom: Theme.spacing.tiny
  },
  overview: {
    color: Theme.gray.lighter
  },
  mb: {
    marginBottom: Theme.spacing.xTiny
  },
  mh: {
    marginHorizontal: Theme.spacing.small
  },
  noMoviesContainer: {
    width: '100%',
    height: MoviePreview.getPreviewHeight(),
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default withRefetch(MovieDetails);
