import moment from 'moment';

import { MovieId } from '../movies/types';
import * as searchConstants from './constants';

/* ------------- Types ------------- */
export type SearchTextChanged = ReturnType<typeof searchTextChanged>;
export type ClearSearchResults = ReturnType<typeof clearSearchResults>;
export type SearchMoviesRequest = ReturnType<typeof searchMoviesRequest>;
export type SearchMoviesRequestSlow = ReturnType<typeof searchMoviesRequestSlow>;
export type SearchMoviesSuccess = ReturnType<typeof searchMoviesSuccess>;
export type SearchMoviesPaginationRequest = ReturnType<typeof searchMoviesPaginationRequest>;
export type SearchMoviesPaginationFetch = ReturnType<typeof searchMoviesPaginationFetch>;
export type SearchMoviesPaginationSuccess = ReturnType<typeof searchMoviesPaginationSuccess>;

export type SearchAction =
  | SearchTextChanged
  | ClearSearchResults
  | SearchMoviesRequest
  | SearchMoviesRequestSlow
  | SearchMoviesSuccess
  | SearchMoviesPaginationRequest
  | SearchMoviesPaginationFetch
  | SearchMoviesPaginationSuccess;

/* ------------- Actions ------------- */
export const searchTextChanged = (query: string) =>
  <const>{
    type: searchConstants.SEARCH_TEXT_CHANGED,
    query,
  };

export const clearSearchResults = () =>
  <const>{
    type: searchConstants.CLEAR_SEARCH_RESULTS,
  };

export const searchMoviesRequest = () =>
  <const>{
    type: searchConstants.SEARCH_MOVIES_REQUEST,
  };

export const searchMoviesRequestSlow = () =>
  <const>{
    type: searchConstants.SEARCH_MOVIES_REQUEST_SLOW,
  };

export const searchMoviesSuccess = (movieIds: MovieId[], isLastPage: boolean) =>
  <const>{
    type: searchConstants.SEARCH_MOVIES_SUCCESS,
    movieIds,
    isLastPage,
  };

export const searchMoviesPaginationRequest = () =>
  <const>{
    type: searchConstants.SEARCH_MOVIES_PAGINATION_REQUEST,
  };

export const searchMoviesPaginationFetch = () =>
  <const>{
    type: searchConstants.SEARCH_MOVIES_PAGINATION_FETCH,
    requestTime: moment(),
  };

export const searchMoviesPaginationSuccess = (movieIds: MovieId[], isLastPage: boolean) =>
  <const>{
    type: searchConstants.SEARCH_MOVIES_PAGINATION_SUCCESS,
    movieIds,
    isLastPage,
  };
