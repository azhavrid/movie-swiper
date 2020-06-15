import { AxiosResponse } from 'axios';
import { call, delay, fork, put, race, select, take } from 'redux-saga/effects';

import { getMoviesBySearchQueryApi, MovieListApiResponse } from '../../api/movies';
import { isLastMovieList } from '../../utils/movies';
import { normalizeAndAddMovies } from '../movies/helpers';
import { clearReduxActionsFromQueue, handleNetworkReduxError } from '../network/actions';
import {
  ClearSearchResults,
  clearSearchResults,
  SearchMoviesPaginationFetch,
  searchMoviesPaginationFetch,
  SearchMoviesPaginationRequest,
  searchMoviesPaginationSuccess,
  SearchMoviesRequest,
  searchMoviesRequest,
  searchMoviesRequestSlow,
  searchMoviesSuccess,
  SearchTextChanged,
} from './actions';
import {
  SEARCH_MOVIES_PAGINATION_FETCH,
  SEARCH_MOVIES_REQUEST,
  SEARCH_MOVIES_SUCCESS,
  SEARCH_TEXT_CHANGED,
} from './constants';
import {
  isSearchPaginationPendingSelector,
  searchCurrentPageSelector,
  searchLastUpdatedSelector,
  searchTextSelector,
} from './selectors';

export function* searchTextChangedSaga({ query }: SearchTextChanged) {
  if (query.length === 0) {
    yield put(clearSearchResults());
    return;
  }

  const searchDebounceTime = 500;
  yield delay(searchDebounceTime);
  yield put(searchMoviesRequest());
}

export function* clearSearchResultsSaga({}: ClearSearchResults) {
  yield put(clearReduxActionsFromQueue([SEARCH_MOVIES_REQUEST, SEARCH_MOVIES_PAGINATION_FETCH]));
}

export function* searchMoviesSaga(action: SearchMoviesRequest) {
  try {
    const query: string = yield select(searchTextSelector);
    if (query.length === 0) return;

    yield fork(checkSlowSearchRequestSaga);

    const { data }: AxiosResponse<MovieListApiResponse> = yield call(getMoviesBySearchQueryApi, { page: 1, query });

    const { movieIds } = normalizeAndAddMovies(data.results);

    yield put(searchMoviesSuccess(movieIds, isLastMovieList(data)));
  } catch (error) {
    yield put(handleNetworkReduxError(error, action, { clearActionsFromQueue: SEARCH_MOVIES_PAGINATION_FETCH }));
  }
}

function* checkSlowSearchRequestSaga() {
  const [isDelayed] = yield race([delay(2000), take(SEARCH_TEXT_CHANGED), take(SEARCH_MOVIES_SUCCESS)]);
  if (isDelayed) {
    yield put(searchMoviesRequestSlow());
  }
}

export function* searchMoviesPaginationRequestSaga({}: SearchMoviesPaginationRequest) {
  const isSearchPaginationPending: boolean = yield select(isSearchPaginationPendingSelector);
  if (isSearchPaginationPending) return;

  yield put(searchMoviesPaginationFetch());
}

export function* searchMoviesPaginationFetchSaga(action: SearchMoviesPaginationFetch) {
  try {
    const { requestTime } = action;
    const query: string = yield select(searchTextSelector);
    if (query.length === 0) return;

    const currentPage: number = yield select(searchCurrentPageSelector);

    const { data }: AxiosResponse<MovieListApiResponse> = yield call(getMoviesBySearchQueryApi, {
      page: currentPage + 1,
      query,
    });

    const lastUpdated: string = yield select(searchLastUpdatedSelector);
    const isRelevantUpdate = requestTime.isAfter(lastUpdated);

    if (isRelevantUpdate) {
      const { movieIds } = normalizeAndAddMovies(data.results);
      yield put(searchMoviesPaginationSuccess(movieIds, isLastMovieList(data)));
    }
  } catch (error) {
    yield put(handleNetworkReduxError(error, action));
  }
}
