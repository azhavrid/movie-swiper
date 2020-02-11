import React from 'react';
import { connect } from 'react-redux';
import { StatusBarSpacer } from '../components/common';
import ExploreMovieDeck from '../components/movie/ExploreMovieDeck';
import GuestInfo from '../components/GuestInfo';
import { withDelayedLoading } from '../components/hoc/withDelayedLoading';

import { RootState } from '../redux/types';
import AuthenticatedLock from '../components/AuthenticatedLock';
import { isAuthenticatedUserSelector } from '../redux/auth/selectors';
import { NavigationStackScreenProps, NavigationStackOptions } from 'react-navigation-stack/lib/typescript/types';
import ScreenWrapper from '../components/ScreenWrapper';

/* ------------- Props and State ------------- */
type OwnNavigationProps = { isAuthenticatedUser?: boolean };
type NavigationProps = NavigationStackScreenProps<OwnNavigationProps>;
type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type Props = NavigationProps & ReduxProps;

/* ------------- Class ------------- */
class Explore extends React.Component<Props> {
  static navigationOptions = ({ navigation }: NavigationProps): NavigationStackOptions => {
    const isAuthenticatedUser = navigation.getParam('isAuthenticatedUser');
    return isAuthenticatedUser ? { header: null } : {};
  };

  componentDidMount() {
    const { navigation, isAuthenticatedUser } = this.props;
    navigation.setParams({ isAuthenticatedUser });
  }

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
