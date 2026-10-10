import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { connect } from 'react-redux';

import { withDelayedLoading } from '../../components/hoc/withDelayedLoading';
import MovieDetails from '../../components/movie/MovieDetails';
import ScreenWrapper from '../../components/ScreenWrapper';
import { isGuestUserSelector } from '../../redux/auth/selectors';
import {
  fetchDetailedMovieRequest,
  fetchMovieAccountStateRequest,
  fetchMovieRecommendationsRequest,
} from '../../redux/movies/actions';
import { getMovieSelectorById } from '../../redux/movies/selectors';
import { MovieId } from '../../redux/movies/types';
import { RootState } from '../../redux/types';
import { BrowseStackParamList } from '../../routes/routes';
import { routeNames } from '../../routes/routeNames';

export interface MovieDetailsScreenNavigationParams {
  movieId: MovieId;
}

type NavigationProps = NativeStackScreenProps<BrowseStackParamList, typeof routeNames.MovieDetailsScreen>;
type MapStateToProps = ReturnType<typeof makeMapStateToProps>;
type ReduxProps = ReturnType<MapStateToProps> & typeof mapDispatchToProps;
type PropsWithoutRedux = NavigationProps;
type Props = ReduxProps & PropsWithoutRedux;

class MovieDetailsScreen extends React.PureComponent<Props> {
  componentDidMount() {
    requestAnimationFrame(() => {
      this.fetchMovieData();
    });
  }

  fetchMovieData = () => {
    const {
      movie,
      movieId,
      isGuestUser,
      fetchDetailedMovieRequest,
      fetchMovieRecommendationsRequest,
      fetchMovieAccountStateRequest,
    } = this.props;

    !movie.movieDetailed && fetchDetailedMovieRequest({ movieId });
    !movie.recommendations && fetchMovieRecommendationsRequest({ movieId });
    !isGuestUser && fetchMovieAccountStateRequest({ movieId });
  };

  render() {
    const { movie } = this.props;

    return (
      <ScreenWrapper>
        <MovieDetails movie={movie} />
      </ScreenWrapper>
    );
  }
}

const makeMapStateToProps = (_state: RootState, props: PropsWithoutRedux) => {
  const movieId = props.route.params.movieId;
  const movieSelector = getMovieSelectorById(movieId);

  return (state: RootState) => ({
    movieId,
    movie: movieSelector(state),
    isGuestUser: isGuestUserSelector(state),
  });
};

const mapDispatchToProps = {
  fetchDetailedMovieRequest,
  fetchMovieRecommendationsRequest,
  fetchMovieAccountStateRequest,
};

export default connect(makeMapStateToProps, mapDispatchToProps)(withDelayedLoading(MovieDetailsScreen));
