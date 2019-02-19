import axios from 'axios';
import { getCurrentUsersSessionId, getCurrentUsersAccountId } from '../utils/store';
import {
  getAddToFavoriteUrl,
  getAddToWatchlistUrl,
  getSearchMoviesUrl,
  getFavoriteMovieUrl,
  getWatchlistUrl,
  getMovieAccountStateUrl,
  getDetailsMovieUrl,
  getMovieRecommendationsUrl,
  getPopularMoviesUrl
} from '../api/urls';
import { parseMoviesArray } from '../utils/movies';
import Config from '../Config';

// ------------------------------------------------------
// Movie details
// ------------------------------------------------------
export const fetchMovieAccountState = ({ movie }, reqParams = {}) =>
  new Promise(async (resolve, reject) => {
    const url = getMovieAccountStateUrl({
      movieId: movie.id,
      sessionId: getCurrentUsersSessionId()
    });

    try {
      const { data } = await axios.get(url, reqParams);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

export const fetchMovieDetailedInfo = ({ movie }, reqParams = {}) =>
  new Promise(async (resolve, reject) => {
    const url = getDetailsMovieUrl({ movieId: movie.id });

    try {
      const { data } = await axios.get(url, reqParams);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

export const fetchMovieRecommendations = ({ movie, page = 1 }, reqParams = {}) =>
  new Promise(async (resolve, reject) => {
    const url = getMovieRecommendationsUrl({ movieId: movie.id, page });

    try {
      const { data } = await axios.get(url, reqParams);
      addParsedMoviesToData(data);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

// ------------------------------------------------------
// Movie actions
// ------------------------------------------------------
export const changeMovieFavoriteStatus = (
  { movie, favorite, accountId, sessionId },
  reqParams = {}
) =>
  new Promise(async (resolve, reject) => {
    const postData = { media_type: 'movie', media_id: movie.id, favorite };
    const url = getAddToFavoriteUrl({
      accountId: accountId || getCurrentUsersAccountId(),
      sessionId: sessionId || getCurrentUsersSessionId()
    });

    try {
      const { data } = await axios.post(url, postData, reqParams);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

export const changeMovieWatchlistStatus = (
  { movie, watchlist, accountId, sessionId },
  reqParams = {}
) =>
  new Promise(async (resolve, reject) => {
    const postData = { media_type: 'movie', media_id: movie.id, watchlist };
    const url = getAddToWatchlistUrl({
      accountId: accountId || getCurrentUsersAccountId(),
      sessionId: sessionId || getCurrentUsersSessionId()
    });

    try {
      const { data } = await axios.post(url, postData, reqParams);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

// ------------------------------------------------------
// Movies lists
// ------------------------------------------------------
export const getSectionFetchFunctionFromUrlGetter = urlGetter => (params, reqParams) =>
  fetchSectionMovies(urlGetter, params, reqParams);
export const getSearchFetchFunctionFromQuery = query => ({ page }) =>
  fetchSearchMovies({ page, query });

export const fetchSectionMovies = (urlGetter, { page }, reqParams = {}) =>
  new Promise(async (resolve, reject) => {
    const url = urlGetter({ page });

    try {
      const { data } = await axios.get(url, reqParams);
      addParsedMoviesToData(data);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

export const fetchSearchMovies = ({ page, query }, reqParams = {}) =>
  new Promise(async (resolve, reject) => {
    const url = getSearchMoviesUrl({ page, query });

    try {
      const { data } = await axios.get(url, reqParams);
      addParsedMoviesToData(data);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

export const fetchFavoriteMovies = ({ page }, reqParams = {}) =>
  new Promise(async (resolve, reject) => {
    const url = getFavoriteMovieUrl({
      page,
      sessionId: getCurrentUsersSessionId(),
      accountId: getCurrentUsersAccountId()
    });

    try {
      const { data } = await axios.get(url, reqParams);
      addParsedMoviesToData(data);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

export const fetchWatchlistMovies = ({ page }, reqParams = {}) =>
  new Promise(async (resolve, reject) => {
    const url = getWatchlistUrl({
      page,
      sessionId: getCurrentUsersSessionId(),
      accountId: getCurrentUsersAccountId()
    });

    try {
      const { data } = await axios.get(url, reqParams);
      addParsedMoviesToData(data);
      resolve(data);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

// ------------------------------------------------------
// Explore movies
// ------------------------------------------------------
export const fetchMovieToExplore = isMovieSeen =>
  new Promise(async (resolve, reject) => {
    const moviesToExplore = [];
    const minFillAmount = 35;
    let page = 1;

    try {
      while (moviesToExplore.length < minFillAmount) {
        const { movies } = await fetchSectionMovies(getPopularMoviesUrl, { page });
        movies.forEach(movie => {
          if (!isMovieSeen(movie)) {
            moviesToExplore.push(movie);
          }
        });

        page++;
      }
      resolve(moviesToExplore);
    } catch (error) {
      Config.logNetworkErrors && console.log(error);
      reject(error);
    }
  });

// Local functions
const addParsedMoviesToData = data => (data.movies = parseMoviesArray(data.results));
