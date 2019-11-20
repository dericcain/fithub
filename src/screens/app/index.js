import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { Schedule } from './schedule';
import { OnBoardingRoutes } from './onboarding';

export const AppRoutes = createAppContainer(
  createSwitchNavigator(
    {
      OnBoardingRoutes,
      Schedule,
    },
    {
      initialRouteName: 'OnBoardingRoutes',
    },
  ),
);
