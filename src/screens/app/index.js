import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { OnBoardingRoutes } from './onboarding';
import { Trainer } from './trainer';
import { Trainee } from './trainee';

export const AppRoutes = createAppContainer(
  createSwitchNavigator(
    {
      OnBoardingRoutes,
      Trainer,
      Trainee,
    },
    {
      initialRouteName: 'OnBoardingRoutes',
    },
  ),
);
