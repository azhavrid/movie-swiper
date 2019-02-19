import Config from '../Config';

const fonts = {
  Raleway: {
    weights: {
      Bold: '700',
      SemiBold: '600',
      Regular: '400'
    },
    styles: {}
  }
};

export const getFontStyleObject = (params = {}) => {
  const { family = 'Raleway', weight = 'Regular', style } = params;
  // eslint-disable-next-line
  if (__DEV__) checkOptions({ family, weight, style });
  const { weights, styles } = fonts[family];

  if (Config.isAndroid) {
    const suffix = (weights[weight] ? weight : '') + (styles[style] ? style : '');
    return { fontFamily: family + (suffix.length ? `-${suffix}` : '') };
  }

  return {
    fontFamily: family,
    fontWeight: weights[weight] || weights.Regular,
    fontStyle: styles[style] || 'normal'
  };
};

// Local functions
const checkOptions = ({ family, weight, style }) => {
  const fontFamily = fonts[family];

  if (!fontFamily) {
    console.warn(`There is no ${family} font family.`);
    return;
  }

  if (!fontFamily.weights[weight]) {
    console.warn(`There is no ${weight} font weight.`);
    return;
  }

  if (style && !fontFamily.styles[style]) {
    console.warn(`There is no ${style} font style.`);
    return;
  }
};
