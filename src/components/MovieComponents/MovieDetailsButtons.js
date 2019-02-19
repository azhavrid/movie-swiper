import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { IconButton } from '../common';
import withRefetch from '../hoc/withRefetch';
import { getImdbLink } from '../../api/urls';
import { safeOpenURL } from '../../utils/network';
import { getAddToWatchlistIcon, getAddToFavoritesIcon, getOpenImdbIcon } from '../../utils/icons';
import {
  fetchMovieAccountState,
  changeMovieFavoriteStatus,
  changeMovieWatchlistStatus
} from '../../api/movies';
import Theme from '../../Theme';

class MovieDetailsButtons extends React.PureComponent {
  state = {
    inWatchlist: false,
    isWatchlistFetching: false,
    inFavorite: false,
    isFavoriteFetching: false
  };

  componentDidMount() {
    // eslint-disable-next-line
    requestAnimationFrame(() => this.initialMovieFetch());
  }

  onAddToWatchlist = async () => {
    const { movie, refetch } = this.props;
    const { inWatchlist } = this.state;

    this.setState({ inWatchlist: !inWatchlist, isWatchlistFetching: true });
    try {
      await refetch.fetchSafe(() => changeMovieWatchlistStatus({ movie, watchlist: !inWatchlist }));
      this.setState({ inWatchlist: !inWatchlist });
    } catch (e) {
      this.setState({ inWatchlist });
    } finally {
      this.setState({ isWatchlistFetching: false });
    }
  };

  onAddToFavorites = async () => {
    const { movie, refetch } = this.props;
    const { inFavorite } = this.state;

    this.setState({ inFavorite: !inFavorite, isFavoriteFetching: true });
    try {
      await refetch.fetchSafe(() => changeMovieFavoriteStatus({ movie, favorite: !inFavorite }));
      this.setState({ inFavorite: !inFavorite });
    } catch (e) {
      this.setState({ inFavorite });
    } finally {
      this.setState({ isFavoriteFetching: false });
    }
  };

  initialMovieFetch() {
    const { movie, user, refetch } = this.props;
    if (user.isGuest) return;

    refetch
      .fetchUntilSuccess(() => fetchMovieAccountState({ movie }))
      .then(({ favorite, watchlist }) => {
        this.setState({ inWatchlist: watchlist, inFavorite: favorite });
      });
  }

  openImdb = () => {
    const { detailedMovie } = this.props;
    safeOpenURL(getImdbLink(detailedMovie.imdb_id));
  };

  render() {
    const { detailedMovie, user } = this.props;
    const { inWatchlist, inFavorite, isFavoriteFetching, isWatchlistFetching } = this.state;
    const isAuthenticated = !user.isGuest;
    const imdbDisabled = !detailedMovie;

    return (
      <View style={styles.container}>
        {isAuthenticated && (
          <IconButton
            disabled={isWatchlistFetching}
            style={styles.iconButton}
            onPress={this.onAddToWatchlist}
            Icon={getAddToWatchlistIcon({ inWatchlist, disabled: imdbDisabled })}
            text="Save"
          />
        )}
        {isAuthenticated && (
          <IconButton
            disabled={isFavoriteFetching}
            style={styles.iconButton}
            onPress={this.onAddToFavorites}
            Icon={getAddToFavoritesIcon({ inFavorite, disabled: imdbDisabled })}
            text="Favorite"
          />
        )}
        <IconButton
          disabled={imdbDisabled}
          style={styles.iconButton}
          onPress={this.openImdb}
          Icon={getOpenImdbIcon({ disabled: imdbDisabled })}
          text="Open Imdb"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Theme.colors.background,
    marginVertical: Theme.spacing.tiny
  },
  iconButton: {
    height: 78,
    width: '25%',
    marginVertical: Theme.spacing.xTiny
  }
});

MovieDetailsButtons.propTypes = {
  movie: PropTypes.object.isRequired,
  detailedMovie: PropTypes.object
};

const mapStateToProps = ({ auth: { user } }) => ({ user });

export default connect(
  mapStateToProps,
  {}
)(withRefetch(MovieDetailsButtons));
