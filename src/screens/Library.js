import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { TouchableScale } from '../components/common';
import BlockButton from '../components/BlockButton';
import GuestInfo from '../components/GuestInfo';
import withDelayedLoading from '../components/hoc/withDelayedLoading';
import RouteNames from '../RouteNames';
import { fetchFavoriteMovies, fetchWatchlistMovies } from '../api/movies';
import {
  getLibrarySettingsIcon,
  getLibraryWatchlistIcon,
  getLibraryFavoriteIcon
} from '../utils/icons';
import Theme from '../Theme';

class Library extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: () => (
      <TouchableScale
        onPress={() => {
          navigation.navigate(RouteNames.Settings);
        }}
      >
        {getLibrarySettingsIcon()}
      </TouchableScale>
    )
  });

  onWatchlistPressed = () => {
    const { navigation } = this.props;
    navigation.navigate(RouteNames.MovieListScreen, {
      title: 'Watchlist',
      fetchFunction: fetchWatchlistMovies
    });
  };

  onFavoritesPressed = () => {
    const { navigation } = this.props;
    navigation.navigate(RouteNames.MovieListScreen, {
      title: 'Favorite Movies',
      fetchFunction: fetchFavoriteMovies
    });
  };

  render() {
    const { user } = this.props;

    return (
      <View style={styles.container}>
        {user.isGuest ? (
          <GuestInfo />
        ) : (
          <View>
            <BlockButton
              style={styles.button}
              Icon={getLibraryWatchlistIcon()}
              text="My Watchlist"
              onPress={this.onWatchlistPressed}
            />
            <BlockButton
              style={styles.button}
              Icon={getLibraryFavoriteIcon()}
              text="My Favorite Movies"
              onPress={this.onFavoritesPressed}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background
  },
  button: {
    height: 64
  }
});

const mapStateToProps = ({ auth: { user } }) => ({ user });

export default connect(
  mapStateToProps,
  {}
)(withDelayedLoading(Library));
