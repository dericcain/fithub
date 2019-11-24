import { colors } from '../../../assets/colors';
import React from 'react';
import { Image, Dimensions, TouchableHighlight, View } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { Text, Icon } from 'react-native-elements';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height * 0.35);

const Container = styled.View`
  display: flex;
  flex: 1;
  height: 100%;
  width: 100%;
  padding: 24px;
  align-items: center;
  justify-content: center;
`;

export const PaymentSuccess = () => {
  return (
    <LinearGradient
      colors={['#5c0240', '#8b601f']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}>
      <Container>
        <View
          style={{
            borderRadius: Math.round(screenWidth + screenHeight) / 2,
            width: screenWidth/1.5,
            height: screenWidth/1.5,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          underlayColor="#ccc"
          onPress={() => alert('Yaa!')}>
          <Text
            h5
            style={{ color: colors.text.default, maxWidth: 260, textAlign: 'center' }}>
            Payment Successful
          </Text>
          <Icon padding={8} name="check-circle" color={colors.purple.default} size={50} />
          <Text
            h5
            style={{ color: colors.text.default , maxWidth: 260, textAlign: 'center' }}>
            You are good to go!
          </Text>
        </View>
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
};
