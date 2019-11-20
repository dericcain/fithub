import React from 'react';
import { Button, Text } from 'react-native-elements';
import { Container } from '../../../../components/container';
import { ButtonContainer } from '../../../../components/button-container';

export const ChooseType = ({ navigation }) => (
  <Container>
    <Text h4>What would you like to do?</Text>
    <ButtonContainer>
      <Button
        onPress={() => navigation.navigate('CreateTrainee')}
        title="I want to find a trainer"
        style={{ marginBottom: 12 }}
      />
      <Button
        onPress={() => navigation.navigate('CreateTrainer')}
        title="I want to be a trainer"
        style={{ marginBottom: 12 }}
      />
    </ButtonContainer>
  </Container>
);
