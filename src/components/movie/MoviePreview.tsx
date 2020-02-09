import React from 'react';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import FastImage from 'react-native-fast-image';
import { View, StyleSheet, Dimensions } from 'react-native';
import uuid from 'uuid';
import { TouchableScale } from '../common';
// import MovieDetailsScreen from '../../screens/Movie/MovieDetailsScreen';
import { routeNames } from '../../routes/routeNames';
// import { getW185ImageUrl } from '../../api/urls';
import { theme } from '../../theme';
import { getW185ImageUrl } from '../../api/urls';
import { MovieDetailsScreenNavigationParams } from '../../screens/movie/MovieDetailsScreen';
import { RootState } from '../../redux/types';
import { getMovieSelectorById } from '../../redux/movies/selectors';
import { connect } from 'react-redux';
import { MovieId } from '../../redux/movies/types';

/* ------------- Local ------------- */
const { width } = Dimensions.get('window');
const previewWidth = width * 0.27;
export const getMoviePreviewHeight = () => previewWidth / theme.specifications.posterAspectRation;

/* ------------- Props and State ------------- */
type OwnProps = {
  movieId?: MovieId;
  highPriority?: boolean;
};

type MapStateToProps = ReturnType<typeof makeMapStateToProps>;
type ReduxProps = ReturnType<MapStateToProps> & typeof mapDispatchToProps;
type PropsWithoutRedux = OwnProps & NavigationInjectedProps;
type Props = PropsWithoutRedux & ReduxProps;

/* ------------- Class ------------- */
class MoviePreview extends React.PureComponent<Props> {
  onPress = () => {
    const { navigation, movieId } = this.props;
    if (!movieId) return;

    const params: MovieDetailsScreenNavigationParams = { movieId };
    navigation.navigate({ routeName: routeNames.MovieDetailsScreen, params, key: `${movieId}_${uuid.v4()}` });
  };

  renderMoviePreview() {
    const { movie, highPriority } = this.props;
    if (!movie) return;

    const priority = highPriority ? FastImage.priority.high : FastImage.priority.normal;
    return <FastImage style={styles.image} source={{ uri: getW185ImageUrl(movie.poster_path), priority }} />;
  }

  renderEmptyMoviePreview = () => <View style={styles.image} />;

  render() {
    const { movieId } = this.props;
    return (
      <TouchableScale disabled={!movieId} scaleFactor={0.97} style={styles.container} onPress={this.onPress}>
        {movieId ? this.renderMoviePreview() : this.renderEmptyMoviePreview()}
      </TouchableScale>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.tiny,
  },
  image: {
    width: previewWidth,
    aspectRatio: theme.specifications.posterAspectRation,
    borderRadius: 8,
    backgroundColor: theme.colors.transparentBlack,
  },
});

const makeMapStateToProps = (state: RootState, props: PropsWithoutRedux) => {
  const movieId = props.movieId;
  const movieSelector = getMovieSelectorById(movieId);

  return (state: RootState) => ({
    movieId,
    movie: movieSelector(state),
  });
};

const mapDispatchToProps = {};

export default withNavigation(connect(makeMapStateToProps, mapDispatchToProps)(MoviePreview));
