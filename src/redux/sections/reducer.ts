import { mapValues, uniq } from 'lodash';
import moment from 'moment';

import { MovieId } from '../movies/types';
import {
  FetchSectionNextPage,
  FetchSectionNextPageSuccess,
  RefreshSectionRequest,
  RefreshSectionSuccess,
  SectionAction,
} from './actions';
import * as sectionConstants from './constants';
import { sectionData } from './sectionData';
import { Section, SectionKey } from './types';

/* ------------- State ------------- */
type SectionStateType = typeof initialState;

export interface SectionState extends SectionStateType {}

export const commonSectionParams = {
  movieIds: [] as MovieId[],
  currentPage: 1,
  isRefreshing: false,
  isPaginationPending: false,
  isLastPage: false,
  lastUpdated: undefined as string | undefined,
};

const sectionsById = mapValues(sectionData, (_, id) => ({ id, ...commonSectionParams })) as Record<SectionKey, Section>;

export const initialState = sectionsById;

/* ------------- Reducers ------------- */
const refreshSectionRequest = (state: SectionState, action: RefreshSectionRequest): SectionState => {
  const { sectionKey } = action;
  const oldSection = state[sectionKey];

  const updatedSession: Section = {
    ...oldSection,
    isRefreshing: true,
  };

  return {
    ...state,
    [sectionKey]: updatedSession,
  };
};

const refreshSectionSuccess = (state: SectionState, action: RefreshSectionSuccess): SectionState => {
  const { sectionKey, movieIds, isLastPage } = action;
  const oldSection = state[sectionKey];

  const updatedSession: Section = {
    ...oldSection,
    movieIds,
    currentPage: 1,
    isRefreshing: false,
    isPaginationPending: false,
    isLastPage,
    lastUpdated: moment().format(),
  };

  return {
    ...state,
    [sectionKey]: updatedSession,
  };
};

const fetchSectionNextPage = (state: SectionState, action: FetchSectionNextPage): SectionState => {
  const { sectionKey } = action;
  const oldSection = state[sectionKey];
  const { isLastPage, isPaginationPending } = oldSection;

  if (isLastPage || isPaginationPending) return state;

  const updatedSession: Section = {
    ...oldSection,
    isPaginationPending: true,
  };

  return {
    ...state,
    [sectionKey]: updatedSession,
  };
};

const fetchSectionNextPageSuccess = (state: SectionState, action: FetchSectionNextPageSuccess): SectionState => {
  const { sectionKey, movieIds, isLastPage } = action;
  const oldSection = state[sectionKey];
  const uniqMovieIds = uniq([...oldSection.movieIds, ...movieIds]);

  const updatedSession: Section = {
    ...oldSection,
    currentPage: oldSection.currentPage + 1,
    movieIds: uniqMovieIds,
    isPaginationPending: false,
    isLastPage,
    lastUpdated: moment().format(),
  };

  return {
    ...state,
    [sectionKey]: updatedSession,
  };
};

const moviesReducer = (state: SectionState | undefined = initialState, action: SectionAction): SectionState => {
  switch (action.type) {
    case sectionConstants.REFRESH_SECTION_REQUEST:
      return refreshSectionRequest(state, action);
    case sectionConstants.REFRESH_SECTION_SUCCESS:
      return refreshSectionSuccess(state, action);
    case sectionConstants.FETCH_SECTION_NEXT_PAGE:
      return fetchSectionNextPage(state, action);
    case sectionConstants.FETCH_SECTION_NEXT_PAGE_SUCCESS:
      return fetchSectionNextPageSuccess(state, action);
    default:
      return state;
  }
};

export default moviesReducer;
