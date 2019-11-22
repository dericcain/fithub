import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Schedule } from './schedule';
import { Profile } from './profile';
import { Packages } from './packages';
import { colors } from '../../../assets/colors';

export const Trainer = createBottomTabNavigator(
  {
    Schedule,
    Profile,
    Packages,
  },
  {
    initialRouteName: 'Schedule',
    tabBarOptions: {
      activeTintColor: colors.white,
      inactiveTintColor: colors.grey.light,
      labelStyle: {
        color: colors.white,
      },
      style: {
        paddingTop: 8,
        height: 60,
        backgroundColor: colors.purple.light,
      },
    },
    order: ['Schedule', 'Packages', 'Profile'],
  },
);
