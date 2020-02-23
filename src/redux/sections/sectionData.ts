import { AxiosPromise } from 'axios';

import {
  getFavoriteMoviesApi,
  GetMovieListApiParams,
  getPopularMoviesApi,
  getTopRatedMoviesApi,
  getTrendingDailyMoviesApi,
  getTrendingWeeklyMoviesApi,
  getWatchlistMoviesApi,
  MovieListApiResponse,
} from '../../api/movies';
import { BrowseSectionKey, LibrarySectionKey, SectionKey } from './types';

/* ------------- Types ------------- */
interface SectionData {
  title: string;
  fetchFunction: (params: GetMovieListApiParams) => AxiosPromise<MovieListApiResponse>;
}

/* ------------- Data ------------- */
export const browseSectionsKeys: BrowseSectionKey[] = ['trendingDaily', 'trendingWeekly', 'popular', 'topRated'];

export const librarySectionsKeys: LibrarySectionKey[] = ['myWatchlist', 'myFavorite'];

export const sectionData: Record<SectionKey, SectionData> = {
  trendingDaily: { title: 'Trending Daily', fetchFunction: getTrendingDailyMoviesApi },
  trendingWeekly: { title: 'Trending Weekly', fetchFunction: getTrendingWeeklyMoviesApi },
  popular: { title: 'Popular', fetchFunction: getPopularMoviesApi },
  topRated: { title: 'Top Rated', fetchFunction: getTopRatedMoviesApi },
  myFavorite: { title: 'My Favorite', fetchFunction: getFavoriteMoviesApi },
  myWatchlist: { title: 'My Watchlist', fetchFunction: getWatchlistMoviesApi },
};
