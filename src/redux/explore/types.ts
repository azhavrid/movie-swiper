import { MovieId } from '../movies/types';

export type SocialActionType = 'skip' | 'watchlist' | 'favorite';

export interface SocialAction {
  movieId: MovieId;
  action: SocialActionType;
}
