import React from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import { View, StyleSheet, Animated } from 'react-native';

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

class ProgressiveImage extends React.PureComponent {
  state = {
    isImageShown: false,
    imageAnimatedOpacity: new Animated.Value(0)
  };

  onImageLoad = () => {
    const { onLoad } = this.props;

    onLoad && onLoad();
    Animated.timing(this.state.imageAnimatedOpacity, { toValue: 1, duration: 300 }).start(() =>
      this.setState({ isImageShown: true })
    );
  };

  render() {
    const { imageStyle, source, style, thumbnailBlurred, thumbnailSource, ...props } = this.props;
    const { imageAnimatedOpacity, isImageShown } = this.state;

    return (
      <View style={style}>
        {thumbnailSource && !isImageShown && (
          <FastImage
            source={thumbnailSource}
            blurRadius={thumbnailBlurred ? 1 : 0}
            style={[StyleSheet.absoluteFill, imageStyle]}
          />
        )}
        <AnimatedFastImage
          source={source}
          {...props}
          onLoad={this.onImageLoad}
          style={[StyleSheet.absoluteFill, { opacity: imageAnimatedOpacity }, imageStyle]}
        />
      </View>
    );
  }
}

ProgressiveImage.propTypes = {
  source: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  thumbnailSource: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  thumbnailBlurred: PropTypes.bool,
  style: PropTypes.any,
  imageStyle: PropTypes.any
};

ProgressiveImage.defaultProps = {
  thumbnailBlurred: true
};

export default ProgressiveImage;
