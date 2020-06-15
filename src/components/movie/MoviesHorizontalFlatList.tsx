import { times } from 'lodash';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { MovieId } from '../../redux/movies/types';
import { theme } from '../../theme';
import { movieIdsKeyExtractor } from '../../utils/movies';
import MoviePreview, { MoviePreviewProps } from './MoviePreview';

/* ------------- Props and State ------------- */
type Props = {
  movieIds: MovieId[];
  moviePreviewAdditionalProps?: Partial<MoviePreviewProps>;
};

/* ------------- Component ------------- */
class MoviesHorizontalList extends React.PureComponent<Props> {
  renderPreview = ({ item, index }: { item: MovieId; index: number }) => (
    <MoviePreview movieId={item} highPriority={index < 5} {...this.props.moviePreviewAdditionalProps} />
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
        maxToRenderPerBatch={10}
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
