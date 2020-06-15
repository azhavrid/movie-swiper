import React from 'react';
import { NavigationStackOptions, NavigationStackScreenProps } from 'react-navigation-stack/lib/typescript/types';
import { connect } from 'react-redux';

import AuthenticatedLock from '../components/AuthenticatedLock';
import { StatusBarSpacer } from '../components/common';
import GuestInfo from '../components/GuestInfo';
import { withDelayedLoading } from '../components/hoc/withDelayedLoading';
import ExploreMovieDeck from '../components/movie/ExploreMovieDeck';
import ScreenWrapper from '../components/ScreenWrapper';
import { isAuthenticatedUserSelector } from '../redux/auth/selectors';
import { RootState } from '../redux/types';

/* ------------- Props and State ------------- */
type OwnNavigationProps = { isAuthenticatedUser?: boolean };
type NavigationProps = NavigationStackScreenProps<OwnNavigationProps>;
type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type Props = NavigationProps & ReduxProps;

/* ------------- Component ------------- */
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
