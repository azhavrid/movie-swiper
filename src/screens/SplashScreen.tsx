import React from 'react';
import { NavigationSwitchScreenProps } from 'react-navigation';
import { connect } from 'react-redux';

import ScreenWrapper from '../components/ScreenWrapper';
import { userSelector } from '../redux/auth/selectors';
import { RootState } from '../redux/types';
import { routeNames } from '../routes/routeNames';

/* ------------- Props and State ------------- */
type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type Props = NavigationSwitchScreenProps<{}> & ReduxProps;

/* ------------- Component ------------- */
class Splash extends React.Component<Props> {
  componentDidMount() {
    const { user, navigation } = this.props;
    const routeName = user ? routeNames.HomeStack : routeNames.AuthStack;
    navigation.navigate(routeName);
  }

  render() {
    return <ScreenWrapper />;
  }
}

const mapStateToProps = (state: RootState) => ({
  user: userSelector(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
