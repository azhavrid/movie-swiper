import React from 'react';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';

import { exploreMoviesLoadRequest, exploreMovieSwiped } from '../../redux/explore/actions';
import { exploreMovieIdsWithLoadedPosterSelector } from '../../redux/explore/selectors';
import { RootState } from '../../redux/types';
import MovieDeck from './MovieDeck';

/* ------------- Props and State ------------- */
type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type Props = ReduxProps;

/* ------------- Component ------------- */
class ExploreMovieDeck extends React.PureComponent<Props> {
  componentDidMount() {
    const { exploreMoviesLoadRequest } = this.props;
    exploreMoviesLoadRequest();
  }

  onDidFocus = () => {
    const { exploreMoviesLoadRequest } = this.props;
    exploreMoviesLoadRequest();
  };

  onSwipedLeft = () => {
    const { exploreMovieSwiped } = this.props;
    exploreMovieSwiped('left');
  };

  onSwipedTop = () => {
    const { exploreMovieSwiped } = this.props;
    exploreMovieSwiped('top');
  };

  onSwipedRight = () => {
    const { exploreMovieSwiped } = this.props;
    exploreMovieSwiped('right');
  };

  render() {
    const { movieIds } = this.props;

    return (
      <>
        <MovieDeck
          movieIds={movieIds}
          onSwipedTop={this.onSwipedTop}
          onSwipedLeft={this.onSwipedLeft}
          onSwipedRight={this.onSwipedRight}
        />
        <NavigationEvents onDidFocus={this.onDidFocus} />
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  movieIds: exploreMovieIdsWithLoadedPosterSelector(state),
});

const mapDispatchToProps = {
  exploreMovieSwiped,
  exploreMoviesLoadRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreMovieDeck);
