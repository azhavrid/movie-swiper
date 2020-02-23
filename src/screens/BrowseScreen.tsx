import React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack/lib/typescript/types';

import { withDelayedLoading } from '../components/hoc/withDelayedLoading';
import BrowseSections from '../components/movie/BrowseSections';
import MovieSearchWrapper from '../components/movie/MovieSearchWrapper';
import ScreenWrapper from '../components/ScreenWrapper';

/* ------------- Props and State ------------- */
type Props = NavigationStackScreenProps<{}>;

/* ------------- Component ------------- */
class Browse extends React.Component<Props> {
  render() {
    return (
      <ScreenWrapper>
        <MovieSearchWrapper>
          <BrowseSections />
        </MovieSearchWrapper>
      </ScreenWrapper>
    );
  }
}

export default withDelayedLoading(Browse);
