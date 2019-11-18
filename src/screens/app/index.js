import { createStackNavigator } from 'react-navigation-stack';

import { Schedule } from './schedule';

export const AppRoutes = createStackNavigator(
  {
    Schedule,
  },
  {
    initialRouteName: 'Schedule',
  },
);
