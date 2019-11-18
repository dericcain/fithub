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
  // NOTE: We need calendar access...
  scopes: ['https://www.googleapis.com/auth/calendar'], // what API you want to access on behalf of the user, default is email and profile
  // TODO: Move this to a secure file
  webClientId:
    '313017879174-c59296h7qtlfjhq0dcq5csk5d1a55hib.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  // hostedDomain: '', // specifies a hosted domain restriction
  // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  // forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
  // accountName: '', // [Android] specifies an account name on the device that should be used
  // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
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
      User.setUser(userInfo);
      const credential = firebase.auth.GoogleAuthProvider.credential(
        userInfo.idToken,
        userInfo.accessToken,
      );
      console.log(userInfo, credential);
      await firebase.auth().signInWithCredential(credential);
      navigation.push('Somwhere..');
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
