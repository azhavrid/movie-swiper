import { keyBy, pickBy } from 'lodash';

import {
  AddMovies,
  ChangeMovieStatusFailure,
  ChangeMovieStatusRequest,
  ChangeMovieStatusSuccess,
  FetchDetailedMovieRequest,
  FetchDetailedMovieSuccess,
  FetchMovieAccountStateRequest,
  FetchMovieAccountStateSuccess,
  FetchMovieRecommendationsRequest,
  FetchMovieRecommendationsSuccess,
  FilterUnusedMovieData,
  MoviesAction,
} from './actions';
import * as movieConstants from './constants';
import { Movie, MovieId } from './types';

/* ------------- State ------------- */
type MovieStateType = typeof initialState;
export interface MovieState extends MovieStateType {}

export const initialState = {} as Record<MovieId, Movie>;

/* ------------- Reducers ------------- */
const addMovies = (state: MovieState, action: AddMovies): MovieState => {
  const { movies } = action;

  const moviesWithoutDuplicates = movies.filter(movie => !state[movie.id]);
  const moviesMapById = keyBy(moviesWithoutDuplicates, movie => movie.id);

  return {
    ...state,
    ...moviesMapById,
  };
};

const fetchDetailedMovieRequest = (state: MovieState, {}: FetchDetailedMovieRequest): MovieState => ({
  ...state,
});

const fetchDetailedMoviesSuccess = (state: MovieState, action: FetchDetailedMovieSuccess): MovieState => {
  const { movieId, movieDetailed } = action;
  const movie = state[movieId];

  return {
    ...state,
    [movieId]: { ...movie, movieDetailed },
  };
};

const fetchMovieAccountStateRequest = (state: MovieState, {}: FetchMovieAccountStateRequest): MovieState => ({
  ...state,
});

const fetchMovieAccountStatesSuccess = (state: MovieState, action: FetchMovieAccountStateSuccess): MovieState => {
  const { movieId, favorite, watchlist } = action;
  const movie = state[movieId];

  return {
    ...state,
    [movieId]: { ...movie, isInFavorites: favorite, isInWatchlist: watchlist },
  };
};

const fetchMovieRecommendationsRequest = (state: MovieState, {}: FetchMovieRecommendationsRequest): MovieState => ({
  ...state,
});

const fetchMovieRecommendationsSuccess = (state: MovieState, action: FetchMovieRecommendationsSuccess): MovieState => {
  const { movieId, recommendedMovieIds } = action;
  const movie = state[movieId];

  return {
    ...state,
    [movieId]: { ...movie, recommendations: recommendedMovieIds },
  };
};

const changeMovieStatusRequest = (state: MovieState, action: ChangeMovieStatusRequest): MovieState => {
  const { movieId, status, statusType } = action;
  const movie = state[movieId];

  return {
    ...state,
    [movieId]:
      statusType === 'favorite'
        ? { ...movie, isFavoritesPending: true, isInFavorites: status }
        : { ...movie, isWatchlistPending: true, isInWatchlist: status },
  };
};

const changeMovieStatusSuccess = (state: MovieState, action: ChangeMovieStatusSuccess): MovieState => {
  const { movieId, status, statusType } = action;
  const movie = state[movieId];

  return {
    ...state,
    [movieId]:
      statusType === 'favorite'
        ? { ...movie, isFavoritesPending: false, isInFavorites: status }
        : { ...movie, isWatchlistPending: false, isInWatchlist: status },
  };
};

const changeMovieStatusFailure = (state: MovieState, action: ChangeMovieStatusFailure): MovieState => {
  const { movieId, status, statusType } = action;
  const movie = state[movieId];

  return {
    ...state,
    [movieId]:
      statusType === 'favorite'
        ? { ...movie, isFavoritesPending: false, isInFavorites: !status }
        : { ...movie, isWatchlistPending: false, isInWatchlist: !status },
  };
};

const filterUnusedMovieData = (state: MovieState, action: FilterUnusedMovieData): MovieState => {
  const { movieIds: persistMovieIds } = action;
  const filteredState = pickBy(state, movie => persistMovieIds.includes(movie.id));
  return filteredState;
};

const moviesReducer = (state: MovieState | undefined = initialState, action: MoviesAction): MovieState => {
  switch (action.type) {
    case movieConstants.ADD_MOVIES:
      return addMovies(state, action);
    case movieConstants.FETCH_DETAILED_MOVIE_REQUEST:
      return fetchDetailedMovieRequest(state, action);
    case movieConstants.FETCH_DETAILED_MOVIE_SUCCESS:
      return fetchDetailedMoviesSuccess(state, action);
    case movieConstants.FETCH_MOVIE_ACCOUNT_STATE_REQUEST:
      return fetchMovieAccountStateRequest(state, action);
    case movieConstants.FETCH_MOVIE_ACCOUNT_STATE_SUCCESS:
      return fetchMovieAccountStatesSuccess(state, action);
    case movieConstants.FETCH_MOVIE_RECOMMENDATIONS_REQUEST:
      return fetchMovieRecommendationsRequest(state, action);
    case movieConstants.FETCH_MOVIE_RECOMMENDATIONS_SUCCESS:
      return fetchMovieRecommendationsSuccess(state, action);
    case movieConstants.CHANGE_MOVIE_STATUS_REQUEST:
      return changeMovieStatusRequest(state, action);
    case movieConstants.CHANGE_MOVIE_STATUS_SUCCESS:
      return changeMovieStatusSuccess(state, action);
    case movieConstants.CHANGE_MOVIE_STATUS_FAILURE:
      return changeMovieStatusFailure(state, action);
    case movieConstants.FILTER_UNUSED_MOVIE_DATA:
      return filterUnusedMovieData(state, action);
    default:
      return state;
  }
};

export default moviesReducer;
