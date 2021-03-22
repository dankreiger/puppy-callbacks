import axios from 'axios';
import { Dispatch } from 'redux';

import { EUsersActions } from './types';

export const fetchUsers = () => async (dispatch) => {
  const res = await axios.get('http://react-ssr-api.herokuapp.com/users');

  dispatch({
    type: EUsersActions.FETCH_USERS,
    payload: res,
  });
};

export const fetchUsersSuccess = () => async (
  dispatch: Dispatch
): Promise<void> => {
  const res = await axios.get('');
  dispatch({
    type: EUsersActions.FETCH_USERS_SUCCESS,
    payload: res,
  });
};
