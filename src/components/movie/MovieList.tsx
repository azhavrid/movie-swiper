import React from 'react';
import { FlatList, StyleSheet, FlatListProps, View, ActivityIndicator, RefreshControl } from 'react-native';
import InfoBlock from '../InfoBlock';
import MovieInlinePreview from './MovieInlinePreview';
import { getMovieListEmptyIcon } from '../../helpers/icons';
import { movieIdsKeyExtractor } from '../../utils/movies';
import { MovieId } from '../../redux/movies/types';
import FooterLoading from '../FooterLoading';
import { theme } from '../../theme';

/* ------------- Props and State ------------- */
export type MovieListProps = Props;

type OwnProps = {
  movieIds: MovieId[];
  showFullscreenLoading?: boolean;
  isPaginationPending?: boolean;
  emptyText?: string;
  emptySubtext?: string;
  renderEmptyIcon?: InfoBlock['props']['renderIcon'];
};

type Props = OwnProps & Partial<Omit<FlatListProps<MovieId>, 'data'>>;

/* ------------- Class ------------- */
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
