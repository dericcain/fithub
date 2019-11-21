import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Profile } from './profile';
import { Trainers } from './trainers';

export const Trainee = createBottomTabNavigator(
  {
    Profile,
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