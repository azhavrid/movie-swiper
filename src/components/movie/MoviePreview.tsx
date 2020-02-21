import React from 'react';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import FastImage from 'react-native-fast-image';
import { View, StyleSheet, Dimensions } from 'react-native';
import uuid from 'uuid';
import { TouchableScale, AppText } from '../common';
import { routeNames } from '../../routes/routeNames';
import { theme } from '../../theme';
import { getW185ImageUrl } from '../../api/urls';
import { MovieDetailsScreenNavigationParams } from '../../screens/movie/MovieDetailsScreen';
import { RootState } from '../../redux/types';
import { getMovieSelectorById } from '../../redux/movies/selectors';
import { connect } from 'react-redux';
import { MovieId } from '../../redux/movies/types';
import { isGoodMovieRating } from '../../utils/movies';

/* ------------- Local ------------- */
const { width } = Dimensions.get('window');
const previewWidth = width * 0.27;
export const getMoviePreviewHeight = () => previewWidth / theme.specifications.posterAspectRation;

/* ------------- Props and State ------------- */
export type OwnProps = {
  movieId?: MovieId;
  highPriority?: boolean;
  withRatingBadge?: boolean;
};

type MapStateToProps = ReturnType<typeof makeMapStateToProps>;
type ReduxProps = ReturnType<MapStateToProps> & typeof mapDispatchToProps;
type PropsWithoutRedux = OwnProps & NavigationInjectedProps;
type Props = PropsWithoutRedux & ReduxProps;

/* ------------- Class ------------- */
class MoviePreview extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    return this.props.movieId !== nextProps.movieId;
  }

  onPress = () => {
    const { navigation, movieId } = this.props;
    if (!movieId) return;

    const params: MovieDetailsScreenNavigationParams = { movieId };
    navigation.navigate({ routeName: routeNames.MovieDetailsScreen, params, key: `${movieId}_${uuid.v4()}` });
  };

  renderRatingBadge = () => {
    const { movie } = this.props;
    const { vote_average } = movie;
    const badgeColor = isGoodMovieRating(vote_average) ? theme.colors.success : theme.gray.light;

    return (
      vote_average && (
        <View style={[styles.ratingBadge, { backgroundColor: badgeColor }]}>
          <AppText type="caption2">{vote_average.toFixed(1)}</AppText>
        </View>
      )
    );
  };

  renderMoviePreview() {
    const { movie, highPriority, withRatingBadge } = this.props;
    if (!movie) return;

    const priority = highPriority ? FastImage.priority.high : FastImage.priority.normal;
    return (
      <>
        <FastImage style={styles.image} source={{ uri: getW185ImageUrl(movie.poster_path), priority }} />
        {withRatingBadge && this.renderRatingBadge()}
      </>
    );
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
    marginHorizontal: theme.spacing.tiny,
  },
  image: {
    width: previewWidth,
    aspectRatio: theme.specifications.posterAspectRation,
    borderRadius: 8,
    backgroundColor: theme.colors.transparentBlack,
  },
  ratingBadge: {
    position: 'absolute',
    left: -6,
    top: '15%',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
});

const makeMapStateToProps = (state: RootState, props: PropsWithoutRedux) => {
  const { movieId } = props;
  const movieSelector = getMovieSelectorById(movieId);

  return (state: RootState) => ({
    movieId,
    movie: movieSelector(state),
  });
};

const mapDispatchToProps = {};

export default withNavigation(connect(makeMapStateToProps, mapDispatchToProps)(MoviePreview));
