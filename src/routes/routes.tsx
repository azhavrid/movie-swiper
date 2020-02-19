import React from 'react';
import { createAppContainer, createSwitchNavigator, StackActions } from 'react-navigation';
import { createStackNavigator, NavigationStackOptions } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { routeNames, tabNames } from './routeNames';

import SplashScreen from '../screens/SplashScreen';
import AuthWelcome from '../screens/auth/AuthWelcome';
import AuthLogin from '../screens/auth/AuthLogin';
import BrowseScreen from '../screens/BrowseScreen';
import ExploreScreen from '../screens/ExploreScreen';
import LibraryScreen from '../screens/LibraryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SectionListScreen from '../screens/movie/SectionListScreen';
import MovieDetailsScreen from '../screens/movie/MovieDetailsScreen';
import NavbarWrapper from '../components/NavbarWrapper';
import NavbarButtonWrapper from '../components/NavbarButtonWrapper';
import Header from '../components/Header';
import { getNavbarBrowseIcon, getNavbarExploreIcon, getNavbarLibraryIcon } from '../helpers/icons';
import { getFontStyle } from '../utils/fonts';
import { fromRightWithFade } from './transitions';
import { theme } from '../theme';
import { config } from '../configs/config';

/* ------------- Helpers ------------- */
const defaultHeaderObject: NavigationStackOptions = {
  header: props => <Header scene={props.scene} />,
};

const createDefaultStackNavigator = (screensObject: any, customOptions?: any) =>
  createStackNavigator(screensObject, {
    defaultNavigationOptions: { ...defaultHeaderObject },
    cardStyle: { backgroundColor: theme.colors.background },
    headerMode: 'screen',
    transitionConfig: config.isAndroid ? fromRightWithFade : undefined,
    ...customOptions,
  });

/* ------------- Navigation ------------- */
const BottomTabs = createBottomTabNavigator(
  {
    [tabNames.browse]: {
      screen: createDefaultStackNavigator({
        [tabNames.browse]: BrowseScreen,
        [routeNames.SectionListScreen]: SectionListScreen,
        [routeNames.MovieDetailsScreen]: MovieDetailsScreen,
      }),
    },
    [tabNames.explore]: {
      screen: createDefaultStackNavigator({ [tabNames.explore]: ExploreScreen }),
    },
    [tabNames.library]: {
      screen: createDefaultStackNavigator({
        [tabNames.library]: LibraryScreen,
        [routeNames.Settings]: SettingsScreen,
        [routeNames.SectionListScreen]: SectionListScreen,
        [routeNames.MovieDetailsScreen]: MovieDetailsScreen,
      }),
    },
  },
  {
    tabBarOptions: {
      safeAreaInset: undefined,
      activeBackgroundColor: theme.colors.bottomNavbar,
      inactiveBackgroundColor: theme.colors.bottomNavbar,
      activeTintColor: theme.gray.lightest,
      inactiveTintColor: theme.gray.light,
      labelStyle: { ...getFontStyle() },
      style: {
        borderTopColor: theme.colors.bottomNavbar,
        height: theme.specifications.bottomNavbarHeight,
        backgroundColor: theme.colors.bottomNavbar,
      },
      keyboardHidesTabBar: false,
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        switch (navigation.state.routeName) {
          case tabNames.browse:
            return getNavbarBrowseIcon({ tintColor: tintColor || 'black' });
          case tabNames.explore:
            return getNavbarExploreIcon({ tintColor: tintColor || 'black' });
          case tabNames.library:
            return getNavbarLibraryIcon({ tintColor: tintColor || 'black' });
          default:
            return null;
        }
      },
      tabBarComponent: NavbarWrapper,
      tabBarButtonComponent: NavbarButtonWrapper,
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        navigation.dispatch(StackActions.popToTop());
        defaultHandler();
      },
    }),
  },
);

const AuthStack = createDefaultStackNavigator({
  [routeNames.AuthWelcome]: { screen: AuthWelcome },
  [routeNames.AuthLogin]: { screen: AuthLogin },
});

const HomeStack = createStackNavigator(
  { [routeNames.BottomTabs]: { screen: BottomTabs } },
  {
    headerMode: 'none',
  },
);

export const RootStack = createAppContainer(
  createSwitchNavigator({
    [routeNames.Splash]: { screen: SplashScreen },
    [routeNames.AuthStack]: { screen: AuthStack },
    [routeNames.HomeStack]: { screen: HomeStack },
  }),
);
