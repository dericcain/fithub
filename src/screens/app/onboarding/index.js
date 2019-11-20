import { createStackNavigator } from 'react-navigation-stack';

import { CreateTrainer } from './create-trainer';
import { CreateTrainee } from './create-trainee';
import { ChooseType } from './choose-type';

export const OnBoardingRoutes = createStackNavigator(
  {
    ChooseType,
    CreateTrainer,
    CreateTrainee,
  },
  {
    initialRouteName: 'ChooseType',
    headerMode: 'none',
  },
);
