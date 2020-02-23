import { AxiosResponse } from 'axios';
import { random } from 'lodash';
import { call, delay, put, select, take } from 'redux-saga/effects';

import { getPopularMoviesApi, MovieListApiResponse } from '../../api/movies';
import { UserIdsParams } from '../../api/types';
import { getMovieCardPosterUrl } from '../../components/movie/MovieCardPosterImage';
import { prefetchImages } from '../../utils/network';
import { userIdParamsSelector } from '../auth/selectors';
import { changeMovieStatusRequest } from '../movies/actions';
import { CHANGE_MOVIE_STATUS_FAILURE, CHANGE_MOVIE_STATUS_SUCCESS } from '../movies/constants';
import { normalizeAndAddMovies } from '../movies/helpers';
import { getMoviesSelectorByIds } from '../movies/selectors';
import { Movie, MovieId } from '../movies/types';
import { handleNetworkReduxError } from '../network/actions';
import { isInternetReachableSelector } from '../network/selectors';
import { AFTER_REHYDRATE } from '../rehydrate/constants';
import {
  exploreActionResolved,
  ExploreMoviesLoad,
  exploreMoviesLoad,
  ExploreMoviesLoadRequest,
  exploreMoviesLoadRequest,
  exploreMoviesLoadSuccess,
  exploreMoviesPostersLoaded,
  ExploreMovieSwiped,
} from './actions';
import { EXPLORE_MOVIE_SWIPED, EXPLORE_MOVIES_LOAD_SUCCESS } from './constants';
import {
  exploredActionQueueSelector,
  exploredSeenIdsMapSelector,
  exploreMovieIdsSelector,
  isExploreLoadingSelector,
  loadedPosterMovieIdsSelector,
} from './selectors';

const isEnoughMovies = (movieIds: MovieId[]) => movieIds.length > 10;

export function* exploreMoviesLoadRequestSaga({}: ExploreMoviesLoadRequest) {
  const exploreMovieIds: MovieId[] = yield select(exploreMovieIdsSelector);
  const isExploreLoading: boolean = yield select(isExploreLoadingSelector);

  if (isEnoughMovies(exploreMovieIds) || isExploreLoading) return;

  yield put(exploreMoviesLoad());
}

/*
  There is no "explore" endpoint in TMDB api, so I was forced to create some mechanism to fetch movies,
  preferably unique. App fetches movies from "popular movies" endpoint and stores already explored 
  movies in the local storage (since there is no backend to do it there). 
  Movies on "popular" list are updated daily: some of movies are reordered, some of them are added, etc.
  To make process of retrieving movies faster there is a tweak that page number is randomly increased.
*/
export function* exploreMoviesLoadSaga(action: ExploreMoviesLoad) {
  try {
    const userIds: UserIdsParams = yield select(userIdParamsSelector);

    let page = 1;
    let increaseDispersion = 1;
    const accumulateMovieIds = [];

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

export function* preloadExploreImagesSaga() {
  yield take(AFTER_REHYDRATE);
  const preloadImagesCount = 10;
  const onLoadErrorDelay = 500;

  while (true) {
    const exploreMovieIds: MovieId[] = yield select(exploreMovieIdsSelector);
    const loadedPosterMovieIds: MovieId[] = yield select(loadedPosterMovieIdsSelector);
    const movieIdsToLoad = exploreMovieIds
      .filter(movieId => !loadedPosterMovieIds.includes(movieId))
      .slice(0, preloadImagesCount);
    const moviesToLoad: Movie[] = yield select(getMoviesSelectorByIds(movieIdsToLoad));
    const moviesImagePathsToLoad = moviesToLoad.map(movie => getMovieCardPosterUrl(movie.poster_path));

    if (movieIdsToLoad.length > 0) {
      const isInternetReachable: boolean = yield select(isInternetReachableSelector);
      if (isInternetReachable) {
        try {
          yield call(prefetchImages, moviesImagePathsToLoad);
          yield put(exploreMoviesPostersLoaded(movieIdsToLoad));
        } catch (e) {
          yield delay(onLoadErrorDelay);
        }
      } else {
        yield delay(onLoadErrorDelay);
      }
    } else {
      yield take(EXPLORE_MOVIES_LOAD_SUCCESS);
    }
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
