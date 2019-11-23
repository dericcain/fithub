import React from 'react';
import { Dimensions, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Text, Avatar } from 'react-native-elements';
import styled from 'styled-components/native';

import { Container } from '../../../../components/container';
import { ButtonContainer } from '../../../../components/button-container';
import { User } from '../../../../stores/user';
import { colors } from '../../../../assets/colors';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height * 0.35);

const Top = styled.View`
  flex: 2;
  align-items: center;
  padding: 36px;
`;

const Bottom = styled.View`
  flex: 2;
  justify-content: flex-end;
  padding: 24px;
`;

const HeaderImage = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 220px;
`;

export const ChooseType = ({ navigation }) => (
  <LinearGradient
    colors={['#5c0240', '#8b601f']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={{ flex: 1 }}>
    <HeaderImage
      source={require('../../../../assets/images/finalize-account-bg.png')}
    />
    <Container>
      <Top>
        <Text
          h1
          style={{
            marginBottom: 18,
            color: '#fff',
            maxWidth: 260,
            textAlign: 'center',
          }}>
          Welcome!
        </Text>
        <Text h5 style={{ color: '#fff', maxWidth: 260, textAlign: 'center' }}>
          First time? Let's get started!
        </Text>
        <Text
          h5
          style={{
            marginBottom: 24,
            color: '#fff',
            maxWidth: 260,
            textAlign: 'center',
          }}>
          Choose your track below.
        </Text>
        <Avatar source={{ uri: User.photoURL }} size="xlarge" rounded />
        <Text
          h3
          style={{
            marginTop: 24,
            color: '#fff',
            maxWidth: 260,
            textAlign: 'center',
            fontWeight: '200',
          }}>
          {User.displayName}
        </Text>
      </Top>
    </Container>
    <Image
      style={{
        width: screenWidth,
        height: screenHeight,
        position: 'absolute',
        bottom: 0,
        left: 0,
      }}
      source={require('../../../../assets/images/login-bg.png')}
    />
    <Bottom>
      <ButtonContainer>
        <Button
          onPress={() => navigation.navigate('CreateTrainee')}
          title="I want to find a trainer"
          style={{ marginBottom: 18 }}
          icon={{ type: 'antdesign', name: 'Trophy', color: colors.white }}
          iconContainerStyle={{ position: 'absolute', left: 24 }}
          buttonStyle={{ backgroundColor: colors.purple.default }}
        />
        <Button
          onPress={() => navigation.navigate('CreateTrainer')}
          title="I want to be a trainer"
          style={{ marginBottom: 18 }}
          icon={{ type: 'antdesign', name: 'user', color: colors.white }}
          iconContainerStyle={{ position: 'absolute', left: 24 }}
          buttonStyle={{ backgroundColor: colors.accent }}
        />
      </ButtonContainer>
    </Bottom>
  </LinearGradient>
);
