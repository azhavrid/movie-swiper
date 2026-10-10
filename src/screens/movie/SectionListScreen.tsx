import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { connect } from 'react-redux';

import { withDelayedLoading } from '../../components/hoc/withDelayedLoading';
import MovieList from '../../components/movie/MovieList';
import ScreenWrapper from '../../components/ScreenWrapper';
import { fetchSectionNextPageRequest, refreshSectionRequest } from '../../redux/sections/actions';
import { getSectionSelectorByKey } from '../../redux/sections/selectors';
import { SectionKey } from '../../redux/sections/types';
import { RootState } from '../../redux/types';
import { BrowseStackParamList } from '../../routes/routes';
import { routeNames } from '../../routes/routeNames';

export interface SectionListScreenNavigationParams {
  sectionKey: SectionKey;
}

type NavigationProps = NativeStackScreenProps<BrowseStackParamList, typeof routeNames.SectionListScreen>;
type MapStateToProps = ReturnType<typeof makeMapStateToProps>;
type ReduxProps = ReturnType<MapStateToProps> & typeof mapDispatchToProps;
type PropsWithoutRedux = NavigationProps;
type Props = ReduxProps & PropsWithoutRedux;

class SectionListScreen extends React.Component<Props> {
  componentDidMount() {
    const { refreshSectionRequest, sectionKey } = this.props;
    refreshSectionRequest(sectionKey);
  }

  onRefresh = () => {
    const { sectionKey, refreshSectionRequest } = this.props;
    refreshSectionRequest(sectionKey);
  };

  onEndReached = () => {
    const { sectionKey, fetchSectionNextPageRequest } = this.props;
    fetchSectionNextPageRequest(sectionKey);
  };

  render() {
    const { section } = this.props;
    const { movieIds, isRefreshing, isPaginationPending } = section;
    return (
      <ScreenWrapper>
        <MovieList
          movieIds={movieIds}
          showFullscreenLoading={isRefreshing && movieIds.length === 0}
          refreshing={isRefreshing}
          isPaginationPending={isPaginationPending}
          onRefresh={this.onRefresh}
          onEndReached={this.onEndReached}
        />
      </ScreenWrapper>
    );
  }
}

const makeMapStateToProps = (_state: RootState, props: PropsWithoutRedux) => {
  const sectionKey = props.route.params.sectionKey;
  const sectionSelector = getSectionSelectorByKey(sectionKey);

  return (state: RootState) => ({
    sectionKey,
    section: sectionSelector(state),
  });
};

const mapDispatchToProps = {
  refreshSectionRequest,
  fetchSectionNextPageRequest,
};

export default connect(makeMapStateToProps, mapDispatchToProps)(withDelayedLoading(SectionListScreen));
