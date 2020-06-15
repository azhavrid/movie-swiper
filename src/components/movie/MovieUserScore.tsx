import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';

import { getFontStyle } from '../../utils/fonts';
import { getMovieScoreColor } from '../../utils/movies';
import { AppText } from '../common';

/* ------------- Props and State ------------- */
type Props = {
  score: number;
  style?: ViewStyle;
};

/* ------------- Component ------------- */
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
