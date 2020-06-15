import { SwipeDirection } from '../../components/Deck';
import { SocialActionType } from './types';

export const socialActionMap: Record<SwipeDirection, SocialActionType> = {
  left: 'skip',
  right: 'watchlist',
  top: 'favorite',
};
