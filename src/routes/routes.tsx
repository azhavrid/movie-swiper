import React from 'react';
import { NavigationContainer, DarkTheme, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import NavbarWrapper from '../components/NavbarWrapper';
import { getNavbarBrowseIcon, getNavbarExploreIcon, getNavbarLibraryIcon, getLibrarySettingsIcon } from '../helpers/icons';
import AuthLogin from '../screens/auth/AuthLogin';
import AuthWelcome from '../screens/auth/AuthWelcome';
import BrowseScreen from '../screens/BrowseScreen';
import ExploreScreen from '../screens/ExploreScreen';
import LibraryScreen from '../screens/LibraryScreen';
import MovieDetailsScreen from '../screens/movie/MovieDetailsScreen';
import SectionListScreen from '../screens/movie/SectionListScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SplashScreen from '../screens/SplashScreen';
import { theme } from '../theme';
import { getFontStyle } from '../utils/fonts';
import { routeNames, tabNames } from './routeNames';
import { navigationRef } from './NavigationService';
import { sectionData } from '../redux/sections/sectionData';
import { SectionKey } from '../redux/sections/types';
import TouchableScale from '../components/common/TouchableScale';

export type AuthStackParamList = {
  [routeNames.AuthWelcome]: undefined;
  [routeNames.AuthLogin]: undefined;
};

export type BrowseStackParamList = {
  BrowseHome: undefined;
  [routeNames.SectionListScreen]: { sectionKey: SectionKey };
  [routeNames.MovieDetailsScreen]: { movieId: number };
};

export type ExploreStackParamList = {
  ExploreHome: undefined;
};

export type LibraryStackParamList = {
  LibraryHome: undefined;
  [routeNames.Settings]: undefined;
  [routeNames.SectionListScreen]: { sectionKey: SectionKey };
  [routeNames.MovieDetailsScreen]: { movieId: number };
};

export type BottomTabsParamList = {
  [tabNames.browse]: NavigatorScreenParams<BrowseStackParamList>;
  [tabNames.explore]: NavigatorScreenParams<ExploreStackParamList>;
  [tabNames.library]: NavigatorScreenParams<LibraryStackParamList>;
};

export type RootStackParamList = {
  [routeNames.Splash]: undefined;
  [routeNames.AuthStack]: NavigatorScreenParams<AuthStackParamList>;
  [routeNames.HomeStack]: NavigatorScreenParams<{ [routeNames.BottomTabs]: NavigatorScreenParams<BottomTabsParamList> }>;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStackNav = createNativeStackNavigator<AuthStackParamList>();
const BrowseStackNav = createNativeStackNavigator<BrowseStackParamList>();
const ExploreStackNav = createNativeStackNavigator<ExploreStackParamList>();
const LibraryStackNav = createNativeStackNavigator<LibraryStackParamList>();
const HomeStackNav = createNativeStackNavigator();
const Tab = createBottomTabNavigator<BottomTabsParamList>();

const screenHeaderOptions = {
  headerStyle: { backgroundColor: theme.colors.header },
  headerTintColor: theme.gray.lightest,
  headerTitleStyle: { ...getFontStyle({ weight: 'SemiBold' }), fontSize: 18 },
  headerShadowVisible: false,
  contentStyle: { backgroundColor: theme.colors.background },
};

const BrowseStack = () => (
  <BrowseStackNav.Navigator screenOptions={screenHeaderOptions}>
    <BrowseStackNav.Screen name="BrowseHome" component={BrowseScreen} options={{ title: 'Browse' }} />
    <BrowseStackNav.Screen
      name={routeNames.SectionListScreen}
      component={SectionListScreen}
      options={({ route }) => ({ title: sectionData[route.params.sectionKey]?.title || 'Movies' })}
    />
    <BrowseStackNav.Screen
      name={routeNames.MovieDetailsScreen}
      component={MovieDetailsScreen}
      options={{ title: 'Movie' }}
    />
  </BrowseStackNav.Navigator>
);

const ExploreStack = () => (
  <ExploreStackNav.Navigator screenOptions={{ ...screenHeaderOptions, headerShown: false }}>
    <ExploreStackNav.Screen name="ExploreHome" component={ExploreScreen} />
  </ExploreStackNav.Navigator>
);

const LibraryStack = () => (
  <LibraryStackNav.Navigator screenOptions={screenHeaderOptions}>
    <LibraryStackNav.Screen
      name="LibraryHome"
      component={LibraryScreen}
      options={({ navigation }) => ({
        title: 'Library',
        headerRight: () => (
          <TouchableScale onPress={() => navigation.navigate(routeNames.Settings)}>
            {getLibrarySettingsIcon()}
          </TouchableScale>
        ),
      })}
    />
    <LibraryStackNav.Screen name={routeNames.Settings} component={SettingsScreen} options={{ title: 'Settings' }} />
    <LibraryStackNav.Screen
      name={routeNames.SectionListScreen}
      component={SectionListScreen}
      options={({ route }) => ({ title: sectionData[route.params.sectionKey]?.title || 'Movies' })}
    />
    <LibraryStackNav.Screen
      name={routeNames.MovieDetailsScreen}
      component={MovieDetailsScreen}
      options={{ title: 'Movie' }}
    />
  </LibraryStackNav.Navigator>
);

const TabBar = (props: BottomTabBarProps) => <NavbarWrapper {...props} />;

const BottomTabs = () => (
  <Tab.Navigator
    tabBar={TabBar}
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: theme.gray.lightest,
      tabBarInactiveTintColor: theme.gray.light,
      tabBarStyle: {
        borderTopColor: theme.colors.bottomNavbar,
        height: theme.specifications.bottomNavbarHeight,
        backgroundColor: theme.colors.bottomNavbar,
      },
      tabBarLabelStyle: { ...getFontStyle() },
      tabBarIcon: ({ color }) => {
        switch (route.name) {
          case tabNames.browse:
            return getNavbarBrowseIcon({ tintColor: color });
          case tabNames.explore:
            return getNavbarExploreIcon({ tintColor: color });
          case tabNames.library:
            return getNavbarLibraryIcon({ tintColor: color });
          default:
            return null;
        }
      },
    })}
  >
    <Tab.Screen name={tabNames.browse} component={BrowseStack} />
    <Tab.Screen name={tabNames.explore} component={ExploreStack} />
    <Tab.Screen name={tabNames.library} component={LibraryStack} />
  </Tab.Navigator>
);

const AuthStack = () => (
  <AuthStackNav.Navigator screenOptions={{ ...screenHeaderOptions, headerShown: false }}>
    <AuthStackNav.Screen name={routeNames.AuthWelcome} component={AuthWelcome} />
    <AuthStackNav.Screen
      name={routeNames.AuthLogin}
      component={AuthLogin}
      options={{ headerShown: true, title: 'Log In' }}
    />
  </AuthStackNav.Navigator>
);

const HomeStack = () => (
  <HomeStackNav.Navigator screenOptions={{ headerShown: false }}>
    <HomeStackNav.Screen name={routeNames.BottomTabs} component={BottomTabs} />
  </HomeStackNav.Navigator>
);

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: theme.colors.background,
    card: theme.colors.header,
    primary: theme.colors.primary,
    text: theme.gray.lightest,
    border: theme.colors.bottomNavbar,
  },
};

export const RootNavigator = () => (
  <NavigationContainer ref={navigationRef} theme={navTheme}>
    <RootStack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <RootStack.Screen name={routeNames.Splash} component={SplashScreen} />
      <RootStack.Screen name={routeNames.AuthStack} component={AuthStack} />
      <RootStack.Screen name={routeNames.HomeStack} component={HomeStack} />
    </RootStack.Navigator>
  </NavigationContainer>
);
