import { AnyAction } from 'redux';

export interface FailedRequest {
  action: AnyAction;
  error: any;
}

export interface ReDispatchConfig {
  isSameAction?: (actionA: AnyAction, actionB: AnyAction) => boolean;
  clearActionsFromQueue?: string[] | string;
}
