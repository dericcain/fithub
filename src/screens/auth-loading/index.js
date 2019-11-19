import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { view } from 'react-easy-state';
import styled from 'styled-components/native';
import { firebase } from '@react-native-firebase/auth';

import { User } from '../../stores/user';

const Container = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const AuthLoading = view(({ navigation }) => {
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = user => {
    if (user) {
      console.debug('user is being set');
      User.setUser(user._user);
    } else {
      console.debug('user is being removed');
      User.removeUser();
    }
    setInitializing(false);
  };

  useEffect(() => {
    // (async () => await checkAuth())();
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return () => {
      subscriber();
    };
  }, []);

  if (!initializing) {
    if (!User.isAuthed) {
      console.debug('user not authed');
      navigation.navigate('Login');
    } else {
      console.debug('user is authed');
      navigation.navigate('Schedule');
    }
  }

  return (
    <Container>
      <ActivityIndicator size="large" color="#3498db" />
    </Container>
  );
});
