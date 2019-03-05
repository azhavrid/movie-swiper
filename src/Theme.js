import { getStatusBarHeight } from 'react-native-status-bar-height';
import { getFontStyleObject } from './utils/font';
import Config from './Config';

const Theme = {};

// ------------------------------------------------------------
// Sizing
// ------------------------------------------------------------
Theme.spacing = {
  xTiny: 4,
  tiny: 8,
  small: 16,
  base: 24,
  large: 48,
  xLarge: 64
};

Theme.specifications = {
  statusBarHeight: getStatusBarHeight(),
  headerHeight: 54,
  bottomNavbarHeight: 50,

  smallIconSize: 20,
  iconSize: 30,
  largeIconSize: 40,
  hugeIconSize: 120,
  activityIndicatorSize: Config.isAndroid ? 60 : 'large',
  activitySmallIndicatorSize: Config.isAndroid ? 30 : 'small',
  

  posterAspectRation: 0.6667,
  backdropAspectRation: 1.78
};

// ------------------------------------------------------------
// Colors
// ------------------------------------------------------------
Theme.gray = {
  darkest: '#121212',
  darker: '#1a1a1a',
  dark: '#353535',
  light: '#828282',
  lighter: '#cfcfcf',
  lightest: '#f8f8f8'
};

const colors = {
  primary: '#00d474',
  primaryVariant: '#00af60',
  transparentBlack: 'rgba(0,0,0,0.6)',

  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8'
};

Theme.colors = {
  ...colors,
  background: Theme.gray.darker,
  header: Theme.gray.darkest,
  bottomNavbar: Theme.gray.darkest,
  textInputSelection: `${colors.primary}aa`
};
// ------------------------------------------------------------
// Typography
// ------------------------------------------------------------
Theme.typography = {
  largeTitle: {
    fontSize: 34
  },
  title1: {
    fontSize: 28
  },
  title2: {
    fontSize: 22
  },
  title3: {
    fontSize: 18
  },
  titleCaption: {
    fontSize: 16
  },
  header: {
    fontSize: 18,
    letterSpacing: 0.5,
    ...getFontStyleObject({ weight: 'SemiBold' })
  },
  button: {
    fontSize: 18,
    letterSpacing: 0.5,
    ...getFontStyleObject({ weight: 'Bold' })
  },
  onlyTextButton: {
    fontSize: 16
  },
  input: {
    fontSize: 18
  },
  headline: {
    fontSize: 17,
    letterSpacing: 0.5,
    ...getFontStyleObject({ weight: 'SemiBold' })
  },
  body: {
    fontSize: 15
  },
  caption1: {
    fontSize: 14
  },
  caption2: {
    fontSize: 12
  },
  caption3: {
    fontSize: 10
  }
};

export default Theme;
