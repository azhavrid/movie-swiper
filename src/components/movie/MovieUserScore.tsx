import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { AppText } from '../common';
import { getFontStyle } from '../../utils/fonts';
import { getMovieScoreColor } from '../../utils/movies';

/* ------------- Props and State ------------- */
type Props = {
  score: number;
  style?: ViewStyle;
};

/* ------------- Class ------------- */
const MovieUserScore: React.FC<Props> = ({ score, style, ...props }) => {
  if (!score || score === 0) return null;

  return (
    <AppText style={[styles.text, { color: getMovieScoreColor(score) }, style]} {...props}>
      {`${score} User Score`}
    </AppText>
  );
};

const styles = StyleSheet.create({
  text: {
    ...getFontStyle({ weight: 'Bold' }),
  },
});

export default MovieUserScore;
