import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Profile } from './profile';
import { Trainers } from './trainers';
import { colors } from '../../../assets/colors';
import { Schedule } from './schedule';

export const Trainee = createBottomTabNavigator(
  {
    Trainers,
    Schedule,
    Profile,
  },
  {
    initialRouteName: 'Trainers',
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
  },
);
