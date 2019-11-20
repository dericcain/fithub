import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { Schedule } from './schedule';
import { OnBoardingRoutes } from './onboarding';


export const AppRoutes = createAppContainer(
  createSwitchNavigator(
    {
      // TODO: Need to figure out if the user has already completed onboarding and if so, then we need
      //  to send them to the app section
      OnBoardingRoutes,
      Schedule,
    },
    {
      initialRouteName: 'OnBoardingRoutes',
    },
  ),
);
