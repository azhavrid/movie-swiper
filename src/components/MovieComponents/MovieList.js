import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet } from 'react-native';
import InfoAbsoluteBlock from '../InfoAbsoluteBlock';
import MovieInlinePreview from './MovieInlinePreview';
import { movieKeyExtractor } from '../../utils/movies';
import { getMovieListEmptyIcon } from '../../utils/icons';

class MovieList extends React.PureComponent {
  renderEmptyDefault = () => {
    const { emptyText, emptySubtext } = this.props;
    return (
      <InfoAbsoluteBlock Icon={getMovieListEmptyIcon()} text={emptyText} subtext={emptySubtext} />
    );
  };

  renderEmpty = () => {
    const { renderEmptyComponent } = this.props;
    return renderEmptyComponent ? renderEmptyComponent() : this.renderEmptyDefault();
  };

  renderMovie = ({ item: movie }) => <MovieInlinePreview movie={movie} />;

  renderMovieList = () => {
    const { movies, ...props } = this.props;

    return (
      <FlatList
        data={movies}
        style={styles.list}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        renderItem={this.renderMovie}
        keyExtractor={movieKeyExtractor}
        {...props}
      />
    );
  };

  render() {
    const { movies } = this.props;
    return movies.length === 0 ? this.renderEmpty() : this.renderMovieList();
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    alignSelf: 'stretch'
  }
});

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  renderEmptyComponent: PropTypes.func,
  emptyText: PropTypes.string,
  emptySubtext: PropTypes.string
};

MovieList.defaultProps = {
  emptyText: 'This list is empty'
};

export default MovieList;
