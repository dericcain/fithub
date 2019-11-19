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
      // Login to Google
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const credential = firebase.auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        userInfo.accessToken,
      );
      // Use the Google login to log in or create an account in Firebase
      const { user } = await firebase.auth().signInWithCredential(credential);
      User.setUser(user);
      navigation.push('Schedule');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
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
