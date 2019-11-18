import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import { AuthRoutes } from './auth';
import { AuthLoading } from './auth-loading';
import { AppRoutes } from './app';

export const Routes = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading,
      AuthRoutes,
      AppRoutes,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
