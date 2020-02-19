import React from 'react';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import FastImage from 'react-native-fast-image';
import { View, StyleSheet } from 'react-native';
import MovieScoreYear from './MovieScoreYear';
import { AppText, TouchableHighlightView } from '../common';
import { getW185ImageUrl } from '../../api/urls';
import { routeNames } from '../../routes/routeNames';
import { theme } from '../../theme';
import { MovieDetailsScreenNavigationParams } from '../../screens/movie/MovieDetailsScreen';
import { getMovieSelectorById } from '../../redux/movies/selectors';
import { RootState } from '../../redux/types';
import { connect } from 'react-redux';
import { MovieId } from '../../redux/movies/types';

/* ------------- Props and State ------------- */
type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type OwnProps = {
  movieId: MovieId;
};
type Props = OwnProps & ReduxProps & NavigationInjectedProps;

/* ------------- Class ------------- */
class MovieInlinePreview extends React.Component<Props> {
  shouldComponentUpdate() {
    // Never update for performance optimization
    return false;
  }

  onInlinePreviewPress = () => {
    const { navigation, movieId } = this.props;
    const params: MovieDetailsScreenNavigationParams = { movieId };
    navigation.navigate(routeNames.MovieDetailsScreen, params);
  };

  render() {
    const { movie } = this.props;
    const { title, year, vote_average, poster_path } = movie;

    return (
      <TouchableHighlightView scaleFactor={0.98} contentStyle={styles.container} onPress={this.onInlinePreviewPress}>
        <FastImage style={styles.posterImage} source={{ uri: getW185ImageUrl(poster_path) }} />
        <View style={styles.textWrapper}>
          <AppText type="headline" numberOfLines={1} style={styles.title}>
            {title}
          </AppText>
          <MovieScoreYear score={vote_average} year={year} />
        </View>
      </TouchableHighlightView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 96,
    paddingVertical: theme.spacing.xTiny,
  },
  posterImage: {
    height: '100%',
    aspectRatio: theme.specifications.posterAspectRation,
    marginHorizontal: theme.spacing.tiny,
    backgroundColor: theme.gray.dark,
    borderRadius: 2,
  },
  textWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    width: '95%',
  },
});

const mapStateToProps = (state: RootState, props: OwnProps) => ({
  movie: getMovieSelectorById(props.movieId)(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(MovieInlinePreview));
