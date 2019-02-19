import { combineReducers } from 'redux';
import AuthReducer from './AuthReducers';

export default combineReducers({
  auth: AuthReducer
});
