import { AxiosPromise } from 'axios';
import {
  MovieListApiResponse,
  getTrendingDailyMoviesApi,
  getTrendingWeeklyMoviesApi,
  getPopularMoviesApi,
  getTopRatedMoviesApi,
  getFavoriteMoviesApi,
  getWatchlistMoviesApi,
  GetMovieListApiParams,
} from '../../api/movies';
import { SectionId, BrowseSectionId, LibrarySectionId } from './types';

/* ------------- Types ------------- */
interface SectionData {
  title: string;
  fetchFunction: (params: GetMovieListApiParams) => AxiosPromise<MovieListApiResponse>;
}

/* ------------- Data ------------- */
export const browseSectionsKeys: BrowseSectionId[] = ['trendingDaily', 'trendingWeekly', 'popular', 'topRated'];

export const librarySectionsKeys: LibrarySectionId[] = ['myWatchlist', 'myFavorite'];

export const sectionData: Record<SectionId, SectionData> = {
  trendingDaily: { title: 'Trending Daily', fetchFunction: getTrendingDailyMoviesApi },
  trendingWeekly: { title: 'Trending Weekly', fetchFunction: getTrendingWeeklyMoviesApi },
  popular: { title: 'Popular', fetchFunction: getPopularMoviesApi },
  topRated: { title: 'Top Rated', fetchFunction: getTopRatedMoviesApi },
  myFavorite: { title: 'My Favorite', fetchFunction: getFavoriteMoviesApi },
  myWatchlist: { title: 'My Watchlist', fetchFunction: getWatchlistMoviesApi },
};
