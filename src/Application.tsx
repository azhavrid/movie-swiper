import React from 'react';
import { View } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { connect } from 'react-redux';

import AppToast from './components/AppToast';
import { globalStyles } from './globalStyles';
import { initiateNetworkMonitoring, stopNetworkMonitoring } from './redux/network/actions';
import NavigationService from './routes/NavigationService';
import { RootStack } from './routes/routes';

/* ------------- Props and State ------------- */
type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type Props = ReduxProps;

/* ------------- Component ------------- */
class Application extends React.PureComponent<Props> {
  bootSplashTimer: NodeJS.Timeout;

  componentDidMount() {
    const { initiateNetworkMonitoring } = this.props;
    initiateNetworkMonitoring();
    this.bootSplashTimer = setTimeout(() => {
      RNBootSplash.hide({ duration: 300 });
    }, 300);
  }

  componentWillUnmount() {
    const { stopNetworkMonitoring } = this.props;
    stopNetworkMonitoring();
    this.bootSplashTimer && clearTimeout(this.bootSplashTimer);
  }

  render() {
    return (
      <View style={globalStyles.screenContainer}>
        <RootStack ref={NavigationService.setNavigatorReference} theme="dark" />
        <AppToast />
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  initiateNetworkMonitoring,
  stopNetworkMonitoring,
};

export default connect(mapStateToProps, mapDispatchToProps)(Application);
