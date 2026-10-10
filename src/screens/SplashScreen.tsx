import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { connect } from 'react-redux';

import ScreenWrapper from '../components/ScreenWrapper';
import { userSelector } from '../redux/auth/selectors';
import { RootState } from '../redux/types';
import { RootStackParamList } from '../routes/routes';
import { routeNames } from '../routes/routeNames';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'> &
  ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

class Splash extends React.Component<Props> {
  componentDidMount() {
    const { user, navigation } = this.props;
    const routeName = user ? routeNames.HomeStack : routeNames.AuthStack;
    // Defer until the navigation tree is fully mounted.
    requestAnimationFrame(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: routeName as keyof typeof routeNames }],
      });
    });
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
