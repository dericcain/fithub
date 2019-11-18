import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  padding: 24px;
`;

const Header = styled.Text`
  font-size: 24px;
`;

const Button = styled.TouchableHighlight`
  background-color: #3498db;
`;

const ButtonText = styled.Text`
  color: #fff;
`;

export const Register = ({ navigation }) => {
  const register = e => {
    navigation.navigate('Login');
  };

  return (
    <Container>
      <Header>Register</Header>
      <Button onPress={register}>
        <ButtonText>Register</ButtonText>
      </Button>
    </Container>
  );
};
