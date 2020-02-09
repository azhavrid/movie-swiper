import React from 'react';
import { View } from 'react-native';
import { TouchableScale } from '../components/common';
import BlockButton from '../components/BlockButton';
import GuestInfo from '../components/GuestInfo';
import { withDelayedLoading } from '../components/hoc/withDelayedLoading';
import { routeNames } from '../routes/routeNames';
import { getLibrarySettingsIcon, getLibraryWatchlistIcon, getLibraryFavoriteIcon } from '../helpers/icons';

import AuthenticatedLock from '../components/AuthenticatedLock';
import { sectionData, librarySectionsKeys } from '../redux/sections/sectionData';
import { SectionListScreenNavigationParams } from './movie/SectionListScreen';
import { LibrarySectionId } from '../redux/sections/types';
import { globalStyles } from '../globalStyles';
import { NavigationStackScreenProps, NavigationStackOptions } from 'react-navigation-stack/lib/typescript/types';
import NavigationService from '../routes/NavigationService';

/* ------------- Props and State ------------- */
type NavigationProps = NavigationStackScreenProps<{}>;
type Props = NavigationProps;

const librarySectionIcons: Record<LibrarySectionId, JSX.Element> = {
  myWatchlist: getLibraryWatchlistIcon(),
  myFavorite: getLibraryFavoriteIcon(),
};

const navigateToSettings = () => {
  NavigationService.navigate(routeNames.Settings);
};

/* ------------- Class ------------- */
class Library extends React.PureComponent<Props> {
  static navigationOptions = {
    headerRight: <TouchableScale onPress={navigateToSettings}>{getLibrarySettingsIcon()}</TouchableScale>,
  };

  renderLibrarySections = () => {
    const { navigation } = this.props;

    return librarySectionsKeys.map(sectionKey => {
      const { title } = sectionData[sectionKey];

      const onPress = () => {
        const params: SectionListScreenNavigationParams = { sectionKey };
        navigation.navigate(routeNames.SectionListScreen, params);
      };

      const Icon = librarySectionIcons[sectionKey];

      return <BlockButton key={sectionKey} text={title} Icon={Icon} onPress={onPress} />;
    });
  };

  render() {
    return (
      <View style={globalStyles.screenContainer}>
        <AuthenticatedLock placeholder={<GuestInfo />}>{this.renderLibrarySections()}</AuthenticatedLock>
      </View>
    );
  }
}

export default withDelayedLoading(Library);
