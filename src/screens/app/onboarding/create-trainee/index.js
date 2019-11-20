import React from 'react';
import { Text, Button, Input } from 'react-native-elements';
import { view } from 'react-easy-state';

import { User } from '../../../../stores/user';
import { Container } from '../../../../components/container';
import { ButtonContainer } from '../../../../components/button-container';

export const CreateTrainee = view(({ navigation }) => {
  return (
    <Container>
      <Text h4 style={{ marginBottom: 24 }}>
        Sweet! We will match you up with a great trainer!
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
          onPress={User.createTrainee}
          title="Create Profile"
          style={{ marginTop: 24 }}
        />
      </ButtonContainer>
    </Container>
  );
});
