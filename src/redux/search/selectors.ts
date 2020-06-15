import { createSelector } from 'reselect';

import { RootState } from '../types';

export const searchStateSelector = (state: RootState) => state.search;

export const searchTextSelector = createSelector(searchStateSelector, search => search.searchText);

export const isSearchTextEmptySelector = createSelector(searchTextSelector, searchText => searchText.length === 0);

export const searchMovieIdsSelector = createSelector(searchStateSelector, search => search.movieIds);

export const searchCurrentPageSelector = createSelector(searchStateSelector, search => search.currentPage);

export const searchLastUpdatedSelector = createSelector(searchStateSelector, search => search.lastUpdated);

export const isSearchLastPageSelector = createSelector(searchStateSelector, search => search.isLastPage);

export const isSearchDebouncePendingSelector = createSelector(searchStateSelector, search => search.debouncePending);

export const isSearchRequestPendingSelector = createSelector(
  searchStateSelector,
  search => search.searchRequestPending,
);

export const isSearchRequestSlowSelector = createSelector(searchStateSelector, search => search.isSearchRequestSlow);

export const isSearchLoadingSelector = createSelector(
  [isSearchDebouncePendingSelector, isSearchRequestPendingSelector],
  (isSearchDebouncePending, isSearchRequestPending) => isSearchDebouncePending || isSearchRequestPending,
);

export const isSearchPaginationPendingSelector = createSelector(
  searchStateSelector,
  search => search.searchPaginationPending,
);
