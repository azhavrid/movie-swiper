import * as rehydrateConstants from './constants';

/* ------------- Types ------------- */
export type AfterRehydrate = ReturnType<typeof afterRehydrate>;

export type RehydrateAction = AfterRehydrate;

/* ------------- Actions ------------- */
export const afterRehydrate = () =>
  <const>{
    type: rehydrateConstants.AFTER_REHYDRATE,
  };
