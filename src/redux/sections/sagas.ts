import { AxiosResponse } from 'axios';
import { call, put, select } from 'redux-saga/effects';

import { MovieListApiResponse } from '../../api/movies';
import { UserIdsParams } from '../../api/types';
import { isLastMovieList } from '../../utils/movies';
import { userIdParamsSelector } from '../auth/selectors';
import { normalizeAndAddMovies } from '../movies/helpers';
import { handleNetworkReduxError } from '../network/actions';
import {
  FetchSectionNextPage,
  fetchSectionNextPage,
  FetchSectionNextPageRequest,
  fetchSectionNextPageSuccess,
  RefreshSectionRequest,
  refreshSectionSuccess,
} from './actions';
import { FETCH_SECTION_NEXT_PAGE } from './constants';
import { sectionData } from './sectionData';
import { getSectionSelectorByKey } from './selectors';
import { Section } from './types';
import { isSameSectionRequest } from './utils';

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
