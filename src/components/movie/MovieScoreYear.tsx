import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import MovieUserScore from './MovieUserScore';
import { AppText } from '../common';
import { theme } from '../../theme';

/* ------------- Props and State ------------- */
type Props = {
  score: number;
  year: string;
  style?: ViewStyle;
};

/* ------------- Class ------------- */
const MovieScoreYear: React.FC<Props> = ({ score, year, style }) => (
  <View style={[styles.container, style]}>
    <MovieUserScore style={styles.score} score={score} />
    <AppText style={styles.year}>{year}</AppText>
  </View>
);

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
