import React from 'react';
import { useNavigation } from '@react-navigation/native';

type NavigationProp = ReturnType<typeof useNavigation>;

export type NavigationInjectedProps = {
  navigation: NavigationProp;
};

export function withNavigation<P extends object>(
  Component: React.ComponentType<P & NavigationInjectedProps>,
): React.FC<Omit<P, keyof NavigationInjectedProps>> {
  const Wrapped: React.FC<Omit<P, keyof NavigationInjectedProps>> = props => {
    const navigation = useNavigation();
    return <Component {...(props as P)} navigation={navigation} />;
  };
  Wrapped.displayName = `withNavigation(${Component.displayName || Component.name || 'Component'})`;
  return Wrapped;
}
