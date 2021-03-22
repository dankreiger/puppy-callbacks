import { combineReducers } from 'redux';
import usersReducer from './pages/Users/reducer';

export default combineReducers({
  users: usersReducer,
});
