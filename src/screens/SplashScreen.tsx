import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { RootState } from '../redux/types';
import { userSelector } from '../redux/auth/selectors';
import { routeNames } from '../routes/routeNames';
import { globalStyles } from '../globalStyles';
import { NavigationSwitchScreenProps } from 'react-navigation';

/* ------------- Props and State ------------- */
type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type Props = NavigationSwitchScreenProps<{}> & ReduxProps;

/* ------------- Class ------------- */
class Splash extends React.Component<Props> {
  componentDidMount() {
    const { user, navigation } = this.props;
    const routeName = user ? routeNames.HomeStack : routeNames.AuthStack;
    navigation.navigate(routeName);
  }

  render() {
    return <View style={globalStyles.screenContainer} />;
  }
}

const mapStateToProps = (state: RootState) => ({
  user: userSelector(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
