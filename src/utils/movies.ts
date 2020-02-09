import {
  MovieId,
  MovieRequiredPropsKey,
  Movie,
  NormalizedMovieProps,
  MovieStoreProps,
  ParsedMovie,
} from '../redux/movies/types';
import { MovieApiResponse } from '../api/types';
import { MovieListApiResponse } from '../api/movies';

/* ------------- Key Extractor ------------- */
export const movieIdsKeyExtractor = (movieId: MovieId) => movieId.toString();

/* ------------- Normalization ------------- */
export const requiredMovieProps: MovieRequiredPropsKey[] = [
  'id',
  'title',
  'overview',
  'release_date',
  'poster_path',
  'backdrop_path',
];

export const isLastMovieList = (data: MovieListApiResponse) => data.page >= data.total_pages;

const isEnoughMovieInfo = (movie: MovieApiResponse) => requiredMovieProps.every(prop => !!movie[prop]);

const filterNotEnoughInfoMovies = (movies: MovieApiResponse[]) => movies.filter(isEnoughMovieInfo) as ParsedMovie[];

export const normalizeMovies = (movies: MovieApiResponse[] = []) =>
  filterNotEnoughInfoMovies(movies).map(movie => normalizeMovie(movie));

const movieStoreProps: MovieStoreProps = {
  isFetching: false,
  isWatchlistPending: false,
  isInWatchlist: false,
  isFavoritesPending: false,
  isInFavorites: false,
};

export const normalizeMovie = (movie: ParsedMovie): Movie => {
  const normalizedMovieProps: NormalizedMovieProps = {
    year: movie.release_date.substr(0, 4),
  };

  return {
    ...movie,
    ...normalizedMovieProps,
    ...movieStoreProps,
  };
};
