import { MovieApiResponse, MovieDetailed } from '../../api/types';

/* ------------- Movie ------------- */
export type MovieId = number;
export type MovieStatusType = 'watchlist' | 'favorite';

export type MovieApiKey = keyof MovieApiResponse;
export type MovieRequiredProps = Required<
  Pick<MovieApiResponse, 'id' | 'title' | 'overview' | 'release_date' | 'poster_path' | 'backdrop_path'>
>;
export type MovieRequiredPropsKey = keyof MovieRequiredProps;
export type MovieNotRequiredProps = Omit<MovieApiResponse, MovieRequiredPropsKey>;
export type MovieNotRequiredPropsKey = keyof MovieNotRequiredProps;

export type ParsedMovie = MovieRequiredProps & MovieNotRequiredProps;

export interface NormalizedMovieProps {
  year: string;
}

export interface MovieStoreProps {
  isFetching: boolean;
  isWatchlistPending: boolean;
  isInWatchlist: boolean;
  isFavoritesPending: boolean;
  isInFavorites: boolean;
  movieDetailed?: MovieDetailed;
  recommendations?: MovieId[];
}

export interface Movie extends ParsedMovie, NormalizedMovieProps, MovieStoreProps {}

/* ------------- Params ------------- */
export interface MovieIdParam {
  movieId: MovieId;
}
