import * as exploreActions from './constants';
import { SwipeDirection } from '../../components/Deck';
import { MovieId } from '../movies/types';

/* ------------- Types ------------- */
export interface ExploreMoviesLoadRequest extends ReturnType<typeof exploreMoviesLoadRequest> {}
export interface ExploreMoviesLoad extends ReturnType<typeof exploreMoviesLoad> {}
export interface ExploreMoviesLoadSuccess extends ReturnType<typeof exploreMoviesLoadSuccess> {}
export interface ExploreMovieSwiped extends ReturnType<typeof exploreMovieSwiped> {}
export interface ExploreActionResolved extends ReturnType<typeof exploreActionResolved> {}

export type ExploreAction =
  | ExploreMoviesLoadRequest
  | ExploreMoviesLoad
  | ExploreMoviesLoadSuccess
  | ExploreMovieSwiped
  | ExploreActionResolved;

/* ------------- Actions ------------- */
export const exploreMoviesLoadRequest = () =>
  <const>{
    type: exploreActions.EXPLORE_MOVIES_LOAD_REQUEST,
  };

export const exploreMoviesLoad = () =>
  <const>{
    type: exploreActions.EXPLORE_MOVIES_LOAD,
  };

export const exploreMoviesLoadSuccess = (movieIds: MovieId[]) =>
  <const>{
    type: exploreActions.EXPLORE_MOVIES_LOAD_SUCCESS,
    movieIds,
  };

export const exploreMovieSwiped = (swipeDirection: SwipeDirection) =>
  <const>{
    type: exploreActions.EXPLORE_MOVIE_SWIPED,
    swipeDirection,
  };

export const exploreActionResolved = (id: string) =>
  <const>{
    type: exploreActions.EXPLORE_ACTION_RESOLVED,
    id,
  };
