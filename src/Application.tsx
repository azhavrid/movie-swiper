import React from 'react';
import { StatusBar, View } from 'react-native';
import { connect } from 'react-redux';

import AppToast from './components/AppToast';
import { globalStyles } from './globalStyles';
import { initiateNetworkMonitoring, stopNetworkMonitoring } from './redux/network/actions';
import { RootNavigator } from './routes/routes';

/* ------------- Props and State ------------- */
type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type Props = ReduxProps;

/* ------------- Component ------------- */
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
        <StatusBar barStyle="light-content" backgroundColor="#121212" />
        <RootNavigator />
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
