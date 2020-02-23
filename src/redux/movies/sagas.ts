import { AxiosResponse } from 'axios';
import { call, put, select } from 'redux-saga/effects';

import {
  changeMovieStatusApi,
  getMovieAccountStateApi,
  GetMovieAccountStateApiResponse,
  getMovieDetailsApi,
  getMovieRecommendationsApi,
  MovieListApiResponse,
} from '../../api/movies';
import { MovieDetailed, UserIdsParams } from '../../api/types';
import { userIdParamsSelector } from '../auth/selectors';
import { handleNetworkReduxError } from '../network/actions';
import {
  changeMovieStatusFailure,
  ChangeMovieStatusRequest,
  changeMovieStatusSuccess,
  FetchDetailedMovieRequest,
  fetchDetailedMovieSuccess,
  FetchMovieAccountStateRequest,
  fetchMovieAccountStateSuccess,
  FetchMovieRecommendationsRequest,
  fetchMovieRecommendationsSuccess,
} from './actions';
import { normalizeAndAddMovies } from './helpers';

export function* fetchDetailedMovieSaga(action: FetchDetailedMovieRequest) {
  const { movieId, onSuccess, onError } = action;

  try {
    const { data }: AxiosResponse<MovieDetailed> = yield call(getMovieDetailsApi, { movieId });
    yield put(fetchDetailedMovieSuccess({ movieId, movieDetailed: data }));
    onSuccess && onSuccess();
  } catch (error) {
    onError && onError();
    yield put(handleNetworkReduxError(error, action));
  }
}

export function* fetchMovieAccountStateSaga(action: FetchMovieAccountStateRequest) {
  const { movieId, onSuccess, onError } = action;

  try {
    const userIds: UserIdsParams = yield select(userIdParamsSelector);
    const {
      data: { favorite, watchlist },
    }: AxiosResponse<GetMovieAccountStateApiResponse> = yield call(getMovieAccountStateApi, {
      movieId,
      ...userIds,
    });

    yield put(fetchMovieAccountStateSuccess({ movieId, favorite, watchlist }));
    onSuccess && onSuccess();
  } catch (error) {
    onError && onError();
    yield put(handleNetworkReduxError(error, action));
  }
}

export function* fetchMovieRecommendationsSaga(action: FetchMovieRecommendationsRequest) {
  const { movieId, onSuccess, onError } = action;

  try {
    const { data }: AxiosResponse<MovieListApiResponse> = yield call(getMovieRecommendationsApi, {
      movieId,
      page: 1,
    });

    const { movieIds } = normalizeAndAddMovies(data.results);

    yield put(fetchMovieRecommendationsSuccess({ movieId, recommendedMovieIds: movieIds }));
    onSuccess && onSuccess();
  } catch (error) {
    onError && onError();
    yield put(handleNetworkReduxError(error, action));
  }
}

export function* changeMovieStatusSaga({ movieId, status, statusType, onSuccess, onError }: ChangeMovieStatusRequest) {
  try {
    const userIds: UserIdsParams = yield select(userIdParamsSelector);
    yield call(changeMovieStatusApi, { movieId, statusType, status, ...userIds });
    yield put(changeMovieStatusSuccess({ movieId, statusType, status }));
    onSuccess && onSuccess();
  } catch (error) {
    yield put(changeMovieStatusFailure({ movieId, statusType, status }));
    onError && onError();
  }
}
