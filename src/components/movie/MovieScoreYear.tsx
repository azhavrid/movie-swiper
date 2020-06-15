import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { theme } from '../../theme';
import { AppText } from '../common';
import MovieUserScore from './MovieUserScore';

/* ------------- Props and State ------------- */
type Props = {
  score: number;
  year: string;
  style?: ViewStyle;
};

/* ------------- Component ------------- */
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
