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

  const onAuthStateChanged = async user => {
    try {
      console.debug('auth state changed', user);
      if (user) {
        console.debug('user is being set');
        const doc = await firebase
          .firestore()
          .collection('users')
          .doc(user._user.uid)
          .get();

        if (doc.exists) {
          const u = doc.data();
          User.setUser(u);
        } else {
          User.setUser(user._user);
        }
      } else {
        console.debug('user is being removed');
        User.removeUser();
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return () => {
      subscriber();
    };
  }, []);

  if (!initializing) {
    if (!User.isAuthed) {
      console.debug('user not authed');
      navigation.navigate('Login');
    } else if (User.hasCompletedOnBoarding) {
      if (User.isTrainer) {
        navigation.navigate('Trainer');
      } else {
        navigation.navigate('Trainee');
      }
      console.debug('user is authed and navigating to main page');
    } else {
      console.debug('user is authed and navigating to onboarding');
      navigation.navigate('OnBoardingRoutes');
    }
  }

  return (
    <Container>
      <ActivityIndicator size="large" color="#3498db" />
    </Container>
  );
});
