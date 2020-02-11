import { call, put, select, delay, fork, take, race } from 'redux-saga/effects';
import {
  SearchMoviesRequest,
  searchMoviesSuccess,
  searchMoviesRequest,
  SearchMoviesPaginationRequest,
  searchMoviesPaginationSuccess,
  SearchTextChanged,
  clearSearchResults,
  SearchMoviesPaginationFetch,
  searchMoviesPaginationFetch,
  ClearSearchResults,
  searchMoviesRequestSlow,
} from './actions';
import { MovieListApiResponse, getMoviesBySearchQueryApi } from '../../api/movies';
import { AxiosResponse } from 'axios';
import {
  searchTextSelector,
  searchCurrentPageSelector,
  searchLastUpdatedSelector,
  isSearchPaginationPendingSelector,
} from './selectors';
import { isLastMovieList } from '../../utils/movies';
import { handleNetworkReduxError, clearReduxActionsFromQueue } from '../network/actions';
import {
  SEARCH_MOVIES_PAGINATION_FETCH,
  SEARCH_MOVIES_REQUEST,
  SEARCH_TEXT_CHANGED,
  SEARCH_MOVIES_SUCCESS,
} from './constants';
import { normalizeAndAddMovies } from '../movies/helpers';

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
