import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Profile } from './profile';
import { Trainers } from './trainers';
import { Payments } from './payments';
import { TrainerPackages } from './trainer-packages';
import { PaymentSuccess } from './paymentsuccess';
import { colors } from '../../../assets/colors';

export const Trainee = createBottomTabNavigator(
  {
    Trainers,
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
