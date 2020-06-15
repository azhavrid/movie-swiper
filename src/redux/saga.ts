import { SagaIterator } from 'redux-saga';
import { all, fork, takeEvery, takeLatest } from 'redux-saga/effects';

import * as authConstants from './auth/constants';
import * as authSagas from './auth/sagas';
import * as exploreConstants from './explore/constants';
import * as exploreSagas from './explore/sagas';
import * as moviesConstants from './movies/constants';
import * as moviesSagas from './movies/sagas';
import * as networkConstants from './network/constants';
import * as networkSagas from './network/sagas';
import * as rehydrateConstants from './rehydrate/constants';
import * as rehydrateSagas from './rehydrate/sagas';
import * as searchConstants from './search/constants';
import * as searchSagas from './search/sagas';
import * as sectionsConstants from './sections/constants';
import * as sectionsSagas from './sections/sagas';

export function* rootSaga(): SagaIterator {
  yield all([
    takeLatest(authConstants.CREATE_AUTHENTICATED_SESSION_REQUEST, authSagas.createAuthenticatedSessionSaga),
    takeLatest(authConstants.CREATE_GUEST_SESSION_REQUEST, authSagas.createGuestSessionSaga),
    takeLatest(authConstants.LOG_OUT, authSagas.logOutSaga),

    fork(exploreSagas.resolveActionQueueSaga),
    fork(exploreSagas.preloadExploreImagesSaga),
    takeLatest(exploreConstants.EXPLORE_MOVIE_SWIPED, exploreSagas.exploreMoviesLoadRequestSaga),
    takeLatest(exploreConstants.EXPLORE_MOVIES_LOAD_REQUEST, exploreSagas.exploreMoviesLoadRequestSaga),
    takeLatest(exploreConstants.EXPLORE_MOVIES_LOAD, exploreSagas.exploreMoviesLoadSaga),
    takeLatest(exploreConstants.EXPLORE_MOVIES_LOAD_SUCCESS, exploreSagas.movieSwiped),

    takeEvery(moviesConstants.FETCH_DETAILED_MOVIE_REQUEST, moviesSagas.fetchDetailedMovieSaga),
    takeEvery(moviesConstants.FETCH_MOVIE_RECOMMENDATIONS_REQUEST, moviesSagas.fetchMovieRecommendationsSaga),
    takeEvery(moviesConstants.FETCH_MOVIE_ACCOUNT_STATE_REQUEST, moviesSagas.fetchMovieAccountStateSaga),
    takeEvery(moviesConstants.CHANGE_MOVIE_STATUS_REQUEST, moviesSagas.changeMovieStatusSaga),

    fork(networkSagas.resolveFailedRequestsSaga),
    takeLatest(networkConstants.INITIATE_NETWORK_MONITORING, networkSagas.initiateNetworkMonitoringSaga),
    takeLatest(networkConstants.STOP_NETWORK_MONITORING, networkSagas.stopNetworkMonitoringSaga),
    takeLatest(networkConstants.HANDLE_NETWORK_REDUX_ERROR, networkSagas.handleNetworkReduxErrorSaga),

    takeLatest(rehydrateConstants.AFTER_REHYDRATE, rehydrateSagas.afterRehydrateSaga),

    takeLatest(searchConstants.SEARCH_TEXT_CHANGED, searchSagas.searchTextChangedSaga),
    takeLatest(searchConstants.CLEAR_SEARCH_RESULTS, searchSagas.clearSearchResultsSaga),
    takeLatest(searchConstants.SEARCH_MOVIES_REQUEST, searchSagas.searchMoviesSaga),
    takeLatest(searchConstants.SEARCH_MOVIES_PAGINATION_REQUEST, searchSagas.searchMoviesPaginationRequestSaga),
    takeLatest(searchConstants.SEARCH_MOVIES_PAGINATION_FETCH, searchSagas.searchMoviesPaginationFetchSaga),

    takeEvery(sectionsConstants.REFRESH_SECTION_REQUEST, sectionsSagas.refreshSectionRequestSaga),
    takeEvery(sectionsConstants.FETCH_SECTION_NEXT_PAGE, sectionsSagas.fetchSectionNextPageSaga),
    takeEvery(sectionsConstants.FETCH_SECTION_NEXT_PAGE_REQUEST, sectionsSagas.fetchSectionNextPageRequestSaga),
  ]);
}
