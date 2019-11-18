import { createStackNavigator } from 'react-navigation-stack';

import { Login } from './login';
import { Register } from './register';

export const AuthRoutes = createStackNavigator(
  {
    Login,
    Register,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);
