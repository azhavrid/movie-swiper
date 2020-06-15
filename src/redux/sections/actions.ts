import moment from 'moment';

import { MovieId } from '../movies/types';
import * as sectionConstants from './constants';
import { SectionKey } from './types';

/* ------------- Types ------------- */
export interface RefreshSectionRequest extends ReturnType<typeof refreshSectionRequest> {}
export interface RefreshSectionSuccess extends ReturnType<typeof refreshSectionSuccess> {}
export interface FetchSectionNextPageRequest extends ReturnType<typeof fetchSectionNextPageRequest> {}
export interface FetchSectionNextPage extends ReturnType<typeof fetchSectionNextPage> {}
export interface FetchSectionNextPageSuccess extends ReturnType<typeof fetchSectionNextPageSuccess> {}

export type SectionAction =
  | RefreshSectionRequest
  | RefreshSectionSuccess
  | FetchSectionNextPageRequest
  | FetchSectionNextPage
  | FetchSectionNextPageSuccess;

interface SuccessSectionFetchParams {
  sectionKey: SectionKey;
  movieIds: MovieId[];
  isLastPage: boolean;
}

/* ------------- Actions ------------- */
export const refreshSectionRequest = (sectionKey: SectionKey) =>
  <const>{
    type: sectionConstants.REFRESH_SECTION_REQUEST,
    sectionKey,
  };

export const refreshSectionSuccess = (params: SuccessSectionFetchParams) =>
  <const>{
    type: sectionConstants.REFRESH_SECTION_SUCCESS,
    ...params,
  };

export const fetchSectionNextPageRequest = (sectionKey: SectionKey) =>
  <const>{
    type: sectionConstants.FETCH_SECTION_NEXT_PAGE_REQUEST,
    sectionKey,
  };

export const fetchSectionNextPage = (sectionKey: SectionKey) =>
  <const>{
    type: sectionConstants.FETCH_SECTION_NEXT_PAGE,
    sectionKey,
    requestTime: moment(),
  };

export const fetchSectionNextPageSuccess = (params: SuccessSectionFetchParams) =>
  <const>{
    type: sectionConstants.FETCH_SECTION_NEXT_PAGE_SUCCESS,
    ...params,
  };
