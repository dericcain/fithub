import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Profile } from './profile';
import { Trainers } from './trainers';
import { Payments } from './payments';
import { TrainerPackages } from './trainer-packages';

export const Trainee = createBottomTabNavigator(
  {
    Profile,
    Trainers,
    Payments,
    TrainerPackages,
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
