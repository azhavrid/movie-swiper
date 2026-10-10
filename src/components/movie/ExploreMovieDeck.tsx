import React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { connect } from 'react-redux';

import { exploreMoviesLoadRequest, exploreMovieSwiped } from '../../redux/explore/actions';
import { exploreMovieIdsWithLoadedPosterSelector } from '../../redux/explore/selectors';
import { RootState } from '../../redux/types';
import MovieDeck from './MovieDeck';

type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type Props = ReduxProps;

class ExploreMovieDeck extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.exploreMoviesLoadRequest();
  }

  onSwipedLeft = () => this.props.exploreMovieSwiped('left');
  onSwipedTop = () => this.props.exploreMovieSwiped('top');
  onSwipedRight = () => this.props.exploreMovieSwiped('right');

  render() {
    const { movieIds } = this.props;

    return (
      <MovieDeck
        movieIds={movieIds}
        onSwipedTop={this.onSwipedTop}
        onSwipedLeft={this.onSwipedLeft}
        onSwipedRight={this.onSwipedRight}
      />
    );
  }
}

const ExploreMovieDeckWithFocus = (props: Props) => {
  useFocusEffect(
    React.useCallback(() => {
      props.exploreMoviesLoadRequest();
    }, [props.exploreMoviesLoadRequest]),
  );

  return <ExploreMovieDeck {...props} />;
};

const mapStateToProps = (state: RootState) => ({
  movieIds: exploreMovieIdsWithLoadedPosterSelector(state),
});

const mapDispatchToProps = {
  exploreMoviesLoadRequest,
  exploreMovieSwiped,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreMovieDeckWithFocus);
