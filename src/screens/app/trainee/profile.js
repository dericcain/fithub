import React from 'react';
import { Icon, Text, Avatar, Button } from 'react-native-elements';
import { view } from 'react-easy-state';
import { firebase } from '@react-native-firebase/auth';

import { User } from '../../../stores/user';
import { ContainerWithHeader } from '../../../components/container-with-header';

export const Profile = view(({ navigation }) => {
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      });
  };

  return (
    <ContainerWithHeader title="Profile">
      <Avatar rounded size="large" source={{ uri: User.photoURL }} />
      <Text h4>{User.displayName}</Text>
      <Button title="Sign out" type="clear" onPress={logout} />
    </ContainerWithHeader>
  );
});

Profile.navigationOptions = {
  tabBarIcon: () => <Icon name="user" type="antdesign" />,
};
