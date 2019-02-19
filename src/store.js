import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

export default createStore(reducers, {}, applyMiddleware(ReduxThunk));
