import React from 'react';
import { BackHandler, PanResponder, View, KeyboardAvoidingView, StyleSheet } from 'react-native';
import SearchInput from '../SearchInput';
import MovieList from './MovieList';
import { connect } from 'react-redux';
import { searchTextChanged, searchMoviesRequest, searchMoviesPaginationRequest } from '../../redux/search/actions';
import {
  searchTextSelector,
  searchMovieIdsSelector,
  isSearchRequestPendingSelector,
  isSearchPaginationPendingSelector,
  isSearchTextEmptySelector,
  isSearchLoadingSelector,
  isSearchRequestSlowSelector,
} from '../../redux/search/selectors';
import { RootState } from '../../redux/types';
import InfoBlock from '../InfoBlock';
import { getEmptySearchIcon, getInitialSearchIcon } from '../../helpers/icons';
import { globalStyles } from '../../globalStyles';

/* ------------- Props and State ------------- */
type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type Props = ReduxProps;

type State = typeof initialState;

const initialState = {
  isSearchFocused: false,
};

/* ------------- Class ------------- */
class MovieSearchWrapper extends React.PureComponent<Props, State> {
  state = initialState;
  searchInputRef = React.createRef<SearchInput>();
  panResponder = this.getKeyboardDismissResponder();

  get toRenderSearchContent() {
    return this.state.isSearchFocused || !this.props.isSearchTextEmpty;
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onHardwareBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onHardwareBackPress);
  }

  onSearchInputFocus = () => this.setState({ isSearchFocused: true });

  onSearchInputBlur = () => this.setState({ isSearchFocused: false });

  onHardwareBackPress = () => {
    if (this.state.isSearchFocused) {
      this.searchInputRef.current!.onBackPress();
      return true;
    }
  };

  getKeyboardDismissResponder() {
    const onResponder = () => {
      this.searchInputRef.current!.blur();
      return false;
    };

    return PanResponder.create({
      onStartShouldSetPanResponder: onResponder,
      onStartShouldSetPanResponderCapture: onResponder,
    });
  }

  renderSearchHint = () => (
    <InfoBlock renderIcon={getInitialSearchIcon} text="Search" subtext="Find your favorite movies" />
  );

  renderSearchMovies = () => {
    const {
      movieIds,
      isSearchLoading,
      isSearchRequestPending,
      isSearchPaginationPending,
      isSearchRequestSlow,
      searchMoviesRequest,
      searchMoviesPaginationRequest,
    } = this.props;

    const showFullscreenLoading = (isSearchLoading && movieIds.length === 0) || isSearchRequestSlow;

    return (
      <MovieList
        movieIds={movieIds}
        showFullscreenLoading={showFullscreenLoading}
        refreshing={isSearchRequestPending}
        isPaginationPending={isSearchPaginationPending}
        onRefresh={searchMoviesRequest}
        onEndReached={searchMoviesPaginationRequest}
        renderEmptyIcon={getEmptySearchIcon}
        emptyText="No movies found"
        emptySubtext="Try different keywords"
        refreshControl={undefined} // Block refresh for search movie list
      />
    );
  };

  renderSearchContent = () => {
    const { isSearchTextEmpty } = this.props;

    return (
      <View {...this.panResponder.panHandlers} style={globalStyles.flexContainer}>
        {isSearchTextEmpty ? this.renderSearchHint() : this.renderSearchMovies()}
      </View>
    );
  };

  render() {
    const { children, searchText, searchTextChanged } = this.props;

    return (
      <>
        <SearchInput
          ref={this.searchInputRef}
          value={searchText}
          onChangeText={searchTextChanged}
          onFocus={this.onSearchInputFocus}
          onBlur={this.onSearchInputBlur}
        />
        {this.toRenderSearchContent ? this.renderSearchContent() : children}
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  movieIds: searchMovieIdsSelector(state),
  searchText: searchTextSelector(state),
  isSearchTextEmpty: isSearchTextEmptySelector(state),
  isSearchLoading: isSearchLoadingSelector(state),
  isSearchRequestPending: isSearchRequestPendingSelector(state),
  isSearchPaginationPending: isSearchPaginationPendingSelector(state),
  isSearchRequestSlow: isSearchRequestSlowSelector(state),
});

const mapDispatchToProps = {
  searchTextChanged,
  searchMoviesRequest,
  searchMoviesPaginationRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearchWrapper);
