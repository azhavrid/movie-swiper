import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { AppText } from '../common';
import { getFontStyleObject } from '../../utils/font';
import Theme from '../../Theme';

class MovieUserScore extends React.Component {
  getScoreColorStyle(score) {
    const { success, danger, warning } = Theme.colors;
    const color = score > 7 ? success : score > 5 ? warning : danger;
    return { color };
  }

  render() {
    const { movie, style, ...props } = this.props;
    const score = movie.vote_average;
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
    ...getFontStyleObject({ weight: 'Bold' })
  }
});

MovieUserScore.propTypes = {
  movie: PropTypes.object.isRequired,
  style: PropTypes.any
};

export default MovieUserScore;
