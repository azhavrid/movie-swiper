import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import Deck from '../Deck';
import InfoAbsoluteBlock from '../InfoAbsoluteBlock';
import CircleLoadingIndicator from '../CircleLoadingIndicator';
import MovieCard from './MovieCard';
import MovieSwipeImageLabel from './MovieSwipeImageLabel';
import withRefetch from '../hoc/withRefetch';
import { getW780ImageUrl } from '../../api/urls';
import { prefetchImage } from '../../utils/network';
import { movieKeyExtractor } from '../../utils/movies';
import Theme from '../../Theme';

class MovieDeck extends React.PureComponent {
  state = {
    loadedCount: 0
  };

  componentDidMount() {
    this.loadingId = 0;
    this.toLoadMovies = [];
    this.loadedMoviesIds = {};
    this.startMoviesLoading();
  }

  componentWillUpdate(nextProps) {
    if (this.props.movies !== nextProps.movies) {
      this.updateMoviesLoading(nextProps.movies);
      this.startMoviesLoading(nextProps.movies);
    }
  }

  startMoviesLoading(movies) {
    this.fillToLoadMovies(movies);
    this.recursiveImageLoad(this.toLoadMovies[0]);
  }

  updateMoviesLoading(movies) {
    this.loadingId++;

    const newLoadedImagesIds = {};
    for (let i = 0; i < movies.length; i++) {
      const movie = movies[i];
      const key = movieKeyExtractor(movie);
      if (!this.loadedMoviesIds[key]) break;
      newLoadedImagesIds[key] = true;
    }
    this.loadedMoviesIds = newLoadedImagesIds;

    const loadedCount = Object.keys(newLoadedImagesIds).length;
    this.setState({ loadedCount });
  }

  fillToLoadMovies(forceMovies) {
    const { movies } = this.props;
    const currentMovies = forceMovies || movies;

    this.toLoadMovies = currentMovies.filter(
      movie => !this.loadedMoviesIds[movieKeyExtractor(movie)]
    );
  }

  recursiveImageLoad = movie => {
    const {
      refetch: { fetchUntilSuccess }
    } = this.props;
    const { loadedCount } = this.state;

    if (movie && loadedCount < 12) {
      const moviePosterUrl = getW780ImageUrl(movie.poster_path);
      const loadingId = this.loadingId;

      fetchUntilSuccess(() => prefetchImage(moviePosterUrl)).then(() => {
        if (loadingId !== this.loadingId) return;

        this.loadedMoviesIds[movieKeyExtractor(movie)] = true;
        this.toLoadMovies.splice(0, 1);
        this.setState(prevState => ({ loadedCount: prevState.loadedCount + 1 }));
        this.recursiveImageLoad(this.toLoadMovies[0]);
      });
    }
  };

  renderNoMoreCards = () => (
    <InfoAbsoluteBlock
      Icon={<CircleLoadingIndicator color={Theme.gray.lightest} />}
      text="Loading Movies"
      subtext="Please wait"
    />
  );

  renderMovieCard = (movie, isTopCard) => (
    <MovieCard movie={movie} disabled={!isTopCard} sourceUrlGetter={getW780ImageUrl} />
  );

  renderCardSwipeLabels = ({ toLeftOpacity, toRightOpacity, toTopOpacity }) => {
    const horizontalMargin = 40;
    const verticalMargin = 60;
    const rotationDegrees = 15;

    return (
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {/* Opacity has to be applied on Animated.View wrapper */}
        <Animated.View style={{ opacity: toRightOpacity }}>
          <MovieSwipeImageLabel
            style={{
              top: verticalMargin,
              left: horizontalMargin,
              transform: [{ rotate: `-${rotationDegrees}deg` }]
            }}
            type="save"
          />
        </Animated.View>
        <Animated.View style={{ opacity: toLeftOpacity }}>
          <MovieSwipeImageLabel
            style={{
              top: verticalMargin,
              right: horizontalMargin,
              transform: [{ rotate: `${rotationDegrees}deg` }]
            }}
            type="skip"
          />
        </Animated.View>
        <Animated.View style={{ opacity: toTopOpacity, flex: 1 }}>
          <MovieSwipeImageLabel
            style={{
              alignSelf: 'center',
              bottom: verticalMargin * 1.5
            }}
            type="like"
          />
        </Animated.View>
      </View>
    );
  };

  render() {
    const { loadedCount } = this.state;
    const { movies, ...props } = this.props;
    const sliceLength = Math.min(loadedCount, 2);
    const loadedMovies = movies.slice(0, sliceLength);

    return (
      <Deck
        data={loadedMovies}
        style={styles.deck}
        useDeckIndex={false}
        renderCard={this.renderMovieCard}
        renderCardSwipeLabels={this.renderCardSwipeLabels}
        renderNoMoreCards={this.renderNoMoreCards}
        keyExtractor={movieKeyExtractor}
        {...props}
      />
    );
  }
}

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    margin: 14
  }
});

export default withRefetch(MovieDeck);
