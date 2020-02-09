import { AnyAction } from 'redux';

export const isSameActionsByType = (actionA: AnyAction, actionB: AnyAction) => actionA.type === actionB.type;
