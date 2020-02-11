import StoreService from '../StoreService';
import { addMovies } from './actions';
import { normalizeMovies } from '../../utils/movies';
import { MovieApiResponse } from '../../api/types';

export const normalizeAndAddMovies = (moviesResponse: MovieApiResponse[]) => {
  const movies = normalizeMovies(moviesResponse);
  const movieIds = movies.map(movie => movie.id);
  StoreService.dispatch(addMovies(movies));
  return { normalizedMovies: movies, movieIds };
};
