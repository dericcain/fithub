import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Trainers } from './trainers';

export const Trainee = createBottomTabNavigator(
  {
    Trainers,
  },
  {
    initialRouteName: 'Trainers',
    tabBarOptions: {
      style: {
        paddingTop: 8,
        height: 60,
      },
    },
  },
);