import hoistNonReactStatic from 'hoist-non-react-statics';
import React from 'react';

/* ------------- Props and State ------------- */
type State = typeof initialState;

const initialState = {
  toShowComponent: false,
};

/* ------------- Component ------------- */
export const withDelayedLoading = <OriginalProps extends object>(
  WrappedComponent: React.ComponentType<OriginalProps>,
) => {
  class HOC extends React.Component<OriginalProps, State> {
    state = initialState;

    componentDidMount() {
      requestAnimationFrame(() => this.setState({ toShowComponent: true }));
    }

    render() {
      const { toShowComponent } = this.state;
      return toShowComponent && <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatic(HOC, WrappedComponent);
};
