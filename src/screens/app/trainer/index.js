import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Schedule } from './schedule';
import { Profile } from './profile';
import { Packages } from './packages';

export const Trainer = createBottomTabNavigator(
  {
    Schedule,
    Profile,
    Packages,
  },
  {
    initialRouteName: 'Schedule',
    tabBarOptions: {
      style: {
        paddingTop: 8,
        height: 60,
      },
    },
  },
);
