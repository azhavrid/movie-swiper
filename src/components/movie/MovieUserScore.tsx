import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { AppText } from '../common';
import { getFontStyle } from '../../utils/fonts';
import { theme } from '../../theme';
import { Movie } from '../../redux/movies/types';

/* ------------- Props and State ------------- */
type Props = {
  movie: Movie;
  style?: ViewStyle;
};

/* ------------- Class ------------- */
class MovieUserScore extends React.Component<Props> {
  getScoreColorStyle(score: number) {
    const { success, danger, warning } = theme.colors;
    const color = score > 7 ? success : score > 5 ? warning : danger;
    return { color };
  }

  render() {
    const { movie, style, ...props } = this.props;
    const score = movie.vote_average;

    // Do not render score if there is not enough info
    if (!score || score === 0) return null;

    return (
      <AppText style={[styles.text, this.getScoreColorStyle(score), style]} {...props}>
        {`${score} User Score`}
      </AppText>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    ...getFontStyle({ weight: 'Bold' }),
  },
});

export default MovieUserScore;
