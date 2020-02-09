import * as movieConstants from './constants';
import { MovieDetailed } from '../../api/types';
import { MovieStatusType, MovieId, Movie, MovieIdParam } from './types';
import { WithCallbacks } from '../types';

/* ------------- Types ------------- */
export interface AddMovies extends ReturnType<typeof addMovies> {}
export interface FetchDetailedMovieRequest extends ReturnType<typeof fetchDetailedMovieRequest> {}
export interface FetchDetailedMovieSuccess extends ReturnType<typeof fetchDetailedMovieSuccess> {}
export interface FetchMovieAccountStateRequest extends ReturnType<typeof fetchMovieAccountStateRequest> {}
export interface FetchMovieAccountStateSuccess extends ReturnType<typeof fetchMovieAccountStateSuccess> {}
export interface FetchMovieRecommendationsRequest extends ReturnType<typeof fetchMovieRecommendationsRequest> {}
export interface FetchMovieRecommendationsSuccess extends ReturnType<typeof fetchMovieRecommendationsSuccess> {}
export interface ChangeMovieStatusRequest extends ReturnType<typeof changeMovieStatusRequest> {}
export interface ChangeMovieStatusSuccess extends ReturnType<typeof changeMovieStatusSuccess> {}
export interface ChangeMovieStatusFailure extends ReturnType<typeof changeMovieStatusFailure> {}

export type MoviesAction =
  | AddMovies
  | FetchDetailedMovieRequest
  | FetchDetailedMovieSuccess
  | FetchMovieAccountStateRequest
  | FetchMovieAccountStateSuccess
  | FetchMovieRecommendationsRequest
  | FetchMovieRecommendationsSuccess
  | ChangeMovieStatusRequest
  | ChangeMovieStatusSuccess
  | ChangeMovieStatusFailure;

/* ------------- Others ------------- */
interface ChangeMovieStatusParams {
  movieId: MovieId;
  statusType: MovieStatusType;
  status: boolean;
}

/* ------------- Actions ------------- */
export const addMovies = (movies: Movie[]) =>
  <const>{
    type: movieConstants.ADD_MOVIES,
    movies,
  };

export const fetchDetailedMovieRequest = (params: MovieIdParam & WithCallbacks) =>
  <const>{
    type: movieConstants.FETCH_DETAILED_MOVIE_REQUEST,
    ...params,
  };

export const fetchDetailedMovieSuccess = (params: MovieIdParam & { movieDetailed: MovieDetailed }) =>
  <const>{
    type: movieConstants.FETCH_DETAILED_MOVIE_SUCCESS,
    ...params,
  };

export const fetchMovieAccountStateRequest = (params: MovieIdParam & WithCallbacks) =>
  <const>{
    type: movieConstants.FETCH_MOVIE_ACCOUNT_STATE_REQUEST,
    ...params,
  };

export const fetchMovieAccountStateSuccess = (params: MovieIdParam & { favorite: boolean; watchlist: boolean }) =>
  <const>{
    type: movieConstants.FETCH_MOVIE_ACCOUNT_STATE_SUCCESS,
    ...params,
  };

export const fetchMovieRecommendationsRequest = (params: MovieIdParam & WithCallbacks) =>
  <const>{
    type: movieConstants.FETCH_MOVIE_RECOMMENDATIONS_REQUEST,
    ...params,
  };

export const fetchMovieRecommendationsSuccess = (params: MovieIdParam & { recommendedMovieIds: MovieId[] }) =>
  <const>{
    type: movieConstants.FETCH_MOVIE_RECOMMENDATIONS_SUCCESS,
    ...params,
  };

export const changeMovieStatusRequest = (params: ChangeMovieStatusParams & WithCallbacks) =>
  <const>{
    type: movieConstants.CHANGE_MOVIE_STATUS_REQUEST,
    ...params,
  };

export const changeMovieStatusSuccess = (params: ChangeMovieStatusParams) =>
  <const>{
    type: movieConstants.CHANGE_MOVIE_STATUS_SUCCESS,
    ...params,
  };

export const changeMovieStatusFailure = (params: ChangeMovieStatusParams) =>
  <const>{
    type: movieConstants.CHANGE_MOVIE_STATUS_FAILURE,
    ...params,
  };
