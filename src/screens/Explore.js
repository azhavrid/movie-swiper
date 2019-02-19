import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { StatusBarSpacer } from '../components/common';
import ExploreMovieDeck from '../components/MovieComponents/ExploreMovieDeck';
import GuestInfo from '../components/GuestInfo';
import withDelayedLoading from '../components/hoc/withDelayedLoading';
import Theme from '../Theme';

class Explore extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const user = navigation.getParam('user', { isGuest: true });
    return user.isGuest ? {} : { header: null };
  };

  componentDidMount() {
    const { navigation, user } = this.props;
    navigation.setParams({ user });
  }

  render() {
    const { user } = this.props;

    return (
      <View style={styles.container}>
        {user.isGuest ? (
          <GuestInfo />
        ) : (
          <View style={{ flex: 1 }}>
            <StatusBarSpacer />
            <ExploreMovieDeck />
          </View>
        )}
      </View>
    );
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
  {}
)(withDelayedLoading(Explore));
