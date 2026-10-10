import React from 'react';

import { withDelayedLoading } from '../components/hoc/withDelayedLoading';
import BrowseSections from '../components/movie/BrowseSections';
import MovieSearchWrapper from '../components/movie/MovieSearchWrapper';
import ScreenWrapper from '../components/ScreenWrapper';

class Browse extends React.Component {
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
