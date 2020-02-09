import { createSelector } from 'reselect';
import { RootState } from '../types';
import { MovieId } from './types';

export const moviesSelector = (state: RootState) => state.movies;

export const getMovieSelectorById = (movieId: MovieId) => createSelector(moviesSelector, movies => movies[movieId]);
