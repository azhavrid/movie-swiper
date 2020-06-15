import React from 'react';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { theme } from '../theme';

/* ------------- Types ------------- */
interface TintColorParam {
  tintColor: string;
}

/* ------------- Local ------------- */
const { smallIconSize, iconSize, hugeIconSize } = theme.specifications;
const { primary } = theme.colors;
const { lightest, light, darkest } = theme.gray;
const { tiny } = theme.spacing;

/* ------------- Icons ------------- */
// --- MovieDetailsButtons ---
export const getAddToWatchlistIcon = ({ isInWatchlist }: { isInWatchlist: boolean }) => (
  <IconMaterialIcons
    name={isInWatchlist ? 'playlist-add-check' : 'playlist-add'}
    color={isInWatchlist ? primary : lightest}
    size={iconSize}
  />
);

export const getAddToFavoritesIcon = ({ isInFavorites }: { isInFavorites: boolean }) => (
  <IconMaterialIcons
    name={isInFavorites ? 'favorite' : 'favorite-border'}
    color={isInFavorites ? primary : lightest}
    size={iconSize}
  />
);

export const getOpenImdbIcon = ({ disabled }: { disabled: boolean }) => (
  <IconMaterialCommunityIcons name="movie-roll" color={disabled ? light : lightest} size={iconSize} />
);

// --- MovieSearchWrapper ---
export const getEmptySearchIcon = () => <IconFeather name="alert-circle" color={lightest} size={hugeIconSize} />;

export const getInitialSearchIcon = () => <IconEvilIcons name="search" color={lightest} size={hugeIconSize} />;

// --- GuestInfo ---
export const getGuestInfoIcon = () => <IconFeather name="user" color={lightest} size={hugeIconSize} />;

// --- SearchInput ---
export const getSearchInputBackIcon = (isShown: boolean) => (
  <IconEntypo name="chevron-thin-left" size={smallIconSize} color={darkest} style={{ opacity: +isShown }} />
);

export const getSearchInputLabelIcon = () => (
  <IconFeather name="search" color={darkest} size={smallIconSize * 1.1} style={{ paddingHorizontal: tiny }} />
);

export const getSearchInputCloseIcon = (isShown: boolean) => (
  <IconAntDesign name="close" color={darkest} size={smallIconSize * 1.2} style={{ opacity: +isShown }} />
);

// --- MovieList ---
export const getMovieListEmptyIcon = () => (
  <IconMaterialCommunityIcons name="movie-outline" color={lightest} size={hugeIconSize} />
);

// --- Library ---
export const getLibrarySettingsIcon = () => (
  <IconFontAwesome name="cog" color={lightest} size={iconSize * 0.9} style={{ padding: tiny }} />
);

export const getLibraryWatchlistIcon = () => (
  <IconMaterialIcons name="watch-later" color={light} size={iconSize * 0.8} />
);

export const getLibraryFavoriteIcon = () => (
  <IconMaterialCommunityIcons name="heart-multiple" color={light} size={iconSize * 0.8} />
);

// --- Header ---
export const getHeaderBackIcon = () => (
  <IconEntypo name="chevron-left" color={lightest} size={iconSize} style={{ padding: theme.spacing.tiny }} />
);

// --- Routes ---
export const getNavbarBrowseIcon = ({ tintColor }: TintColorParam) => (
  <IconEntypo name="home" color={tintColor} size={iconSize * 0.9} />
);

export const getNavbarExploreIcon = ({ tintColor }: TintColorParam) => (
  <IconMaterialIcons name="photo-library" color={tintColor} size={iconSize * 0.9} />
);

export const getNavbarLibraryIcon = ({ tintColor }: TintColorParam) => (
  <IconEntypo name="folder-video" color={tintColor} size={iconSize * 0.85} />
);
