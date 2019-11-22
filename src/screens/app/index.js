import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { OnBoardingRoutes } from './onboarding';
import { Trainer } from './trainer';
import { Trainee } from './trainee';
import { Payments } from './trainee/payments';
import { TrainerPackages } from './trainee/trainer-packages';
import { PaymentSuccess } from './trainee/paymentsuccess';

export const AppRoutes = createAppContainer(
  createSwitchNavigator(
    {
      OnBoardingRoutes,
      Trainer,
      Trainee,
      Payments,
      TrainerPackages,
      PaymentSuccess,
    },
    {
      initialRouteName: 'OnBoardingRoutes',
    },
  ),
);
