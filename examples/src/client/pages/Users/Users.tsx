import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from './actions';
import { IUsersPageProps, IUsersReducerState } from './types';

const UsersPage = ({ fetchUsers, users }: IUsersPageProps) => {
  useEffect(fetchUsers, [fetchUsers]);

  const renderUsers = (): JSX.Element[] => {
    return users.map((user) => <li key={user.id}>{user.name}</li>);
  };
  return (
    <div>
      <Link to="/">back</Link>
      Here is a list of puppy users:
      <ul>{renderUsers()}</ul>
    </div>
  );
};

const mapStateToProps = (state: IUsersReducerState) => ({
  users: state.users,
});

const loadData = async (store): Promise<void> => {
  await store.dispatch(actions.fetchUsers());
};

export default {
  loadData,
  component: connect(mapStateToProps, actions)(UsersPage),
};
