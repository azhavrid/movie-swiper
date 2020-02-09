import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import MovieUserScore from './MovieUserScore';
import { AppText } from '../common';
import { theme } from '../../theme';
import { Movie } from '../../redux/movies/types';

/* ------------- Props and State ------------- */
type Props = {
  movie: Movie;
  style?: ViewStyle;
};

/* ------------- Class ------------- */
class MovieScoreYear extends React.Component<Props> {
  render() {
    const { movie, style } = this.props;

    return (
      <View style={[styles.container, style]}>
        <MovieUserScore style={styles.score} movie={movie} />
        <AppText style={styles.year}>{movie.year}</AppText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  score: {
    marginRight: theme.spacing.tiny,
  },
  year: {
    color: theme.gray.lighter,
  },
});

export default MovieScoreYear;
