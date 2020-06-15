import { MovieApiResponse } from '../../api/types';
import { normalizeMovies } from '../../utils/movies';
import StoreService from '../StoreService';
import { addMovies } from './actions';

export const normalizeAndAddMovies = (moviesResponse: MovieApiResponse[]) => {
  const movies = normalizeMovies(moviesResponse);
  const movieIds = movies.map(movie => movie.id);
  StoreService.dispatch(addMovies(movies));
  return { normalizedMovies: movies, movieIds };
};
