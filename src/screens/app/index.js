import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { OnBoardingRoutes } from './onboarding';
import { Trainer } from './trainer';

export const AppRoutes = createAppContainer(
  createSwitchNavigator(
    {
      OnBoardingRoutes,
      Trainer,
    },
    {
      initialRouteName: 'OnBoardingRoutes',
    },
  ),
);
