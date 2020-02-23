import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack/lib/typescript/types';
import { connect } from 'react-redux';

import BlockButton from '../components/BlockButton';
import { AppText } from '../components/common';
import { withDelayedLoading } from '../components/hoc/withDelayedLoading';
import ScreenWrapper from '../components/ScreenWrapper';
import { logOut } from '../redux/auth/actions';
import { usernameSelector } from '../redux/auth/selectors';
import { RootState } from '../redux/types';
import { theme } from '../theme';

/* ------------- Props and State ------------- */
type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type Props = NavigationStackScreenProps & ReduxProps;

/* ------------- Component ------------- */
class Settings extends React.PureComponent<Props> {
  onSignOutPress = () => {
    const { logOut } = this.props;
    logOut();
  };

  render() {
    const { username } = this.props;

    return (
      <ScreenWrapper>
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
      </ScreenWrapper>
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
