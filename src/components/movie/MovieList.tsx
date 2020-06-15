import React from 'react';
import { ActivityIndicator, FlatList, FlatListProps, RefreshControl, StyleSheet, View } from 'react-native';

import { getMovieListEmptyIcon } from '../../helpers/icons';
import { MovieId } from '../../redux/movies/types';
import { theme } from '../../theme';
import { movieIdsKeyExtractor } from '../../utils/movies';
import FooterLoading from '../FooterLoading';
import InfoBlock from '../InfoBlock';
import MovieInlinePreview from './MovieInlinePreview';

/* ------------- Props and State ------------- */
type OwnProps = {
  movieIds: MovieId[];
  showFullscreenLoading?: boolean;
  isPaginationPending?: boolean;
  emptyText?: string;
  emptySubtext?: string;
  renderEmptyIcon?: InfoBlock['props']['renderIcon'];
};
type Props = OwnProps & Partial<Omit<FlatListProps<MovieId>, 'data'>>;
export type MovieListProps = Props;

/* ------------- Component ------------- */
class MovieList extends React.PureComponent<Props> {
  renderEmptyComponent = () => {
    const { emptyText = 'No Movies', emptySubtext, renderEmptyIcon = getMovieListEmptyIcon } = this.props;
    return <InfoBlock renderIcon={renderEmptyIcon} text={emptyText} subtext={emptySubtext} />;
  };

  renderLoadingIndicator = () => (
    <ActivityIndicator size={theme.specifications.activityIndicatorSize} color={theme.gray.lightest} />
  );

  renderListFooter = () => (this.props.isPaginationPending ? <FooterLoading /> : null);

  renderMovie = ({ item }: { item: MovieId }) => <MovieInlinePreview movieId={item} />;

  renderMovies = () => {
    const { movieIds, refreshing, onRefresh, ...props } = this.props;

    return movieIds.length !== 0 ? (
      <FlatList
        data={movieIds}
        style={styles.list}
        renderItem={this.renderMovie}
        keyExtractor={movieIdsKeyExtractor}
        ListFooterComponent={this.renderListFooter}
        onEndReachedThreshold={0.8}
        refreshControl={
          onRefresh && <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.gray.lightest} />
        }
        {...props}
      />
    ) : (
      this.renderEmptyComponent()
    );
  };

  render() {
    const { showFullscreenLoading } = this.props;

    return (
      <View style={styles.container}>
        {showFullscreenLoading ? this.renderLoadingIndicator() : this.renderMovies()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

export default MovieList;
