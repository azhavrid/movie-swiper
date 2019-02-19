import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

const withDelayedLoading = WrappedComponent => {
  class HOC extends React.Component {
    state = { toShowComponent: false };

    componentDidMount() {
      // eslint-disable-next-line
      requestAnimationFrame(() => this.setState({ toShowComponent: true }));
    }

    render() {
      const { toShowComponent } = this.state;
      return toShowComponent && <WrappedComponent {...this.props} />;
    }
  }

  hoistNonReactStatic(HOC, WrappedComponent);
  return HOC;
};

export default withDelayedLoading;
