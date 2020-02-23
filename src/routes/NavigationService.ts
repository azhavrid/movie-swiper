import {
  NavigationActions,
  NavigationContainerComponent,
  NavigationNavigateActionPayload,
  NavigationReplaceActionPayload,
  StackActions,
} from 'react-navigation';

let _navigator: NavigationContainerComponent;

const setNavigatorReference = (navigatorRef: NavigationContainerComponent) => {
  _navigator = navigatorRef;
};

const navigate = (routeName: string, options?: NavigationNavigateActionPayload) => {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      ...options,
    }),
  );
};

const replace = (routeName: string, options?: NavigationReplaceActionPayload) => {
  _navigator.dispatch(
    StackActions.replace({
      routeName,
      ...options,
    }),
  );
};

export default {
  navigate,
  replace,
  setNavigatorReference,
};
