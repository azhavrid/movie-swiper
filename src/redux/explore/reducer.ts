import { uniq } from 'lodash';
import uuid from 'uuid';

import { MovieId } from '../movies/types';
import { AfterRehydrate } from '../rehydrate/actions';
import { AFTER_REHYDRATE } from '../rehydrate/constants';
import {
  ExploreAction,
  ExploreActionResolved,
  ExploreMoviesLoadSuccess,
  ExploreMoviesPostersLoaded,
  ExploreMovieSwiped,
} from './actions';
import * as exploreConstants from './constants';
import { socialActionMap } from './exploreData';
import { SocialAction } from './types';

/* ------------- State ------------- */
type ExploreStateType = typeof initialState;
export interface ExploreState extends ExploreStateType {}

export const initialState = {
  movieIds: [] as MovieId[],
  loadedPosterMovieIds: [] as MovieId[],
  isLoading: false,
  actionQueue: [] as SocialAction[],
  seenIdsMap: {} as Record<MovieId, boolean>,
};

/* ------------- Reducers ------------- */
const exploreMoviesLoad = (state: ExploreState): ExploreState => ({
  ...state,
  isLoading: true,
});

const exploreMoviesLoadSuccess = (state: ExploreState, action: ExploreMoviesLoadSuccess): ExploreState => {
  const { movieIds } = action;
  const newSeenIdsMap = movieIds.reduce((acc, value) => ((acc[value] = true), acc), {});

  return {
    ...state,
    isLoading: false,
    movieIds: uniq([...state.movieIds, ...movieIds]),
    seenIdsMap: { ...state.seenIdsMap, ...newSeenIdsMap },
  };
};

const exploreMovieSwiped = (state: ExploreState, action: ExploreMovieSwiped): ExploreState => {
  const [movieId, ...restMovieIds] = state.movieIds;
  const socialAction: SocialAction = { id: uuid.v4(), movieId, actionType: socialActionMap[action.swipeDirection] };

  return {
    ...state,
    movieIds: restMovieIds,
    actionQueue: [...state.actionQueue, socialAction],
  };
};

const exploreActionResolved = (state: ExploreState, action: ExploreActionResolved): ExploreState => ({
  ...state,
  actionQueue: state.actionQueue.filter(socialAction => socialAction.id !== action.id),
});

const exploreMoviesPostersLoaded = (state: ExploreState, action: ExploreMoviesPostersLoaded): ExploreState => ({
  ...state,
  loadedPosterMovieIds: [...state.loadedPosterMovieIds, ...action.movieIds],
});

const afterRehydrate = (state: ExploreState): ExploreState => ({
  ...state,
  isLoading: false,
  loadedPosterMovieIds: [],
});

const exploreReducer = (
  state: ExploreState | undefined = initialState,
  action: ExploreAction | AfterRehydrate,
): ExploreState => {
  switch (action.type) {
    case exploreConstants.EXPLORE_MOVIES_LOAD:
      return exploreMoviesLoad(state);
    case exploreConstants.EXPLORE_MOVIES_LOAD_SUCCESS:
      return exploreMoviesLoadSuccess(state, action);
    case exploreConstants.EXPLORE_MOVIE_SWIPED:
      return exploreMovieSwiped(state, action);
    case exploreConstants.EXPLORE_ACTION_RESOLVED:
      return exploreActionResolved(state, action);
    case exploreConstants.EXPLORE_MOVIES_POSTERS_LOADED:
      return exploreMoviesPostersLoaded(state, action);
    case AFTER_REHYDRATE:
      return afterRehydrate(state);
    default:
      return state;
  }
};

export default exploreReducer;
