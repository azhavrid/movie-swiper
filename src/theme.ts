import { StyleSheet, TextStyle } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { config } from './configs/config';
import { getFontStyle } from './utils/fonts';

/* ------------- Types ------------- */
interface AppTypography {
  largeTitle: TextStyle;
  title1: TextStyle;
  title2: TextStyle;
  title3: TextStyle;
  titleCaption: TextStyle;
  header: TextStyle;
  button: TextStyle;
  textButton: TextStyle;
  input: TextStyle;
  headline: TextStyle;
  body: TextStyle;
  caption1: TextStyle;
  caption2: TextStyle;
  caption3: TextStyle;
}

export type AppTypographyKeys = keyof AppTypography;

/* ------------- Local colors ------------- */
const gray = {
  black: '#000',
  darkest: '#121212',
  darker: '#1a1a1a',
  dark: '#353535',
  light: '#828282',
  lighter: '#cfcfcf',
  lightest: '#f8f8f8',
  white: '#fff',
};

const colors = {
  primary: '#00d474',
  primaryVariant: '#00af60',

  transparentBlack: 'rgba(0,0,0,0.6)',
  transparentBlack2: 'rgba(0,0,0,0.4)',
  transparentBlack3: 'rgba(0,0,0,0.2)',
  transparentBlack4: 'rgba(0,0,0,0.1)',
  transparentWhite: 'rgba(255,255,255,0.6)',
  transparentWhite2: 'rgba(255,255,255,0.4)',
  transparentWhite3: 'rgba(255,255,255,0.2)',
  transparentWhite4: 'rgba(255,255,255,0.1)',

  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
};

/* ------------- Theme ------------- */
export const theme = {
  // --- Dimensions ---
  spacing: {
    xTiny: 4,
    tiny: 8,
    small: 16,
    base: 24,
    large: 48,
    xLarge: 64,
  },
  specifications: {
    statusBarHeight: getStatusBarHeight(),
    headerHeight: 54,
    bottomNavbarHeight: 50,
    get fullHeaderHeight() {
      return this.headerHeight + this.statusBarHeight;
    },

    smallIconSize: 20,
    iconSize: 30,
    largeIconSize: 40,
    hugeIconSize: 120,
    activityIndicatorSize: config.isAndroid ? 60 : <const>'large',
    activitySmallIndicatorSize: config.isAndroid ? 30 : <const>'small',
    posterAspectRation: 0.6667,
    backdropAspectRation: 1.78,
  },

  // --- Colors ---
  gray,
  colors: {
    ...colors,
    background: gray.darker,
    header: gray.darkest,
    bottomNavbar: gray.darkest,
    textInputSelection: `${colors.primary}aa`,
  },

  // --- Typography ---
  typography: StyleSheet.create<AppTypography>({
    largeTitle: {
      fontSize: 34,
    },
    title1: {
      fontSize: 28,
    },
    title2: {
      fontSize: 22,
    },
    title3: {
      fontSize: 18,
    },
    titleCaption: {
      fontSize: 16,
    },
    header: {
      fontSize: 18,
      letterSpacing: 0.5,
      ...getFontStyle({ weight: 'SemiBold' }),
    },
    button: {
      fontSize: 18,
      letterSpacing: 0.5,
      ...getFontStyle({ weight: 'SemiBold' }),
    },
    textButton: {
      fontSize: 16,
    },
    input: {
      fontSize: 18,
    },
    headline: {
      fontSize: 17,
      letterSpacing: 0.5,
      ...getFontStyle({ weight: 'SemiBold' }),
    },
    body: {
      fontSize: 15,
    },
    caption1: {
      fontSize: 14,
    },
    caption2: {
      fontSize: 12,
    },
    caption3: {
      fontSize: 10,
    },
  }),
};
