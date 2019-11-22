import React from 'react';
import { Text, Button, Input } from 'react-native-elements';
import { view } from 'react-easy-state';

import { User } from '../../../../stores/user';
import { Container } from '../../../../components/container';
import { ButtonContainer } from '../../../../components/button-container';

export const CreateTrainer = view(({ navigation }) => {
  return (
    <Container>
      <Text h4 style={{ marginBottom: 24 }}>
        Awesome! There are plenty of people waiting for you to get them in
        shape.
      </Text>
      <ButtonContainer>
        <Input
          keyboardType="number-pad"
          label="What is your zip code?"
          value={User.postalCode}
          onChangeText={User.setPostalCode}
          placeholder="90210"
        />
        <Button
          onPress={User.createTrainer}
          title="Create Profile"
          style={{ marginTop: 24 }}
        />
      </ButtonContainer>
    </Container>
  );
});
