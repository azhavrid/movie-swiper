import { uniq } from 'lodash';
import moment from 'moment';

import { MovieId } from '../movies/types';
import {
  SearchAction,
  SearchMoviesPaginationFetch,
  SearchMoviesPaginationSuccess,
  SearchMoviesRequest,
  SearchMoviesRequestSlow,
  SearchMoviesSuccess,
  SearchTextChanged,
} from './actions';
import * as searchConstants from './constants';

/* ------------- State ------------- */
type SearchStateType = typeof initialState;
export interface SearchState extends SearchStateType {}

export const initialState = {
  searchText: '',
  movieIds: [] as MovieId[],
  currentPage: 1,
  debouncePending: false,
  searchRequestPending: false,
  isSearchRequestSlow: false,
  searchPaginationPending: false,
  isLastPage: false,
  lastUpdated: undefined as string | undefined,
};

/* ------------- Reducers ------------- */
const searchTextChanged = (state: SearchState, action: SearchTextChanged): SearchState => ({
  ...state,
  debouncePending: true,
  searchText: action.query,
});

const clearSearchResults = (): SearchState => ({
  ...initialState,
  lastUpdated: moment().format(),
});

const searchMoviesRequest = (state: SearchState, {}: SearchMoviesRequest): SearchState => ({
  ...state,
  debouncePending: false,
  searchRequestPending: true,
  isSearchRequestSlow: false,
});

const searchMoviesRequestSlow = (state: SearchState, {}: SearchMoviesRequestSlow): SearchState => ({
  ...state,
  isSearchRequestSlow: true,
});

const searchMoviesSuccess = (state: SearchState, action: SearchMoviesSuccess): SearchState => ({
  ...state,
  movieIds: action.movieIds,
  searchRequestPending: false,
  isSearchRequestSlow: false,
  searchPaginationPending: false,
  currentPage: 1,
  isLastPage: action.isLastPage,
  lastUpdated: moment().format(),
});

const searchMoviesPaginationFetch = (state: SearchState, {}: SearchMoviesPaginationFetch): SearchState => {
  const { isLastPage, searchPaginationPending } = state;

  if (isLastPage || searchPaginationPending) return state;

  return {
    ...state,
    searchPaginationPending: true,
  };
};

const searchMoviesPaginationSuccess = (state: SearchState, action: SearchMoviesPaginationSuccess): SearchState => ({
  ...state,
  searchPaginationPending: false,
  currentPage: state.currentPage + 1,
  movieIds: uniq([...state.movieIds, ...action.movieIds]),
  isLastPage: action.isLastPage,
  lastUpdated: moment().format(),
});

const searchReducer = (state: SearchState | undefined = initialState, action: SearchAction): SearchState => {
  switch (action.type) {
    case searchConstants.SEARCH_TEXT_CHANGED:
      return searchTextChanged(state, action);
    case searchConstants.CLEAR_SEARCH_RESULTS:
      return clearSearchResults();
    case searchConstants.SEARCH_MOVIES_REQUEST:
      return searchMoviesRequest(state, action);
    case searchConstants.SEARCH_MOVIES_REQUEST_SLOW:
      return searchMoviesRequestSlow(state, action);
    case searchConstants.SEARCH_MOVIES_SUCCESS:
      return searchMoviesSuccess(state, action);
    case searchConstants.SEARCH_MOVIES_PAGINATION_FETCH:
      return searchMoviesPaginationFetch(state, action);
    case searchConstants.SEARCH_MOVIES_PAGINATION_SUCCESS:
      return searchMoviesPaginationSuccess(state, action);
    default:
      return state;
  }
};

export default searchReducer;
