# Movie Swiper

![React version](https://img.shields.io/badge/react-16.6-green.svg)
![React Native version](https://img.shields.io/badge/react--native-0.57-blue.svg)
![License](https://img.shields.io/github/license/azhavrid/movie-swiper.svg)

Unofficial client for [TMDb](https://www.themoviedb.org/) created with [React Native](https://facebook.github.io/react-native/). Developed as a training project.

## App Preview

### Screen Showcase

![Movie Swiper screen showcase](https://i.imgur.com/8DEW8ED.jpg)

### Gif Preview

<div align="center">

![Browse tab gif preview](https://i.imgur.com/Y9D44kr.gif)
![Explore tab gif preview](https://i.imgur.com/Fy9eXev.gif)

</div>

## Getting Started

1. [Set up React Native.](https://facebook.github.io/react-native/docs/getting-started.html) Choose tab **Building Projects with Native Code**
2. `cd` into this project directory
3. `npm install` or `yarn install`
4. Run `react-native run-android` or `react-native run-ios`

## Functionality

App uses [TMDb api](https://developers.themoviedb.org/3) to fetch movies. API doesn't support recommendation for account therefore _Explore_ tab shows the list of currently popular movies on TMDb and locally stores seen movies. _Explore_ tab has offline queue ensuring that movies which are swiped without an internet connection will be processed when the connection is back online. Note that app does not support people information: actors, directors, etc.

## Made with help of

- [react-native](https://github.com/facebook/react-native)
- [react-navigation](https://github.com/react-community/react-navigation)
- [redux](https://github.com/reduxjs/redux)
- [react-native-fast-image](https://github.com/DylanVann/react-native-fast-image)
- [react-native-gesture-handler](https://github.com/kmagiera/react-native-gesture-handler)
- [axios](https://github.com/axios/axios)

## License

[MIT](https://github.com/azhavrid/movie-swiper/blob/master/LICENSE)
