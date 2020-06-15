import { MovieId } from '../movies/types';

export type SocialActionType = 'skip' | 'watchlist' | 'favorite';

export interface SocialAction {
  id: string;
  movieId: MovieId;
  actionType: SocialActionType;
}
