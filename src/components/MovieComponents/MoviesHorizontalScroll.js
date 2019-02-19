import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import MoviesHorizontalFlatList from './MoviesHorizontalFlatList';
import { AppText, AppButton } from '../common';
import RouteNames from '../../RouteNames';
import { getFontStyleObject } from '../../utils/font';
import Theme from '../../Theme';

class MoviesHorizontalScroll extends React.PureComponent {
  onMorePress = () => {
    const { title, fetchFunction, navigation } = this.props;
    navigation.push(RouteNames.MovieListScreen, { title, fetchFunction });
  };

  render() {
    const { title, movies, style } = this.props;
    return (
      <View style={[styles.container, style]}>
        <View style={styles.topWrapper}>
          <AppText style={styles.title} type="title2">
            {title}
          </AppText>
          <AppButton
            onlyText
            style={styles.moreButton}
            textStyle={styles.moreButtonText}
            onPress={this.onMorePress}
          >
            MORE
          </AppButton>
        </View>
        <MoviesHorizontalFlatList movies={movies} paddingLeft={styles.title.marginLeft} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Theme.spacing.tiny,
    marginBottom: Theme.spacing.base,
    width: '100%'
  },
  topWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    marginLeft: Theme.spacing.small,
    marginVertical: Theme.spacing.tiny
  },
  moreButton: {
    padding: Theme.spacing.tiny
  },
  moreButtonText: {
    fontSize: 15,
    ...getFontStyleObject({ weight: 'SemiBold' })
  }
});

MoviesHorizontalScroll.propTypes = {
  movies: PropTypes.array.isRequired,
  title: PropTypes.string,
  fetchFunction: PropTypes.func
};

export default withNavigation(MoviesHorizontalScroll);
