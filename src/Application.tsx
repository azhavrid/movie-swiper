import React from 'react';
import { connect } from 'react-redux';
import { View, UIManager } from 'react-native';
import { RootStack } from './routes/routes';
import NavigationService from './routes/NavigationService';
import AppToast from './components/AppToast';
import { globalStyles } from './globalStyles';
import { RootState } from './redux/types';
import { config } from './configs/config';
import { stopNetworkMonitoring, initiateNetworkMonitoring } from './redux/network/actions';

/* ------------- Props and State ------------- */
type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type Props = ReduxProps;

/* ------------- Class ------------- */
class Application extends React.PureComponent<Props> {
  componentDidMount() {
    const { initiateNetworkMonitoring } = this.props;

    initiateNetworkMonitoring();
    this.configureLayoutAnimation();
  }

  componentWillUnmount() {
    const { stopNetworkMonitoring } = this.props;
    stopNetworkMonitoring();
  }

  configureLayoutAnimation() {
    if (config.isAndroid) {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    return (
      <View style={globalStyles.screenContainer}>
        <RootStack ref={NavigationService.setNavigatorReference} />
        <AppToast />
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {
  initiateNetworkMonitoring,
  stopNetworkMonitoring,
};

export default connect(mapStateToProps, mapDispatchToProps)(Application);
