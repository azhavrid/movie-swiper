import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { add, multiply } = Animated;
const { width, height } = Dimensions.get('window');
const ROTATION_ANGLE = 30;
const HORIZONTAL_THRESHOLD = width / 3;
const VERTICAL_THRESHOLD = height / 4;
const HORIZONTAL_SWIPE_OUT_OFFSET = width * 1.4;
const getAnimatedDistanceSquared = (dx, dy) => add(multiply(dx, dx), multiply(dy, dy));

class Deck extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      deckIndex: 0,
      deckHeight: height,
      hasTouchStartedOnTop: false
    };

    this.drag = new Animated.ValueXY({ x: 0, y: 0 });
    this.dragDistanceSquared = getAnimatedDistanceSquared(this.drag.x, this.drag.y);
    this.touchStartTime = 0;
    this.createPanGestureHandlers();
  }

  onSwipeComplete(direction) {
    const { onSwipedTop, onSwipedLeft, onSwipedRight, data, useDeckIndex } = this.props;
    const { deckIndex } = this.state;
    const item = data[deckIndex];
    const swipeFunction =
      direction === 'top' ? onSwipedTop : direction === 'left' ? onSwipedLeft : onSwipedRight;

    swipeFunction(item);
    this.drag.setValue({ x: 0, y: 0 });
    if (useDeckIndex) this.setState({ deckIndex: deckIndex + 1 });
  }

  onDeckLayout = ({
    nativeEvent: {
      layout: { height }
    }
  }) => this.setState({ deckHeight: height });

  getTopCardAnimatedStyle() {
    const { hasTouchStartedOnTop } = this.state;
    const { x: translateX, y: translateY } = this.drag;

    const rotate = translateX.interpolate({
      inputRange: [0, HORIZONTAL_SWIPE_OUT_OFFSET],
      outputRange: ['0deg', `${hasTouchStartedOnTop ? '' : '-'}${ROTATION_ANGLE}deg`]
    });

    return { transform: [{ rotate }, { translateX }, { translateY }] };
  }

  getCardAnimatedStyle() {
    const prevCardScale = 0.95;
    const scale = this.dragDistanceSquared.interpolate({
      inputRange: [0, 100, 14400],
      outputRange: [prevCardScale, prevCardScale, 1],
      extrapolate: 'clamp'
    });

    return { transform: [{ scale }] };
  }

  getSwipeLabelsOpacities() {
    const { x, y } = this.drag;

    const toLeftOpacity = x.interpolate({
      inputRange: [-HORIZONTAL_THRESHOLD, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });

    const toRightOpacity = x.interpolate({
      inputRange: [0, HORIZONTAL_THRESHOLD],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });

    const toTopOpacity = y.interpolate({
      inputRange: [-VERTICAL_THRESHOLD, -20],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });

    return { toLeftOpacity, toRightOpacity, toTopOpacity };
  }

  createPanGestureHandlers() {
    this.onPanGestureEvent = Animated.event(
      [{ nativeEvent: { translationX: this.drag.x, translationY: this.drag.y } }],
      { useNativeDriver: true }
    );
    this.onPanGestureStateChange = event => {
      const { onSwipeStart, onSwipeEnd } = this.props;
      const { deckHeight } = this.state;
      const { state: gestureState, y } = event.nativeEvent;

      if (gestureState === State.BEGAN) {
        onSwipeStart();
        this.touchStartTime = new Date().getTime();
        this.setState({ hasTouchStartedOnTop: y < deckHeight * 0.5 });
      } else if (gestureState === State.CANCELLED || gestureState === State.END) {
        onSwipeEnd();
        this.handleSwipe(event.nativeEvent);
      }
    };
  }

  handleSwipe({ translationX, translationY }) {
    const swipeDuration = new Date().getTime() - this.touchStartTime;
    const isFastSwipe = swipeDuration < 220;
    const fastSwipeThreshold = 25;
    const abs = Math.abs;
    const adx = abs(translationX);
    const ady = abs(translationY);
    const isFastHorizontal = isFastSwipe && adx > fastSwipeThreshold && adx > ady;
    const isFastVertical = isFastSwipe && ady > fastSwipeThreshold;

    if (adx > HORIZONTAL_THRESHOLD || isFastHorizontal) {
      this.forceSwipe(translationX > 0 ? 'right' : 'left');
    } else if (ady > VERTICAL_THRESHOLD || isFastVertical) {
      if (translationY < 0) {
        this.forceSwipe('top');
      } else {
        this.resetCard();
      }
    } else {
      this.resetCard();
    }
  }

  forceSwipe(direction) {
    const swipeOutDuration = 200;

    const toValue =
      direction === 'top'
        ? { x: 0, y: -height }
        : direction === 'left'
        ? { x: -HORIZONTAL_SWIPE_OUT_OFFSET, y: 0 }
        : { x: HORIZONTAL_SWIPE_OUT_OFFSET, y: 0 };

    Animated.timing(this.drag, {
      toValue,
      duration: swipeOutDuration,
      useNativeDriver: true
    }).start(() => {
      this.onSwipeComplete(direction);
    });
  }

  resetCard = () =>
    Animated.spring(this.drag, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start();

  renderCards() {
    const { data, keyExtractor, renderCard, renderCardSwipeLabels } = this.props;
    const { deckIndex } = this.state;
    if (deckIndex >= data.length) return null;

    return data
      .map((item, i) => {
        // Render only 2 topmost next cards
        if (i < deckIndex || deckIndex + 1 < i) return null;

        if (i === deckIndex) {
          return (
            <PanGestureHandler
              avgTouches
              key={keyExtractor && keyExtractor(item)}
              onGestureEvent={this.onPanGestureEvent}
              onHandlerStateChange={this.onPanGestureStateChange}
            >
              <Animated.View
                style={[styles.topCardStyle, this.getTopCardAnimatedStyle()]}
                key={keyExtractor && keyExtractor(item)}
              >
                {renderCard(item, true)}
                {renderCardSwipeLabels(this.getSwipeLabelsOpacities())}
              </Animated.View>
            </PanGestureHandler>
          );
        }

        return (
          <Animated.View
            key={keyExtractor && keyExtractor(item)}
            style={[styles.cardStyle, this.getCardAnimatedStyle()]}
          >
            {renderCard(item)}
          </Animated.View>
        );
      })
      .reverse();
  }

  render() {
    const { data, style, renderNoMoreCards } = this.props;
    const { deckIndex } = this.state;

    return (
      <View style={style} onLayout={this.onDeckLayout}>
        {deckIndex + 2 > data.length && renderNoMoreCards()}
        {this.renderCards()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topCardStyle: {
    width: '100%',
    height: '100%'
  },
  cardStyle: {
    ...StyleSheet.absoluteFillObject
  }
});

Deck.propTypes = {
  data: PropTypes.array.isRequired,
  renderCard: PropTypes.func.isRequired,
  renderCardSwipeLabels: PropTypes.func,
  renderNoMoreCards: PropTypes.func,
  keyExtractor: PropTypes.func,
  useDeckIndex: PropTypes.bool,

  onSwipeStart: PropTypes.func,
  onSwipeEnd: PropTypes.func,
  onSwiped: PropTypes.func,
  onSwipedLeft: PropTypes.func,
  onSwipedRight: PropTypes.func,
  onSwipedTop: PropTypes.func
};

Deck.defaultProps = {
  renderCardSwipeLabels: () => null,
  renderNoMoreCards: () => null,
  useDeckIndex: true,

  onSwipeStart: () => {},
  onSwipeEnd: () => {},
  onSwiped: () => {},
  onSwipedLeft: () => {},
  onSwipedRight: () => {},
  onSwipedTop: () => {}
};

export default Deck;
