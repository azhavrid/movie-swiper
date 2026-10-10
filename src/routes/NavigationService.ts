import { createNavigationContainerRef, CommonActions, StackActions } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

const setNavigatorReference = (_ref: unknown) => {
  // Kept for backwards compatibility; NavigationContainer uses navigationRef directly.
};

const navigate = (routeName: string, params?: Record<string, unknown>) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate({ name: routeName, params }));
  }
};

const replace = (routeName: string, params?: Record<string, unknown>) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(routeName, params));
  }
};

export default {
  navigate,
  replace,
  setNavigatorReference,
};
