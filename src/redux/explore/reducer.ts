import uniq from 'lodash/uniq';
import * as exploreConstants from './constants';
import { ExploreAction, ExploreMoviesLoadSuccess, ExploreMovieSwiped } from './actions';
import { SocialAction } from './types';
import { MovieId } from '../movies/types';
import { socialActionMap } from './exploreData';
import { AfterRehydrate } from '../rehydrate/actions';
import { AFTER_REHYDRATE } from '../rehydrate/constants';

/* ------------- State ------------- */
type ExploreStateType = typeof initialState;
export interface ExploreState extends ExploreStateType {}

export const initialState = {
  movieIds: [] as MovieId[],
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
  const socialAction: SocialAction = { movieId, action: socialActionMap[action.swipeDirection] };

  return {
    ...state,
    movieIds: restMovieIds,
    actionQueue: [...state.actionQueue, socialAction],
  };
};

const removeTopAction = (state: ExploreState): ExploreState => ({
  ...state,
  actionQueue: state.actionQueue.slice(1),
});

const afterRehydrate = (state: ExploreState): ExploreState => ({
  ...state,
  isLoading: false,
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
    case exploreConstants.EXPLORE_ACTION_SKIPPED:
      return removeTopAction(state);
    case AFTER_REHYDRATE:
      return afterRehydrate(state);
    default:
      return state;
  }
};

export default exploreReducer;
