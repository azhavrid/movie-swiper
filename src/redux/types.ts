import { AuthAction } from './auth/actions';
import { ExploreAction } from './explore/actions';
import { MoviesAction } from './movies/actions';
import { NetworkAction } from './network/actions';
import { persistedReducer } from './reducer';
import { RehydrateAction } from './rehydrate/actions';
import { SearchAction } from './search/actions';
import { SectionAction } from './sections/actions';

/* ------------- State ------------- */
export type RootState = ReturnType<typeof persistedReducer>;
export type RootAction =
  | AuthAction
  | ExploreAction
  | MoviesAction
  | NetworkAction
  | RehydrateAction
  | SearchAction
  | SectionAction;

/* ------------- Other ------------- */
export interface WithCallbacks {
  onSuccess?: () => void;
  onError?: () => void;
}
