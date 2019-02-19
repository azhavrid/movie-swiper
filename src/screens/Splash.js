import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { View, StyleSheet, UIManager } from 'react-native';
import { loadUserIntoRedux, logOutUser } from '../actions';
import { stGetUser } from '../utils/storage';
import RouteNames from '../RouteNames';
import Config from '../Config';
import Theme from '../Theme';

class Splash extends React.Component {
  componentDidMount() {
    this.configureLayoutAnimation();
    this.configureAxios();
    this.loadUser();
  }

  configureLayoutAnimation() {
    if (Config.isAndroid) {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  configureAxios() {
    const { navigation, logOutUser } = this.props;

    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          Config.logGeneral && console.log('Unauthorized request, logging out ...');
          logOutUser(navigation);
        }
        return Promise.reject(error);
      }
    );
  }

  loadUser = async () => {
    const { navigation, loadUserIntoRedux } = this.props;
    const user = await stGetUser();

    if (user) {
      loadUserIntoRedux(user);
      navigation.navigate(RouteNames.HomeStack);
    } else {
      navigation.navigate(RouteNames.AuthStack);
    }
  };

  render() {
    return <View style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background
  }
});

const mapStateToProps = ({ auth: { user } }) => ({ user });

export default connect(
  mapStateToProps,
  { loadUserIntoRedux, logOutUser }
)(Splash);
