import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { MovieDetailed } from '../../api/types';
import { getImdbLink } from '../../api/urls';
import { getAddToFavoritesIcon, getAddToWatchlistIcon, getOpenImdbIcon } from '../../helpers/icons';
import { changeMovieStatusRequest } from '../../redux/movies/actions';
import { Movie } from '../../redux/movies/types';
import { theme } from '../../theme';
import { safeOpenURL } from '../../utils/network';
import AuthenticatedLock from '../AuthenticatedLock';
import { IconButton } from '../common';

/* ------------- Props and State ------------- */
type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type OwnProps = {
  movie: Movie;
  detailedMovie?: MovieDetailed;
};
type Props = ReduxProps & OwnProps;

/* ------------- Component ------------- */
class MovieDetailsButtons extends React.PureComponent<Props> {
  onWatchlistPress = () => {
    const { movie, changeMovieStatusRequest } = this.props;
    const { id, isInWatchlist } = movie;
    changeMovieStatusRequest({ movieId: id, status: !isInWatchlist, statusType: 'watchlist' });
  };

  onFavoritePress = () => {
    const { movie, changeMovieStatusRequest } = this.props;
    const { id, isInFavorites } = movie;
    changeMovieStatusRequest({ movieId: id, status: !isInFavorites, statusType: 'favorite' });
  };

  openImdbLink = () => {
    const { detailedMovie } = this.props;
    if (detailedMovie && detailedMovie.imdb_id) {
      safeOpenURL(getImdbLink(detailedMovie.imdb_id));
    }
  };

  render() {
    const { movie, detailedMovie } = this.props;
    const { isFavoritesPending, isInFavorites, isWatchlistPending, isInWatchlist } = movie;
    const isImdbLinkAvailable = detailedMovie && detailedMovie.imdb_id;

    return (
      <View style={styles.container}>
        <AuthenticatedLock>
          <IconButton
            disabled={isWatchlistPending}
            style={styles.iconButton}
            onPress={this.onWatchlistPress}
            Icon={getAddToWatchlistIcon({ isInWatchlist })}
            text="Save"
          />
          <IconButton
            disabled={isFavoritesPending}
            style={styles.iconButton}
            onPress={this.onFavoritePress}
            Icon={getAddToFavoritesIcon({ isInFavorites })}
            text="Favorite"
          />
        </AuthenticatedLock>
        <IconButton
          disabled={!isImdbLinkAvailable}
          style={styles.iconButton}
          onPress={this.openImdbLink}
          Icon={getOpenImdbIcon({ disabled: !isImdbLinkAvailable })}
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
    backgroundColor: theme.colors.background,
    marginVertical: theme.spacing.tiny,
  },
  iconButton: {
    height: 78,
    width: '25%',
    marginVertical: theme.spacing.xTiny,
  },
});

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  changeMovieStatusRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailsButtons);
