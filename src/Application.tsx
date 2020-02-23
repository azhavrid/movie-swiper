import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import AppToast from './components/AppToast';
import { globalStyles } from './globalStyles';
import { initiateNetworkMonitoring, stopNetworkMonitoring } from './redux/network/actions';
import NavigationService from './routes/NavigationService';
import { RootStack } from './routes/routes';

/* ------------- Props and State ------------- */
type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type Props = ReduxProps;

/* ------------- Class ------------- */
class Application extends React.PureComponent<Props> {
  componentDidMount() {
    const { initiateNetworkMonitoring } = this.props;
    initiateNetworkMonitoring();
  }

  componentWillUnmount() {
    const { stopNetworkMonitoring } = this.props;
    stopNetworkMonitoring();
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
