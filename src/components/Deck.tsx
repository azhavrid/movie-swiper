import React from 'react';
import { Animated, Dimensions, LayoutChangeEvent, StyleSheet, View } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerStateChangeEvent,
  State as GestureState,
} from 'react-native-gesture-handler';

/* ------------- Local ------------- */
const { add, multiply } = Animated;
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const rotationAngle = 30;
const horizontalThreshold = screenWidth / 3;
const verticalThreshold = screenHeight / 4;
const horizontalSwipeOutOffset = screenWidth * 1.4;
const getAnimatedDistanceSquared = (dx: Animated.Animated, dy: Animated.Animated) =>
  add(multiply(dx, dx), multiply(dy, dy));

/* ------------- Types ------------- */
export type SwipeDirection = 'left' | 'right' | 'top';

export interface SwipeThresholds {
  toLeft: Animated.Animated;
  toRight: Animated.Animated;
  toTop: Animated.Animated;
}

export interface RenderCardParams {
  isTopCard: boolean;
  swipeThresholds?: SwipeThresholds;
}

/* ------------- Props and State ------------- */
type Props<ItemT> = {
  data: ItemT[];
  keyExtractor: (item: ItemT) => string;
  renderCard: (item: ItemT, params: RenderCardParams) => React.ReactElement;
  renderNoMoreCards?: () => React.ReactElement;

  onSwipeStart?: (item: ItemT) => void;
  onSwipeEnd?: (item: ItemT) => void;
  onSwiped?: (item: ItemT) => void;
  onSwipedLeft?: (item: ItemT) => void;
  onSwipedRight?: (item: ItemT) => void;
  onSwipedTop?: (item: ItemT) => void;
};

type State = typeof initialState;

const initialState = {
  deckHeight: screenHeight,
  hasTouchStartedOnTop: false,
};

/* ------------- Component ------------- */
class Deck<ItemT> extends React.PureComponent<Props<ItemT>, State> {
  state = initialState;
  drag = new Animated.ValueXY({ x: 0, y: 0 });
  dragDistanceSquared = getAnimatedDistanceSquared(this.drag.x, this.drag.y);
  touchStartTime = 0;

  onDeckLayout = ({ nativeEvent }: LayoutChangeEvent) => this.setState({ deckHeight: nativeEvent.layout.height });

  onPanGestureEvent = Animated.event([{ nativeEvent: { translationX: this.drag.x, translationY: this.drag.y } }], {
    useNativeDriver: true,
  });

  onPanGestureStateChange = (event: PanGestureHandlerStateChangeEvent) => {
    const { data, onSwipeStart, onSwipeEnd } = this.props;
    const { deckHeight } = this.state;
    const { state: gestureState, y } = event.nativeEvent;
    const item = data[0];

    if (gestureState === GestureState.BEGAN) {
      onSwipeStart && onSwipeStart(item);
      this.touchStartTime = new Date().getTime();
      this.setState({ hasTouchStartedOnTop: y < deckHeight * 0.5 });
    } else if (gestureState === GestureState.CANCELLED || gestureState === GestureState.END) {
      onSwipeEnd && onSwipeEnd(item);
      this.handleSwipe(event.nativeEvent);
    }
  };

  onSwipeComplete = (direction: SwipeDirection) => {
    const { data, onSwipedTop, onSwipedLeft, onSwipedRight, onSwiped } = this.props;
    const swipeFunction = direction === 'top' ? onSwipedTop : direction === 'left' ? onSwipedLeft : onSwipedRight;
    const item = data[0];

    onSwiped && onSwiped(item);
    swipeFunction && swipeFunction(item);
    this.drag.setValue({ x: 0, y: 0 });
  };

  getTopCardAnimatedStyle = () => {
    const { hasTouchStartedOnTop } = this.state;
    const { x: translateX, y: translateY } = this.drag;

    const rotate = translateX.interpolate({
      inputRange: [0, horizontalSwipeOutOffset],
      outputRange: ['0deg', `${hasTouchStartedOnTop ? '' : '-'}${rotationAngle}deg`],
    });

    return { transform: [{ rotate }, { translateX }, { translateY }] };
  };

  forceSwipe = (direction: SwipeDirection) => {
    const swipeOutDuration = 200;
    const toValueMap: Record<SwipeDirection, { x: number; y: number }> = {
      top: { x: 0, y: -screenHeight },
      left: { x: -horizontalSwipeOutOffset, y: 0 },
      right: { x: horizontalSwipeOutOffset, y: 0 },
    };

    Animated.timing(this.drag, {
      toValue: toValueMap[direction],
      duration: swipeOutDuration,
      useNativeDriver: true,
    }).start(() => this.onSwipeComplete(direction));
  };

  resetCard = () => {
    Animated.spring(this.drag, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start();
  };

  handleSwipe = ({ translationX, translationY }: PanGestureHandlerStateChangeEvent['nativeEvent']) => {
    const swipeDuration = new Date().getTime() - this.touchStartTime;
    const isFastSwipe = swipeDuration < 220;
    const fastSwipeThreshold = 25;
    const adx = Math.abs(translationX);
    const ady = Math.abs(translationY);
    const isFastHorizontal = isFastSwipe && adx > fastSwipeThreshold && adx > ady;
    const isFastVertical = isFastSwipe && ady > fastSwipeThreshold;

    if (adx > horizontalThreshold || isFastHorizontal) {
      this.forceSwipe(translationX > 0 ? 'right' : 'left');
    } else if (ady > verticalThreshold || isFastVertical) {
      if (translationY < 0) {
        this.forceSwipe('top');
      } else {
        this.resetCard();
      }
    } else {
      this.resetCard();
    }
  };

  getCardAnimatedStyle = () => {
    const secondCardInitialScale = 0.95;
    const scale = this.dragDistanceSquared.interpolate({
      inputRange: [0, 100, 14400],
      outputRange: [secondCardInitialScale, secondCardInitialScale, 1],
      extrapolate: 'clamp',
    });

    return { transform: [{ scale }] };
  };

  getSwipeThresholds = (): SwipeThresholds => {
    const { x, y } = this.drag;

    const toLeft = x.interpolate({
      inputRange: [-horizontalThreshold, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const toRight = x.interpolate({
      inputRange: [0, horizontalThreshold],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    const toTop = y.interpolate({
      inputRange: [-verticalThreshold, -20],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return { toLeft, toRight, toTop };
  };

  renderTopCard = (item: ItemT) => {
    const { keyExtractor, renderCard } = this.props;
    const params: RenderCardParams = { isTopCard: true, swipeThresholds: this.getSwipeThresholds() };

    return (
      <PanGestureHandler
        avgTouches
        key={keyExtractor(item)}
        onGestureEvent={this.onPanGestureEvent}
        onHandlerStateChange={this.onPanGestureStateChange}
      >
        <Animated.View style={[styles.topCardStyle, this.getTopCardAnimatedStyle()]}>
          {renderCard(item, params)}
        </Animated.View>
      </PanGestureHandler>
    );
  };

  renderBottomCard = (item: ItemT) => {
    const { keyExtractor, renderCard } = this.props;
    const params: RenderCardParams = { isTopCard: false };

    return (
      <Animated.View key={keyExtractor(item)} style={[styles.cardStyle, this.getCardAnimatedStyle()]}>
        {renderCard(item, params)}
      </Animated.View>
    );
  };

  renderCards = () => {
    const { data } = this.props;

    return data
      .map((item, index) => {
        // For optimization render only 2 topmost next cards
        if (index > 1) return null;

        if (index === 0) return this.renderTopCard(item);

        return this.renderBottomCard(item);
      })
      .reverse();
  };

  render() {
    const { data, renderNoMoreCards } = this.props;

    return (
      <View style={styles.container} onLayout={this.onDeckLayout}>
        <View style={StyleSheet.absoluteFill}>{data.length < 2 && renderNoMoreCards?.()}</View>
        {this.renderCards()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 14,
  },
  topCardStyle: {
    width: '100%',
    height: '100%',
  },
  cardStyle: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Deck;
