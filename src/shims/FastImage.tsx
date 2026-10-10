import React from 'react';
import {
  Image,
  ImageProps,
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from 'react-native';

export type Source = ImageSourcePropType;
export type FastImageProperties = FastImageProps;
export type OnLoadEvent = Parameters<NonNullable<ImageProps['onLoad']>>[0];

export interface FastImageProps extends Omit<ImageProps, 'source' | 'resizeMode' | 'style'> {
  source: Source | { uri: string; priority?: string };
  style?: StyleProp<ImageStyle>;
  resizeMode?: ImageResizeMode | 'contain' | 'cover' | 'stretch' | 'center';
}

const normalizeSource = (source: FastImageProps['source']): ImageSourcePropType => {
  if (source && typeof source === 'object' && !Array.isArray(source) && 'uri' in source) {
    const { uri, priority: _priority, ...rest } = source as { uri: string; priority?: string };
    return { uri, ...rest };
  }
  return source as ImageSourcePropType;
};

const FastImage = ({ resizeMode = 'cover', source, ...props }: FastImageProps) => (
  <Image {...props} source={normalizeSource(source)} resizeMode={resizeMode as ImageResizeMode} />
);

FastImage.resizeMode = {
  contain: 'contain' as const,
  cover: 'cover' as const,
  stretch: 'stretch' as const,
  center: 'center' as const,
};

FastImage.priority = {
  low: 'low',
  normal: 'normal',
  high: 'high',
};

export default FastImage;
