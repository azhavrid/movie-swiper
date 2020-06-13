import React from 'react';
import { Image, ImageStyle } from 'react-native';
import FastImage from 'react-native-fast-image';

import { getW780ImageUrl } from '../../api/urls';
import { config } from '../../configs/config';

/* ------------- Helpers ------------- */
export const getMovieCardPosterUrl = (path: string) => getW780ImageUrl(path);

/* ------------- Props and State ------------- */
type OwnProps = {
  path: string;
  style?: ImageStyle;
};
type Props = OwnProps;

/* ------------- Component ------------- */
const MovieCardPosterImage = ({ path, style }: Props) =>
  // Use Fast Image on IOS to remove poster flickering
  React.createElement(config.isAndroid ? Image : (FastImage as any), {
    resizeMode: 'cover',
    style: style,
    source: { uri: getMovieCardPosterUrl(path) },
  });

export default React.memo(MovieCardPosterImage);
