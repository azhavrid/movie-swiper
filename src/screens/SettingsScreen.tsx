import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { AppText } from '../components/common';
import BlockButton from '../components/BlockButton';
import { withDelayedLoading } from '../components/hoc/withDelayedLoading';
import { theme } from '../theme';

import { RootState } from '../redux/types';
import { logOut } from '../redux/auth/actions';
import { usernameSelector } from '../redux/auth/selectors';
import { globalStyles } from '../globalStyles';
import { NavigationStackScreenProps } from 'react-navigation-stack/lib/typescript/types';

/* ------------- Props and State ------------- */
type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type Props = NavigationStackScreenProps & ReduxProps;

/* ------------- Class ------------- */
class Settings extends React.PureComponent<Props> {
  onSignOutPress = () => {
    const { logOut } = this.props;
    logOut();
  };

  render() {
    const { username } = this.props;

    return (
      <View style={globalStyles.screenContainer}>
        <ScrollView>
          <AppText style={styles.sectionTitle} type="title2">
            Account
          </AppText>
          <BlockButton
            text="Sign Out"
            subtext={`You are logged in as ${username}`}
            color={theme.colors.danger}
            onPress={this.onSignOutPress}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionTitle: {
    marginLeft: theme.spacing.base,
    marginVertical: theme.spacing.tiny,
  },
});

const mapStateToProps = (state: RootState) => ({
  username: usernameSelector(state),
});

const mapDispatchToProps = {
  logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(withDelayedLoading(Settings));
