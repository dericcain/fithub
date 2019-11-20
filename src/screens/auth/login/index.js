import React from 'react';
import styled from 'styled-components/native';
import { view } from 'react-easy-state';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import { firebase } from '@react-native-firebase/auth';
import { Text } from 'react-native-elements';

import { User } from '../../../stores/user';

GoogleSignin.configure({
  // We need Calendar scope here...
  scopes: ['https://www.googleapis.com/auth/calendar'], // what API you want to access on behalf of the user, default is email and profile
  // Maybe this should go somewhere secure, but for this project, whatever...
  webClientId:
    '313017879174-c59296h7qtlfjhq0dcq5csk5d1a55hib.apps.googleusercontent.com',
});

const Container = styled.View`
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
  padding: 24px;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.View`
  margin-top: 24px;
`;

export const Login = view(({ navigation }) => {
  const googleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const credential = firebase.auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        userInfo.accessToken,
      );
      // Use the Google login to log in or create an account in Firebase
      const { user } = await firebase.auth().signInWithCredential(credential);
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

      if (User.hasCompletedOnBoarding) {
        // TODO: Still need to figure out if this is a trainer or a trainee here and
        //  send them to the correct place.
        navigation.push('Schedule');
      } else {
        navigation.push('OnBoardingRoutes');
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled login');
        navigation.navigate('Login');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('operation (e.g. sign in) is in progress already');
        navigation.navigate('Login');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services not available');
        navigation.navigate('Login');
      } else {
        console.log("Something happened on Google's side when logging in");
        navigation.navigate('Login');
      }
    }
  };

  return (
    <Container>
      <Text h4>Login</Text>
      <ButtonWrapper>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={googleSignin}
          disabled={false}
        />
      </ButtonWrapper>
    </Container>
  );
});
