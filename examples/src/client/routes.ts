import HomePage from './pages/Home/Home';
import Users from './pages/Users/Users';

export default [
  {
    ...HomePage,
    path: '/',
    exact: true,
  },
  {
    ...Users,
    path: '/users',
  },
];
