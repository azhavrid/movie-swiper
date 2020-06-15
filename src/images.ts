// Welcome
// Swipe Labels
// General
import appLogo from './assets/images/logo.png';
import swipeLike from './assets/images/swipe_labels/like.png';
import swipeSave from './assets/images/swipe_labels/save.png';
import swipeSkip from './assets/images/swipe_labels/skip.png';
import welcomeBumblebee from './assets/images/welcome_background_images/bumblebee.jpg';
import welcomeJurassicWorld from './assets/images/welcome_background_images/jurassic_world.jpg';
import welcomeShutterIsland from './assets/images/welcome_background_images/shutter_island.jpg';
import welcomeSpiderMan from './assets/images/welcome_background_images/spider_man.jpg';
import welcomeTheGodfather from './assets/images/welcome_background_images/the_godfather.jpg';
import welcomeTheSixthSense from './assets/images/welcome_background_images/the_sixth_sense.jpg';
// Types
import { SocialActionType } from './redux/explore/types';

const swipeLabels: Record<SocialActionType, number> = {
  favorite: swipeLike,
  watchlist: swipeSave,
  skip: swipeSkip,
};

export default {
  welcomeArray: [
    welcomeJurassicWorld,
    welcomeSpiderMan,
    welcomeShutterIsland,
    welcomeBumblebee,
    welcomeTheGodfather,
    welcomeTheSixthSense,
  ],
  swipeLabels,
  appLogo,
};
