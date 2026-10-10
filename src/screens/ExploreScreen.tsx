import React from 'react';
import { connect } from 'react-redux';

import AuthenticatedLock from '../components/AuthenticatedLock';
import { StatusBarSpacer } from '../components/common';
import GuestInfo from '../components/GuestInfo';
import { withDelayedLoading } from '../components/hoc/withDelayedLoading';
import ExploreMovieDeck from '../components/movie/ExploreMovieDeck';
import ScreenWrapper from '../components/ScreenWrapper';
import { isAuthenticatedUserSelector } from '../redux/auth/selectors';
import { RootState } from '../redux/types';

type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type Props = ReduxProps;

class Explore extends React.Component<Props> {
  render() {
    return (
      <ScreenWrapper>
        <AuthenticatedLock placeholder={<GuestInfo />}>
          <StatusBarSpacer />
          <ExploreMovieDeck />
        </AuthenticatedLock>
      </ScreenWrapper>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  isAuthenticatedUser: isAuthenticatedUserSelector(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withDelayedLoading(Explore));
