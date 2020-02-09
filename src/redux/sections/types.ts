import { commonSectionParams } from './reducer';

/* ------------- Section ------------- */
export type BrowseSectionId = 'trendingDaily' | 'trendingWeekly' | 'popular' | 'topRated';
export type LibrarySectionId = 'myFavorite' | 'myWatchlist';
export type SectionId = BrowseSectionId | LibrarySectionId;

export interface SectionBase {
  id: SectionId;
}

type CommonSectionParams = typeof commonSectionParams;

export interface Section extends CommonSectionParams, SectionBase {}
