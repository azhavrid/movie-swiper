import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import times from 'lodash/times';

import MoviePreview from './MoviePreview';
import { theme } from '../../theme';
import { movieIdsKeyExtractor } from '../../utils/movies';
import { MovieId } from '../../redux/movies/types';

/* ------------- Props and State ------------- */
type Props = {
  movieIds: MovieId[];
};

/* ------------- Class ------------- */
class MoviesHorizontalList extends React.PureComponent<Props> {
  renderPreview = ({ item, index }: { item: MovieId; index: number }) => (
    <MoviePreview movieId={item} highPriority={index < 5} />
  );

  renderEmptyContainer = () => (
    <View style={styles.emptyMoviesPreviewContainer}>
      {times(4).map(value => (
        <MoviePreview key={value} />
      ))}
    </View>
  );

  render() {
    const { movieIds } = this.props;
    const isEmpty = movieIds.length === 0;

    return (
      <FlatList
        horizontal
        style={styles.list}
        data={movieIds}
        scrollEnabled={!isEmpty}
        initialNumToRender={5}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={this.renderEmptyContainer}
        keyExtractor={movieIdsKeyExtractor}
        renderItem={this.renderPreview}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    paddingLeft: theme.spacing.tiny,
    paddingVertical: theme.spacing.tiny,
  },
  emptyMoviesPreviewContainer: {
    flexDirection: 'row',
  },
});

export default MoviesHorizontalList;