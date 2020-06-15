import { put, select } from 'redux-saga/effects';

import { exploreMovieIdsSelector } from '../explore/selectors';
import { filterUnusedMovieData } from '../movies/actions';
import { AfterRehydrate } from './actions';

export function* afterRehydrateSaga({}: AfterRehydrate) {
  const exploreMovieIds = yield select(exploreMovieIdsSelector);
  yield put(filterUnusedMovieData({ movieIds: exploreMovieIds }));
}
