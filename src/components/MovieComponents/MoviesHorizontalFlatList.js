import React from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import MoviePreview from './MoviePreview';
import { movieKeyExtractor } from '../../utils/movies';
import Theme from '../../Theme';

class MoviesHorizontalList extends React.PureComponent {
  renderPreview = ({ item, index }) => <MoviePreview movie={item} highPriority={index < 5} />;
  renderEmptyContainer = () => _.times(4).map((r, i) => <MoviePreview key={i} />);
  renderHeader = () => <View style={{ width: this.props.paddingLeft - Theme.spacing.tiny }} />;

  render() {
    const { movies, paddingLeft } = this.props;
    const isEmpty = movies.length === 0;

    return (
      <FlatList
        horizontal
        data={movies}
        scrollEnabled={!isEmpty}
        initialNumToRender={5}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={paddingLeft && this.renderHeader}
        ListEmptyComponent={this.renderEmptyContainer}
        keyExtractor={movieKeyExtractor}
        renderItem={this.renderPreview}
      />
    );
  }
}

MoviesHorizontalList.propTypes = {
  movies: PropTypes.array.isRequired,
  paddingLeft: PropTypes.number
};

export default MoviesHorizontalList;
