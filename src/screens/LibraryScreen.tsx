import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import AuthenticatedLock from '../components/AuthenticatedLock';
import BlockButton from '../components/BlockButton';
import GuestInfo from '../components/GuestInfo';
import { withDelayedLoading } from '../components/hoc/withDelayedLoading';
import ScreenWrapper from '../components/ScreenWrapper';
import { getLibraryFavoriteIcon, getLibraryWatchlistIcon } from '../helpers/icons';
import { librarySectionsKeys, sectionData } from '../redux/sections/sectionData';
import { LibrarySectionKey } from '../redux/sections/types';
import { LibraryStackParamList } from '../routes/routes';
import { routeNames } from '../routes/routeNames';
import { SectionListScreenNavigationParams } from './movie/SectionListScreen';

type Props = NativeStackScreenProps<LibraryStackParamList, 'LibraryHome'>;

const librarySectionIcons: Record<LibrarySectionKey, React.ReactElement> = {
  myWatchlist: getLibraryWatchlistIcon(),
  myFavorite: getLibraryFavoriteIcon(),
};

class Library extends React.PureComponent<Props> {
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
