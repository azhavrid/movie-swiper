import React from 'react';
import { View } from 'react-native';

import { globalStyles } from '../globalStyles';
import { getGuestInfoIcon } from '../helpers/icons';
import InfoBlock from './InfoBlock';

/* ------------- Component ------------- */
const GuestInfo: React.FC = () => (
  <View style={globalStyles.flexContainer}>
    <InfoBlock
      renderIcon={getGuestInfoIcon}
      text="Only for authenticated users"
      subtext="Don't be a guest. Create an account"
    />
  </View>
);

export default GuestInfo;
