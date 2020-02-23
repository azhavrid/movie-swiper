import { MovieListApiResponse } from '../api/movies';
import { MovieApiResponse } from '../api/types';
import {
  Movie,
  MovieId,
  MovieRequiredPropsKey,
  MovieStoreProps,
  NormalizedMovieProps,
  ParsedMovie,
} from '../redux/movies/types';
import { theme } from '../theme';

/* ------------- Key Extractor ------------- */
export const movieIdsKeyExtractor = (movieId: MovieId) => movieId.toString();
const { success, danger, warning } = theme.colors;

/* ------------- Normalization ------------- */
export const requiredMovieProps: MovieRequiredPropsKey[] = [
  'id',
  'title',
  'overview',
  'release_date',
  'poster_path',
  'backdrop_path',
];

export const isGoodMovieRating = (rating: number) => rating >= 7;
export const isNormalMovieRating = (rating: number) => rating >= 5;
export const isBadMovieRating = (rating: number) => rating < 5;

export const getMovieScoreColor = (score: number) =>
  isGoodMovieRating(score) ? success : isNormalMovieRating(score) ? warning : danger;

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
