import { createSelector } from 'reselect';

import { RootState } from '../types';

export const exploreStateSelector = (state: RootState) => state.explore;

export const exploreMovieIdsSelector = createSelector(exploreStateSelector, explore => explore.movieIds);

export const loadedPosterMovieIdsSelector = createSelector(
  exploreStateSelector,
  explore => explore.loadedPosterMovieIds,
);

export const exploreMovieIdsWithLoadedPosterSelector = createSelector(
  [exploreMovieIdsSelector, loadedPosterMovieIdsSelector],
  (movieIds, loadedPosterMovieIds) => movieIds.filter(movieId => loadedPosterMovieIds.includes(movieId)),
);

export const exploredSeenIdsMapSelector = createSelector(exploreStateSelector, explore => explore.seenIdsMap);

export const exploredActionQueueSelector = createSelector(exploreStateSelector, explore => explore.actionQueue);

export const isExploreLoadingSelector = createSelector(exploreStateSelector, explore => explore.isLoading);
