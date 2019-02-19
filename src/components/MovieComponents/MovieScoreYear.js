import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import MovieUserScore from './MovieUserScore';
import { AppText } from '../common';
import Theme from '../../Theme';

class MovieScoreYear extends React.Component {
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
    flexDirection: 'row'
  },
  score: {
    marginRight: Theme.spacing.tiny
  },
  year: {
    color: Theme.gray.lighter
  }
});

MovieScoreYear.propTypes = {
  movie: PropTypes.object.isRequired,
  style: PropTypes.any
};

export default MovieScoreYear;
