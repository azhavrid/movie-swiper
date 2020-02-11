import { call, put, select } from 'redux-saga/effects';
import {
  RefreshSectionRequest,
  refreshSectionSuccess,
  FetchSectionNextPageRequest,
  fetchSectionNextPageSuccess,
  fetchSectionNextPage,
  FetchSectionNextPage,
} from './actions';
import { getSectionSelectorByKey } from './selectors';
import { Section } from './types';
import { AxiosResponse } from 'axios';
import { MovieListApiResponse } from '../../api/movies';
import { sectionData } from './sectionData';
import { userIdParamsSelector } from '../auth/selectors';
import { UserIdsParams } from '../../api/types';
import { isLastMovieList } from '../../utils/movies';
import { handleNetworkReduxError } from '../network/actions';
import { isSameSectionRequest } from './utils';
import { FETCH_SECTION_NEXT_PAGE } from './constants';
import { normalizeAndAddMovies } from '../movies/helpers';

export function* refreshSectionRequestSaga(action: RefreshSectionRequest) {
  try {
    const { sectionKey } = action;
    const { fetchFunction } = sectionData[sectionKey];
    const userIds: UserIdsParams = yield select(userIdParamsSelector);
    const { data }: AxiosResponse<MovieListApiResponse> = yield call(fetchFunction, { page: 1, ...userIds });

    const { movieIds } = normalizeAndAddMovies(data.results);

    yield put(refreshSectionSuccess({ sectionKey, movieIds, isLastPage: isLastMovieList(data) }));
  } catch (error) {
    yield put(
      handleNetworkReduxError(error, action, {
        isSameAction: isSameSectionRequest,
        clearActionsFromQueue: FETCH_SECTION_NEXT_PAGE,
      }),
    );
  }
}

export function* fetchSectionNextPageRequestSaga(action: FetchSectionNextPageRequest) {
  const { sectionKey } = action;
  const sectionSelector = getSectionSelectorByKey(sectionKey);
  const { isLastPage, isPaginationPending } = (yield select(sectionSelector)) as Section;

  if (!isLastPage && !isPaginationPending) {
    yield put(fetchSectionNextPage(sectionKey));
  }
}

export function* fetchSectionNextPageSaga(action: FetchSectionNextPage) {
  try {
    const { sectionKey, requestTime } = action;
    const { fetchFunction } = sectionData[sectionKey];
    const sectionSelector = getSectionSelectorByKey(sectionKey);
    const userIds: UserIdsParams = yield select(userIdParamsSelector);
    const { currentPage } = (yield select(sectionSelector)) as Section;

    const { data }: AxiosResponse<MovieListApiResponse> = yield call(fetchFunction, {
      page: currentPage + 1,
      ...userIds,
    });

    const { lastUpdated } = (yield select(sectionSelector)) as Section;
    const isRelevantUpdate = requestTime.isAfter(lastUpdated);

    if (isRelevantUpdate) {
      const { movieIds } = normalizeAndAddMovies(data.results);
      yield put(fetchSectionNextPageSuccess({ sectionKey, movieIds, isLastPage: isLastMovieList(data) }));
    }
  } catch (error) {
    yield put(handleNetworkReduxError(error, action, { isSameAction: isSameSectionRequest }));
  }
}
