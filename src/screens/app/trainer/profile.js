import React from 'react';
import { Icon, Text } from 'react-native-elements';

import { ContainerWithHeader } from '../../../components/container-with-header';

export const Profile = () => {
  return (
    <ContainerWithHeader title="Profile">
      <Text h4>This is the Profile Page</Text>
    </ContainerWithHeader>
  );
};

Profile.navigationOptions = {
  tabBarIcon: () => <Icon name="user" type="antdesign" />,
};
