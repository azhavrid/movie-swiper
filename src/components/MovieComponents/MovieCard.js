import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Animated, Image, TouchableWithoutFeedback } from 'react-native';
import { AppText } from '../common';
import InnerShadow from '../InnerShadow';
import MovieScoreYear from './MovieScoreYear';
import Theme from '../../Theme';

const DETAILS_OPACITY = 0.9;

class MovieCard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFolded: true,
      detailsVisibleAnimatedValue: new Animated.Value(0)
    };

    this.isAnimating = false;
  }

  onCardPress = () => {
    const { isFolded, detailsVisibleAnimatedValue } = this.state;
    if (this.isAnimating) return;

    this.isAnimating = true;

    if (isFolded) {
      this.setState({ isFolded: !isFolded });
      Animated.timing(detailsVisibleAnimatedValue, {
        toValue: 1,
        duration: 300
      }).start(() => {
        this.isAnimating = false;
      });
    } else {
      Animated.timing(detailsVisibleAnimatedValue, {
        toValue: 0,
        duration: 300
      }).start(() => {
        this.setState({ isFolded: !isFolded }, () => {
          this.isAnimating = false;
        });
      });
    }
  };

  getDetailsAnimatedStyle() {
    const { detailsVisibleAnimatedValue } = this.state;
    const marginBottom = detailsVisibleAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['-100%', '0%']
    });
    return { marginBottom };
  }

  renderPosterImage() {
    const {
      movie: { poster_path },
      sourceUrlGetter
    } = this.props;

    return (
      // Used Image, because FastImage.preload doesn't provide callback when it's loaded
      <Image
        fadeDuration={0}
        resizeMode="cover"
        source={{ uri: sourceUrlGetter(poster_path) }}
        style={styles.card}
      />
    );
  }

  renderMovieTitle() {
    const { movie } = this.props;
    const { detailsVisibleAnimatedValue } = this.state;

    return (
      <Animated.View style={{ flex: 1, opacity: detailsVisibleAnimatedValue }}>
        <AppText style={styles.title} numberOfLines={1} type="title2">
          {movie.title}
        </AppText>
      </Animated.View>
    );
  }

  renderDetails() {
    const { movie } = this.props;

    return (
      <View>
        <Animated.View
          style={[styles.detailsContainer, styles.bottomCurved, this.getDetailsAnimatedStyle()]}
        >
          <View style={{ padding: Theme.spacing.small }}>
            <MovieScoreYear movie={movie} style={{ marginBottom: Theme.spacing.tiny }} />
            <AppText numberOfLines={12}>{movie.overview}</AppText>
          </View>
        </Animated.View>
      </View>
    );
  }

  render() {
    const { isFolded } = this.state;

    return (
      <TouchableWithoutFeedback onPress={this.onCardPress}>
        <View style={styles.container}>
          {this.renderPosterImage()}
          <InnerShadow style={styles.topCurved} startOpacity={0.5} size={80} top />
          <View style={styles.bottomWrapper}>
            <View style={styles.titleContainer}>
              <InnerShadow
                style={isFolded && styles.bottomCurved}
                startOpacity={DETAILS_OPACITY}
                size={100}
                bottom
              />
              {this.renderMovieTitle()}
            </View>
            {!isFolded && this.renderDetails()}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const BORDER_RADIUS = 12;
const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: '100%',
    height: '100%'
  },
  card: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Theme.gray.dark,
    borderRadius: BORDER_RADIUS
  },
  topCurved: {
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS
  },
  bottomCurved: {
    borderBottomLeftRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS
  },
  bottomWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end'
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    paddingLeft: Theme.spacing.tiny
  },
  detailsContainer: {
    width: '100%',
    backgroundColor: `rgba(0,0,0,${DETAILS_OPACITY})`
  }
});

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  disabled: PropTypes.bool
};

export default MovieCard;
