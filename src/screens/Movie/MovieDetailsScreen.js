import React from 'react';
import _ from 'lodash';
import { View, StyleSheet, Animated } from 'react-native';
import MovieDetails from '../../components/MovieComponents/MovieDetails';
import OpacityHeader from '../../components/OpacityHeader';
import withDelayedLoading from '../../components/hoc/withDelayedLoading';
import Theme from '../../Theme';

let id = 0;

class MovieDetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: ({ scene }) => (
      <OpacityHeader scene={scene} opacity={navigation.getParam('headerOpacity', 0)} />
    ),
    title: ' '
  });

  static getId = () => {
    id++;
    return id;
  };

  state = {
    yScrollOffset: new Animated.Value(0)
  };

  componentDidMount() {
    this.scrollViewHeight = 0;
    this.scrollContentHeight = 0;
    // eslint-disable-next-line
    requestAnimationFrame(() => this.linkHeaderOpacity());
  }

  onScrollLayout = ({ nativeEvent }) => {
    const {
      layout: { height }
    } = nativeEvent;
    this.scrollViewHeight = height;
    this.linkHeaderOpacity();
  };

  onScrollContentSizeChange = (contentWidth, contentHeight) => {
    this.scrollContentHeight = contentHeight;
    this.linkHeaderOpacity();
  };

  linkHeaderOpacity() {
    const { navigation } = this.props;
    const { yScrollOffset } = this.state;
    const { headerHeight } = Theme.specifications;

    const offsetOpacity = _.clamp(
      this.scrollContentHeight - this.scrollViewHeight,
      0.01,
      headerHeight * 2
    );
    const outOpacity = +(offsetOpacity > headerHeight * 0.4);

    const headerOpacity = yScrollOffset.interpolate({
      inputRange: [0, offsetOpacity],
      outputRange: [0, outOpacity],
      extrapolate: 'clamp'
    });
    navigation.setParams({ headerOpacity });
  }

  render() {
    const { navigation } = this.props;
    const { yScrollOffset } = this.state;
    const movie = navigation.getParam('movie');

    return (
      <View style={styles.container}>
        <Animated.ScrollView
          onLayout={this.onScrollLayout}
          onContentSizeChange={this.onScrollContentSizeChange}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: yScrollOffset } } }], {
            useNativeDriver: true
          })}
        >
          <MovieDetails movie={movie} />
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background
  }
});

export default withDelayedLoading(MovieDetailsScreen);
