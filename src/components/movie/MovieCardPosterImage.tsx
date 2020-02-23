import React from 'react';
import { Image, ImageStyle } from 'react-native';

import { getW780ImageUrl } from '../../api/urls';

/* ------------- Props and State ------------- */
type OwnProps = {
  path: string;
  style?: ImageStyle;
};

type Props = OwnProps;

export const getMovieCardPosterUrl = (path: string) => getW780ImageUrl(path);

/* ------------- Class ------------- */
const MovieCardPosterImage = ({ path, style }: Props) => (
  // Image is used instead of FastImage due to the fact that there is no way to determine when FastImage is preloaded
  // https://github.com/DylanVann/react-native-fast-image/issues/438
  <Image resizeMode="cover" style={style} source={{ uri: getMovieCardPosterUrl(path) }} />
);

export default React.memo(MovieCardPosterImage);
