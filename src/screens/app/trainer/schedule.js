import React from 'react';
import { Icon, Text } from 'react-native-elements';

import { ContainerWithHeader } from '../../../components/container-with-header';

export const Schedule = () => {
  return (
    <ContainerWithHeader title="Schedule">
      <Text h4>This is the Schedule Page</Text>
    </ContainerWithHeader>
  );
};

Schedule.navigationOptions = {
  tabBarIcon: () => <Icon name="calendar" type="antdesign" />,
};
