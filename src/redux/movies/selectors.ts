import memoizeOne from 'memoize-one';
import { createSelector } from 'reselect';

import { RootState } from '../types';
import { MovieId } from './types';

export const moviesSelector = (state: RootState) => state.movies;

export const getMovieSelectorById = (movieId: MovieId) => createSelector(moviesSelector, movies => movies[movieId]);

export const getMoviesSelectorByIds = memoizeOne((movieIds: MovieId[]) =>
  createSelector(moviesSelector, movies => movieIds.map(movieId => movies[movieId])),
);
