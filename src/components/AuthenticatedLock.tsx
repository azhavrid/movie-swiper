import React from 'react';
import { connect } from 'react-redux';

import { isGuestUserSelector, userSelector } from '../redux/auth/selectors';
import { RootState } from '../redux/types';

/* ------------- Props and State ------------- */
type ReduxProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type OwnProps = {
  children: React.ReactNode;
  placeholder?: React.ReactNode;
};
type Props = OwnProps & ReduxProps;

/* ------------- Component ------------- */
class AuthenticatedLock extends React.PureComponent<Props> {
  render() {
    const { user, isGuestUser, placeholder = null, children = null } = this.props;
    const showLock = !user || isGuestUser;
    return showLock ? placeholder : children;
  }
}

const mapStateToProps = (state: RootState) => ({
  user: userSelector(state),
  isGuestUser: isGuestUserSelector(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedLock);
