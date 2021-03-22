import { Reducer } from 'redux';
import { IUsersReducerState, EUsersActions, IUsersAction } from './types';

const usersReducer: Reducer<IUsersReducerState | [], IUsersAction> = (
  state = [],
  action
) => {
  switch (action.type) {
    case EUsersActions.FETCH_USERS:
      return action.payload.data;
    default:
      return state;
  }
};

export default usersReducer;
