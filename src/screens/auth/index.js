import { createStackNavigator } from 'react-navigation-stack';

import { Login } from './login';

export const AuthRoutes = createStackNavigator(
  {
    Login,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);
