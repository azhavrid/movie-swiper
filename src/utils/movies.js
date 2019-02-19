export const movieKeyExtractor = movie => movie.id.toString();

export const parseMoviesArray = movies =>
  movies.filter(movie => isEnoughInfo(movie)).map(movie => parseMovie(movie));

export const filterDuplicateMovies = movies =>
  movies.filter(
    (movie, index) =>
      index === movies.findIndex(m => movieKeyExtractor(m) === movieKeyExtractor(movie))
  );

// Local functions
const parseMovie = movie => ({ ...movie, year: movie.release_date.substr(0, 4) });

const movieRequiredProps = ['release_date', 'title', 'poster_path', 'backdrop_path', 'overview'];
const isEnoughInfo = movie => {
  let isCorrect = true;
  movieRequiredProps.forEach(prop => {
    if (!movie[prop]) {
      isCorrect = false;
      return;
    }
  });
  return isCorrect;
};
