import React from 'react';
import { ViewStyle } from 'react-native';
import { getW780ImageUrl, getW92ImageUrl } from '../../api/urls';
import ProgressiveImage from '../ProgressiveImage';

/* ------------- Props and State ------------- */
type OwnProps = {
  path: string;
  style?: ViewStyle;
};

type Props = OwnProps;

/* ------------- Class ------------- */
const MovieCardPosterImage = ({ path, style }: Props) => (
  <ProgressiveImage
    resizeMode="cover"
    style={style}
    source={{ uri: getW780ImageUrl(path) }}
    thumbnailSource={{ uri: getW92ImageUrl(path) }}
  />
);

export default React.memo(MovieCardPosterImage);
