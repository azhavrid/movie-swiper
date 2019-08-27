import { rootReducer } from './reducer';

/* ------------- State ------------- */
export type RootState = ReturnType<typeof rootReducer>;

/* ------------- Other ------------- */
export interface ResponseError {
  message: string;
  raisedAt: number;
}

export interface WithCallbacks {
  onSuccess?: () => void;
  onError?: () => void;
}
