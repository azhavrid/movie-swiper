import { MovieIdParam, MovieStatusType } from '../redux/movies/types';
import api from './api';
import { MovieApiResponse, MovieDetailed, PageParam, RatedValue, UserIdsParams } from './types';
import { withKey } from './urls';

/* ------------- Types ------------- */
export interface GetMovieAccountStateApiResponse {
  id: number;
  favorite: boolean;
  rated: RatedValue | boolean;
  watchlist: boolean;
}
export interface GetMovieListApiParams extends PageParam, UserIdsParams {}

export interface MovieListApiResponse {
  page: number;
  results: MovieApiResponse[];
  total_pages: number;
  total_results: number;
}

export interface ChangeMovieStatusApiParams extends MovieIdParam, UserIdsParams {
  statusType: MovieStatusType;
  status: boolean;
}

export interface ChangeMovieStatusStatusApiResponse {
  status_code: number;
  status_message: string;
}

/* ------------- Api ------------- */
export const getMovieAccountStateApi = ({ movieId, sessionId }: MovieIdParam & UserIdsParams) =>
  api.get<GetMovieAccountStateApiResponse>(withKey(`/movie/${movieId}/account_states`) + `&session_id=${sessionId}`);

export const getMovieDetailsApi = ({ movieId }: MovieIdParam) => api.get<MovieDetailed>(withKey(`/movie/${movieId}`));

export const getMovieRecommendationsApi = ({ movieId, page }: MovieIdParam & PageParam) =>
  api.get<MovieListApiResponse>(`${withKey(`/movie/${movieId}/recommendations`)}&page=${page}`);

export const changeMovieStatusApi = (params: ChangeMovieStatusApiParams) => {
  const { movieId, statusType, status, accountId, sessionId } = params;
  const postData = { media_type: 'movie', media_id: movieId, [statusType]: status };

  return api.post<ChangeMovieStatusStatusApiResponse>(
    `${withKey(`/account/${accountId}/${statusType}`)}&session_id=${sessionId}`,
    postData,
  );
};

export const getMoviesBySearchQueryApi = ({ query, page }: { query: string } & PageParam) =>
  api.get<MovieListApiResponse>(`${withKey('/search/movie')}&page=${page}&query=${query}`);

export const getFavoriteMoviesApi = ({ page, accountId, sessionId }: GetMovieListApiParams) =>
  api.get<MovieListApiResponse>(
    `${withKey(`/account/${accountId}/favorite/movies`)}&session_id=${sessionId}&page=${page}`,
  );

export const getWatchlistMoviesApi = ({ page, accountId, sessionId }: GetMovieListApiParams) =>
  api.get<MovieListApiResponse>(
    `${withKey(`/account/${accountId}/watchlist/movies`)}&session_id=${sessionId}&page=${page}`,
  );

export const getPopularMoviesApi = ({ page }: GetMovieListApiParams) =>
  api.get<MovieListApiResponse>(`${withKey('/movie/popular')}&page=${page}`);

export const getTopRatedMoviesApi = ({ page }: GetMovieListApiParams) =>
  api.get<MovieListApiResponse>(`${withKey('/movie/top_rated')}&page=${page}`);

export const getTrendingDailyMoviesApi = ({ page }: GetMovieListApiParams) =>
  api.get<MovieListApiResponse>(`${withKey('/trending/movie/day')}&page=${page}`);

export const getTrendingWeeklyMoviesApi = ({ page }: GetMovieListApiParams) =>
  api.get<MovieListApiResponse>(`${withKey('/trending/movie/week')}&page=${page}`);
