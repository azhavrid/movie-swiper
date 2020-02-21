import { random } from 'lodash';
import { call, put, select, take, delay } from 'redux-saga/effects';
import {
  ExploreMoviesLoadRequest,
  exploreMoviesLoadSuccess,
  ExploreMovieSwiped,
  exploreMoviesLoadRequest,
  exploreMoviesLoad,
  ExploreMoviesLoad,
  exploreActionResolved,
} from './actions';
import { UserIdsParams } from '../../api/types';
import { userIdParamsSelector } from '../auth/selectors';
import { getPopularMoviesApi, MovieListApiResponse } from '../../api/movies';
import { AxiosResponse } from 'axios';
import {
  exploreMovieIdsSelector,
  isExploreLoadingSelector,
  exploredSeenIdsMapSelector,
  exploredActionQueueSelector,
} from './selectors';
import { MovieId } from '../movies/types';
import { handleNetworkReduxError } from '../network/actions';
import { normalizeAndAddMovies } from '../movies/helpers';
import { EXPLORE_MOVIE_SWIPED } from './constants';
import { isInternetReachableSelector } from '../network/selectors';
import { changeMovieStatusRequest } from '../movies/actions';
import { CHANGE_MOVIE_STATUS_SUCCESS, CHANGE_MOVIE_STATUS_FAILURE } from '../movies/constants';
import { AFTER_REHYDRATE } from '../rehydrate/constants';

const isEnoughMovies = (movieIds: MovieId[]) => movieIds.length > 10;

export function* exploreMoviesLoadRequestSaga({}: ExploreMoviesLoadRequest) {
  const exploreMovieIds: MovieId[] = yield select(exploreMovieIdsSelector);
  const isExploreLoading: boolean = yield select(isExploreLoadingSelector);

  if (isEnoughMovies(exploreMovieIds) || isExploreLoading) return;

  yield put(exploreMoviesLoad());
}

/*
  There is no "explore" endpoint in TMDB api, so I was forced to create some mechanism to fetch movies,
  preferably unique. App fetches movies from "popular movies" endpoint ands stores already explored 
  movies in the local storage (since there is no backend to do it there). 
  Movies on "popular movies" list are updated daily: some of movies are reordered, some of them are added, etc.
  To make process of retrieving movies faster there is a tweak that page number is randomly increased.
*/
export function* exploreMoviesLoadSaga(action: ExploreMoviesLoad) {
  try {
    const userIds: UserIdsParams = yield select(userIdParamsSelector);

    let page = 1;
    let increaseDispersion = 1;
    let accumulateMovieIds = [];

    while (accumulateMovieIds.length < 20) {
      page = page + random(1, increaseDispersion);
      increaseDispersion = increaseDispersion + 2;

      const { data }: AxiosResponse<MovieListApiResponse> = yield call(getPopularMoviesApi, {
        page,
        ...userIds,
      });

      const seenIdsMap: ReturnType<typeof exploredSeenIdsMapSelector> = yield select(exploredSeenIdsMapSelector);
      const unexploredMovies = data.results.filter(notNormalizedMovie => !seenIdsMap[notNormalizedMovie.id]);
      const { movieIds } = normalizeAndAddMovies(unexploredMovies);

      accumulateMovieIds.push(...movieIds);
    }

    yield put(exploreMoviesLoadSuccess(accumulateMovieIds));
  } catch (error) {
    yield put(handleNetworkReduxError(error, action));
  }
}

export function* movieSwiped({}: ExploreMovieSwiped) {
  const exploreMovieIds: MovieId[] = yield select(exploreMovieIdsSelector);
  if (!isEnoughMovies(exploreMovieIds)) {
    yield put(exploreMoviesLoadRequest());
  }
}

export function* resolveActionQueueSaga() {
  const delayAfterFailure = 2000;

  while (true) {
    const actionQueue: ReturnType<typeof exploredActionQueueSelector> = yield select(exploredActionQueueSelector);

    if (actionQueue.length > 0) {
      const socialAction = actionQueue[0];
      const { id, actionType, movieId } = socialAction;

      if (actionType === 'skip') {
        yield put(exploreActionResolved(id));
      } else {
        const isInternetReachable: boolean = yield select(isInternetReachableSelector);

        if (isInternetReachable) {
          yield put(changeMovieStatusRequest({ movieId, status: true, statusType: actionType }));

          const changeMovieStatusAction = yield take([CHANGE_MOVIE_STATUS_SUCCESS, CHANGE_MOVIE_STATUS_FAILURE]);
          if (changeMovieStatusAction.type === CHANGE_MOVIE_STATUS_SUCCESS) {
            yield put(exploreActionResolved(id));
          } else {
            yield delay(delayAfterFailure);
          }
        } else {
          yield delay(delayAfterFailure);
        }
      }
    } else {
      yield take([EXPLORE_MOVIE_SWIPED, AFTER_REHYDRATE]);
    }
  }
}
