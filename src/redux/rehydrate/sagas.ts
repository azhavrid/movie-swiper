import { put, select } from 'redux-saga/effects';
import { AfterRehydrate } from './actions';
import { filterUnusedMovieData } from '../movies/actions';
import { exploreMovieIdsSelector } from '../explore/selectors';

export function* afterRehydrateSaga({}: AfterRehydrate) {
  const exploreMovieIds = yield select(exploreMovieIdsSelector);
  yield put(filterUnusedMovieData({ movieIds: exploreMovieIds }));
}
