import React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack/lib/typescript/types';

import AuthenticatedLock from '../components/AuthenticatedLock';
import BlockButton from '../components/BlockButton';
import { TouchableScale } from '../components/common';
import GuestInfo from '../components/GuestInfo';
import { withDelayedLoading } from '../components/hoc/withDelayedLoading';
import ScreenWrapper from '../components/ScreenWrapper';
import { getLibraryFavoriteIcon, getLibrarySettingsIcon, getLibraryWatchlistIcon } from '../helpers/icons';
import { librarySectionsKeys, sectionData } from '../redux/sections/sectionData';
import { LibrarySectionKey } from '../redux/sections/types';
import NavigationService from '../routes/NavigationService';
import { routeNames } from '../routes/routeNames';
import { SectionListScreenNavigationParams } from './movie/SectionListScreen';

/* ------------- Props and State ------------- */
type NavigationProps = NavigationStackScreenProps<{}>;
type Props = NavigationProps;

const librarySectionIcons: Record<LibrarySectionKey, JSX.Element> = {
  myWatchlist: getLibraryWatchlistIcon(),
  myFavorite: getLibraryFavoriteIcon(),
};

const navigateToSettings = () => {
  NavigationService.navigate(routeNames.Settings);
};

/* ------------- Component ------------- */
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
      <ScreenWrapper>
        <AuthenticatedLock placeholder={<GuestInfo />}>{this.renderLibrarySections()}</AuthenticatedLock>
      </ScreenWrapper>
    );
  }
}

export default withDelayedLoading(Library);
