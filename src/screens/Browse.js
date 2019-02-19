import React from 'react';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { View, FlatList, StyleSheet, PanResponder } from 'react-native';
import SearchBlock from '../components/SearchBlock';
import MoviesHorizontalScroll from '../components/MovieComponents/MoviesHorizontalScroll';
import MovieSearchResults from '../components/MovieComponents/MovieSearchResults';
import withRefetch from '../components/hoc/withRefetch';
import withDelayedLoading from '../components/hoc/withDelayedLoading';
import {
  getSectionFetchFunctionFromUrlGetter as getFetchFunction,
  getSearchFetchFunctionFromQuery
} from '../api/movies';
import {
  getTrendingDailyMoviesUrl,
  getTrendingWeeklyMoviesUrl,
  getPopularMoviesUrl,
  getTopRatedMoviesUrl
} from '../api/urls';
import Theme from '../Theme';

const BROWSE_SECTIONS = [
  { title: 'Trending Daily', fetchFunction: getFetchFunction(getTrendingDailyMoviesUrl) },
  { title: 'Trending Weekly', fetchFunction: getFetchFunction(getTrendingWeeklyMoviesUrl) },
  { title: 'Popular', fetchFunction: getFetchFunction(getPopularMoviesUrl) },
  { title: 'Top Rated', fetchFunction: getFetchFunction(getTopRatedMoviesUrl) }
];

class Browse extends React.Component {
  constructor(props) {
    super(props);

    const sectionsMovies = BROWSE_SECTIONS.reduce((obj, section) => {
      obj[section.title] = []; // eslint-disable-line
      return obj;
    }, {});

    this.state = {
      isInitialSearch: true,
      isSearchBlockFocused: false,
      searchResultsFetchFunction: getSearchFetchFunctionFromQuery(''),
      searchText: '',
      sectionsMovies
    };

    this.createKeyboardDismissResponder();
  }

  componentDidMount() {
    // eslint-disable-next-line
    requestAnimationFrame(() => this.initialSectionsFetch());
  }

  onSearchBlockFocus = () => this.setState({ isSearchBlockFocused: true });
  onSearchBlockBlur = () => this.setState({ isSearchBlockFocused: false });
  onSearchTextInputRef = ref => (this.searchTextInput = ref);

  onSearchTextChange = text => {
    const additionalProps = text.length === 0 ? { isInitialSearch: true } : {};
    this.setState({ searchText: text, ...additionalProps });
  };

  onDelayedInput = async () => {
    const { searchText } = this.state;
    this.setState({
      searchResultsFetchFunction: getSearchFetchFunctionFromQuery(searchText),
      isInitialSearch: false
    });
  };

  createKeyboardDismissResponder() {
    const onResponder = () => {
      this.searchTextInput.blur();
      return false;
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: onResponder,
      onStartShouldSetPanResponderCapture: onResponder
    });
  }

  initialSectionsFetch() {
    const {
      refetch: { fetchUntilSuccess }
    } = this.props;

    BROWSE_SECTIONS.forEach(section =>
      fetchUntilSuccess(() => section.fetchFunction({ page: 1 })).then(data => {
        const { sectionsMovies } = this.state;
        const newSections = {
          ...sectionsMovies,
          [section.title]: data.movies
        };

        this.setState({ sectionsMovies: newSections });
      })
    );
  }

  renderMoviesScrollSection = ({ item: { title, fetchFunction } }) => {
    const { sectionsMovies } = this.state;
    return (
      <MoviesHorizontalScroll
        fetchFunction={fetchFunction}
        movies={sectionsMovies[title]}
        title={title}
      />
    );
  };

  renderBrowseSections() {
    const { sectionsMovies } = this.state;
    const keyExtractor = section => section.title;

    return (
      <FlatList
        data={BROWSE_SECTIONS}
        extraData={sectionsMovies}
        keyExtractor={keyExtractor}
        renderItem={this.renderMoviesScrollSection}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  render() {
    const {
      searchText,
      searchResultsFetchFunction,
      isInitialSearch,
      isSearchBlockFocused
    } = this.state;

    return (
      <View style={styles.container}>
        <SearchBlock
          value={searchText}
          style={styles.search}
          inputRef={this.onSearchTextInputRef}
          onBlockBlur={this.onSearchBlockBlur}
          onBlockFocus={this.onSearchBlockFocus}
          onChangeText={this.onSearchTextChange}
          onDelayedInput={this.onDelayedInput}
        />

        <View style={styles.bottomContainer} {...this.panResponder.panHandlers}>
          {this.renderBrowseSections()}
          {isSearchBlockFocused && (
            <MovieSearchResults
              initialSearch={isInitialSearch}
              fetchFunction={searchResultsFetchFunction}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Theme.colors.background
  },
  search: {
    marginVertical: Theme.spacing.tiny
  },
  bottomContainer: {
    flex: 1
  }
});

const mapStateToProps = ({ auth: { user } }) => ({ user });

export default connect(
  mapStateToProps,
  {}
)(withNavigationFocus(withRefetch(withDelayedLoading(Browse))));
