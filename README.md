<div align="center">
  <img src="https://i.imgur.com/t6UgkCM.png" alt="Movie Swiper" width="539" />
</div>

<h4 align="center">
  Unofficial client for <a href="https://www.themoviedb.org">TMDb</a> created with <a href="https://reactnative.dev/">React Native</a>
</h4>

<div align="center">
  <a href="https://reactjs.org/">
    <img src="https://img.shields.io/badge/react-16.9-green.svg" alt="React version">
  </a>
   <a href="https://reactnative.dev/">
    <img src="https://img.shields.io/badge/react--native-0.61.4-blue.svg" alt="React Native version">
  </a>
   <a href="https://github.com/azhavrid/movie-swiper-back/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/azhavrid/movie-swiper.svg" alt="License">
  </a>
</div>

## 🚀 Version 2.0

- React native 0.60+
- All business logic in redux
- Typescript support
- Eslint integration
- Performance optimization

## Screen Showcase

![Movie Swiper screen showcase](https://i.imgur.com/OOFJrYO.png)

## Gif Preview

<div align="center">

![Browse tab gif preview](https://i.imgur.com/Y9D44kr.gif)
![Explore tab gif preview](https://i.imgur.com/Fy9eXev.gif)

</div>

## Getting Started

1. [Set up React Native.](https://facebook.github.io/react-native/docs/getting-started.html) Choose tab **Building Projects with Native Code**
2. `cd` into this project directory
3. `pod install` in `ios` directory
4. `npm install` or `yarn install`
5. Run `react-native run-android` or `react-native run-ios`

## Functionality

App uses [TMDb api](https://developers.themoviedb.org/3) to fetch movies. API doesn't support recommendation for account therefore _Explore_ tab shows the list of currently popular movies on TMDb and locally stores seen movies. _Explore_ tab has offline queue ensuring that movies which are swiped without an internet connection will be processed when the connection is back online. Note that app does not support people information: actors, directors, etc.

## Made with help of

- [react-native](https://github.com/facebook/react-native)
- [react-navigation](https://github.com/react-community/react-navigation)
- [redux](https://github.com/reduxjs/redux)
- [reselect](https://github.com/reduxjs/reselect)
- [redux-saga](https://github.com/redux-saga/redux-saga)
- [react-native-fast-image](https://github.com/DylanVann/react-native-fast-image)
- [react-native-gesture-handler](https://github.com/kmagiera/react-native-gesture-handler)
- [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated)

## License

[MIT](https://github.com/azhavrid/movie-swiper/blob/master/LICENSE)
