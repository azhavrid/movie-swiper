import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet } from 'react-native';
import { logOutUser } from '../actions/AuthActions';
import { AppText } from '../components/common';
import BlockButton from '../components/BlockButton';
import withDelayedLoading from '../components/hoc/withDelayedLoading';
import Theme from '../Theme';

class Settings extends React.Component {
  onSignOutPress = () => {
    const { navigation, logOutUser } = this.props;
    logOutUser(navigation);
  };

  renderSectionTitle = title => (
    <AppText style={styles.sectionTitle} type="headline">
      {title}
    </AppText>
  );

  render() {
    const { user } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderSectionTitle('Account')}
          <BlockButton
            text="Sign Out"
            subtext={`You are logged in as ${user.username || 'guest'}`}
            color={Theme.colors.danger}
            onPress={this.onSignOutPress}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background
  },
  sectionTitle: {
    marginLeft: Theme.spacing.base,
    marginVertical: Theme.spacing.tiny,
    fontSize: 18
  }
});

const mapStateToProps = ({ auth }) => ({ user: auth.user });

export default connect(
  mapStateToProps,
  { logOutUser }
)(withDelayedLoading(Settings));
