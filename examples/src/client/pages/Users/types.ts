import { ThunkAction } from 'redux-thunk';

export interface IUser {
  id: number;
  name: string;
}

export interface IUsersPageProps {
  fetchUsers: () => void;
  users: IUser[];
}

export interface IUsersReducerState {
  users: IUser[];
}

export interface IUsersAction {
  readonly type: EUsersActions;
  payload: { data: { users: IUser[] } };
}

export type FetchUsersThunk = ThunkAction<
  void,
  IUsersReducerState,
  void,
  IUsersAction
>;

export enum EUsersActions {
  FETCH_USERS = 'FETCH_USERS',
  FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
}
