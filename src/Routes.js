import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  StackActions
} from 'react-navigation';

import Splash from './screens/Splash';
import AuthWelcome from './screens/Auth/AuthWelcome';
import AuthLogin from './screens/Auth/AuthLogin';
import Browse from './screens/Browse';
import Explore from './screens/Explore';
import Library from './screens/Library';
import Settings from './screens/Settings';
import MoviesListScreen from './screens/Movie/MoviesListScreen';
import MovieDetailsScreen from './screens/Movie/MovieDetailsScreen';

import NavbarWrapper from './components/NavbarWrapper';
import NavbarButtonWrapper from './components/NavbarButtonWrapper';
import Header from './components/Header';
import { getNavbarBrowseIcon, getNavbarExploreIcon, getNavbarLibraryIcon } from './utils/icons';
import { getFontStyleObject } from './utils/font';
import { fromRightWithFade } from './utils/navigation';
import RouteNames from './RouteNames';
import Theme from './Theme';

const TabNames = {
  browse: 'Browse',
  explore: 'Explore',
  library: 'Library'
};

const defaultHeaderObject = {
  header: props => <Header scene={props.scene} />
};

const createDefaultStackNavigator = (screensObject, customOptions) =>
  createStackNavigator(screensObject, {
    defaultNavigationOptions: { ...defaultHeaderObject },
    cardStyle: {
      backgroundColor: '#000'
    },
    headerMode: 'screen',
    transitionConfig: () => fromRightWithFade(),
    ...customOptions
  });

// Navigation
const BottomTabs = createBottomTabNavigator(
  {
    [TabNames.browse]: {
      screen: createDefaultStackNavigator({
        Browse,
        [RouteNames.MovieListScreen]: MoviesListScreen,
        [RouteNames.MovieDetailsScreen]: MovieDetailsScreen
      })
    },
    [TabNames.explore]: {
      screen: createDefaultStackNavigator({ Explore })
    },
    [TabNames.library]: {
      screen: createDefaultStackNavigator({
        Library,
        [RouteNames.Settings]: Settings,
        [RouteNames.MovieListScreen]: MoviesListScreen,
        [RouteNames.MovieDetailsScreen]: MovieDetailsScreen
      })
    }
  },
  {
    tabBarOptions: {
      activeBackgroundColor: Theme.colors.bottomNavbar,
      inactiveBackgroundColor: Theme.colors.bottomNavbar,
      activeTintColor: Theme.gray.lightest,
      inactiveTintColor: Theme.gray.light,
      labelStyle: { ...getFontStyleObject() },
      style: {
        borderTopColor: Theme.colors.bottomNavbar,
        height: Theme.specifications.bottomNavbarHeight,
        backgroundColor: Theme.colors.bottomNavbar
      }
    },
    defaultNavigationOptions: ({ navigation }) => ({
      lazy: false,
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        switch (routeName) {
          case TabNames.browse:
            return getNavbarBrowseIcon({ tintColor });
          case TabNames.explore:
            return getNavbarExploreIcon({ tintColor });
          case TabNames.library:
            return getNavbarLibraryIcon({ tintColor });
          default:
            return null;
        }
      },
      tabBarComponent: NavbarWrapper,
      tabBarButtonComponent: NavbarButtonWrapper,
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        navigation.dispatch(StackActions.popToTop());
        defaultHandler();
      }
    })
  }
);

const AuthStack = createDefaultStackNavigator({
  [RouteNames.AuthWelcome]: { screen: AuthWelcome },
  [RouteNames.AuthLogin]: { screen: AuthLogin }
});

const HomeStack = createStackNavigator(
  { [RouteNames.BottomTabs]: { screen: BottomTabs } },
  { defaultNavigationOptions: () => ({ header: null }) }
);

export const RootStack = createAppContainer(
  createSwitchNavigator({
    [RouteNames.Splash]: { screen: Splash },
    [RouteNames.AuthStack]: { screen: AuthStack },
    [RouteNames.HomeStack]: { screen: HomeStack }
  })
);
