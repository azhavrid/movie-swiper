import { commonSectionParams } from './reducer';

/* ------------- Section ------------- */
export type BrowseSectionKey = 'trendingDaily' | 'trendingWeekly' | 'popular' | 'topRated';
export type LibrarySectionKey = 'myFavorite' | 'myWatchlist';
export type SectionKey = BrowseSectionKey | LibrarySectionKey;

export interface SectionBase {
  id: SectionKey;
}

type CommonSectionParams = typeof commonSectionParams;

export interface Section extends CommonSectionParams, SectionBase {}
