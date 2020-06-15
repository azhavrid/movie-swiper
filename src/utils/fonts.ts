import { TextStyle } from 'react-native';

import { ValuesOf } from '../types';

/* ------------- Types ------------- */
interface AppFonts {
  Inter: Font;
}

interface Font {
  weights: FontWeightKeys[];
  styles: FontStyleKeys[];
}

type FontFamilyKeys = keyof typeof appFonts;
type FontWeightKeys = keyof typeof fontWeightsMap;
type FontWeightValue = ValuesOf<Pick<TextStyle, 'fontWeight'>>;
type FontStyleKeys = ValuesOf<Pick<TextStyle, 'fontStyle'>>;

interface FontStyleParams {
  family?: FontFamilyKeys;
  weight?: FontWeightKeys;
  style?: FontStyleKeys;
}

/* ------------- Fonts ------------- */
const fontWeightsMap: Record<string, FontWeightValue> = {
  Thin: '100',
  ExtraLight: '200',
  Light: '300',
  Regular: '400',
  Medium: '500',
  SemiBold: '600',
  Bold: '700',
  ExtraBold: '800',
  Black: '900',
};

const appFonts: AppFonts = {
  Inter: {
    weights: ['Light', 'Regular', 'Medium', 'SemiBold', 'Bold'],
    styles: ['normal'],
  },
};

/* ------------- Utils ------------- */
export const getFontStyle = (params: FontStyleParams = {}): TextStyle => {
  const { family = 'Inter', weight = 'Regular', style = 'normal' } = params;
  const { weights, styles } = appFonts[family];

  const isWeightSupported = weights.includes(weight);
  const isStyleSupported = styles.includes(style);
  if (!isWeightSupported || !isStyleSupported) {
    console.warn(`[FONTS] ${family}-${weight}-${style} is not supported`);
  }

  const fontWeight = isWeightSupported ? weight : 'Regular';
  const fontStyle = isStyleSupported ? style : 'normal';

  const suffix = `${fontWeight}${fontStyle === 'italic' ? 'Italic' : ''}`;
  return { fontFamily: `${family}-${suffix}` };
};
