import React from 'react';
import { View, StyleSheet } from 'react-native';
import InfoAbsoluteBlock from './InfoAbsoluteBlock';
import { getGuestInfoIcon } from '../utils/icons';

class GuestInfo extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <InfoAbsoluteBlock
          Icon={getGuestInfoIcon()}
          text="Only for authenticated users"
          subtext="Don't be a guest. Create an account"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default GuestInfo;
