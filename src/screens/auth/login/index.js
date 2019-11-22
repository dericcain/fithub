import React from 'react';
import { Image, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { view } from 'react-easy-state';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import { firebase } from '@react-native-firebase/auth';
import { Text, Button } from 'react-native-elements';

import { User } from '../../../stores/user';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height * 0.35);

GoogleSignin.configure({
  // We need Calendar scope here...
  scopes: ['https://www.googleapis.com/auth/calendar'],
  webClientId:
    '313017879174-c59296h7qtlfjhq0dcq5csk5d1a55hib.apps.googleusercontent.com',
  offlineAccess: true,
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
    console.log('Pressed');
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { serverAuthCode } = userInfo;
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
        if (User.isTrainer) {
          navigation.navigate('Trainer');
        } else {
          navigation.navigate('Trainee');
        }
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
    <LinearGradient
      colors={['#5c0240', '#8b601f']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}>
      <Container>
        <Text h6 style={{ color: '#fff', maxWidth: 260, textAlign: 'center' }}>
          Bringing the personal back into personal trainer.
        </Text>
        <ButtonWrapper>
          <Button
            style={{ zIndex: 1 }}
            title="Sign in with Google"
            onPress={googleSignin}
            buttonStyle={{
              borderRadius: 14,
              backgroundColor: '#393680',
              paddingHorizontal: 24,
              paddingVertical: 12,
            }}
            icon={{ name: 'googleplus', type: 'antdesign', color: 'white' }}
            iconContainerStyle={{
              marginRight: 24,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </ButtonWrapper>
      </Container>
      <Image
        style={{
          width: screenWidth,
          height: screenHeight,
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
        source={require('../../../assets/images/login-bg.png')}
      />
    </LinearGradient>
  );
});
