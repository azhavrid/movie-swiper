import React from 'react';
import MovieDeck from './MovieDeck';
import withRefetch from '../hoc/withRefetch';
import {
  fetchMovieToExplore,
  changeMovieWatchlistStatus,
  changeMovieFavoriteStatus
} from '../../api/movies';
import { getCurrentUsersAccountId, getCurrentUsersSessionId } from '../../utils/store';
import {
  stGetExploredMovies,
  stGetCurrentMovies,
  stGetRequests,
  stSaveRequests,
  stSaveCurrentMovies,
  stSaveExploredMovies
} from '../../utils/storage';
import { movieKeyExtractor } from '../../utils/movies';

class ExploreMovieDeck extends React.PureComponent {
  state = {
    movies: []
  };

  componentDidMount = async () => {
    this.timerIds = [];
    this.isFillingExploreMovies = false;
    this.isResolvingRequests = false;

    let moviesToExplore = null;
    [moviesToExplore, this.exploredMovies, this.requests] = await Promise.all([
      stGetCurrentMovies(),
      stGetExploredMovies(),
      stGetRequests()
    ]);

    moviesToExplore = moviesToExplore || [];
    this.exploredMovies = this.exploredMovies || {};
    this.requests = this.requests || [];

    this.setState({ movies: moviesToExplore });
    this.runtimeLaunch(this.checkMoviesFullness);
    this.checkRequests();
  };

  componentWillUnmount() {
    this.timerIds.forEach(id => clearInterval(id));
  }

  onSwipedLeft = movie => {
    this.addToExplored(movie);
    this.skipTopMovie();
  };

  onSwipedTop = movie => {
    this.addRequest(movie, 'favorite');
    this.skipTopMovie();
  };

  onSwipedRight = movie => {
    this.addRequest(movie, 'watchlist');
    this.skipTopMovie();
  };

  skipTopMovie = () => {
    this.setState(
      prevState => ({ movies: prevState.movies.slice(1, prevState.movies.length) }),
      () => stSaveCurrentMovies(this.state.movies)
    );
  };

  addRequest = async (movie, type) => {
    this.requests.push({
      type,
      movie,
      accountId: getCurrentUsersAccountId(),
      sessionId: getCurrentUsersSessionId()
    });

    await stSaveRequests(this.requests);
    this.checkRequests();
  };

  addToExplored = async movie =>
    new Promise(async resolve => {
      this.exploredMovies[movieKeyExtractor(movie)] = true;
      await stSaveExploredMovies(this.exploredMovies);
      resolve();
    });

  isMovieSeen = movie => {
    const { movies } = this.state;
    const key = movieKeyExtractor(movie);
    const isInCurrentMovies = !!movies.find(cMovie => movieKeyExtractor(cMovie) === key);
    const isInRequests = !!this.requests.find(({ rqMovie }) => movieKeyExtractor(rqMovie) === key);
    const wasExplored = this.exploredMovies[key];
    return isInCurrentMovies || isInRequests || wasExplored;
  };

  checkRequests = () => {
    if (!this.isResolvingRequests && this.requests.length > 0) {
      this.isResolvingRequests = true;
      this.recursiveResolve(this.requests[0]);
    }
  };

  recursiveResolve = request => {
    const {
      refetch: { fetchUntilSuccess }
    } = this.props;

    fetchUntilSuccess(() => this.resolveRequest(request)).then(async () => {
      this.requests.splice(0, 1);
      await stSaveRequests(this.requests);
      await this.addToExplored(request.movie);

      if (this.requests.length > 0) {
        this.recursiveResolve(this.requests[0]);
      } else {
        this.isResolvingRequests = false;
      }
    });
  };

  resolveRequest = request => {
    const { type, movie, accountId, sessionId } = request;
    const rqFunction =
      type === 'watchlist' ? changeMovieWatchlistStatus : changeMovieFavoriteStatus;

    return rqFunction({ movie, watchlist: true, favorite: true, accountId, sessionId });
  };

  checkMoviesFullness = () => {
    this.state.movies.length < 10 && this.fillMoviesToExplore();
  };

  fillMoviesToExplore = async () => {
    if (this.isFillingExploreMovies) return;
    this.isFillingExploreMovies = true;

    const {
      refetch: { fetchUntilSuccess }
    } = this.props;

    const toAddMovies = await fetchUntilSuccess(() => fetchMovieToExplore(this.isMovieSeen));
    this.setState(
      prevState => ({ movies: [...prevState.movies, ...toAddMovies] }),
      () => stSaveCurrentMovies(this.state.movies)
    );
    this.isFillingExploreMovies = false;
  };

  runtimeLaunch(functionToExecute, intervalTime = 1000) {
    functionToExecute();
    this.timerIds.push(setInterval(() => functionToExecute(), intervalTime));
  }

  render() {
    const { movies } = this.state;

    return (
      <MovieDeck
        movies={movies}
        onSwipedTop={this.onSwipedTop}
        onSwipedLeft={this.onSwipedLeft}
        onSwipedRight={this.onSwipedRight}
      />
    );
  }
}

export default withRefetch(ExploreMovieDeck);
