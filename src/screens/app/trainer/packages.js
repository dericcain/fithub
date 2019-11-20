import React from 'react';
import { Icon, Text } from 'react-native-elements';

import { ContainerWithHeader } from '../../../components/container-with-header';

export const Packages = () => {
  return (
    <ContainerWithHeader title="Packages">
      <Text h4>This is the Packages Page</Text>
    </ContainerWithHeader>
  );
};

Packages.navigationOptions = {
  tabBarIcon: () => <Icon name="switcher" type="antdesign" />,
};
