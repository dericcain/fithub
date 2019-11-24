import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Avatar, Button, Icon, Input, Text } from 'react-native-elements';
import { view } from 'react-easy-state';

import { specialties, User } from '../../../../stores/user';
import { colors } from '../../../../assets/colors';
import { ToggleButton } from '../../../../components/toggle-button';
import {
  Container,
  HeaderImage,
  Middle,
  SpecialtiesContainer,
  SpecialtyLeft,
  SpecialtyRight,
  Top,
  VeryBottom,
  ZipContainer,
} from '../../../../components/create-user';

export const CreateTrainee = view(({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const createTrainee = () => {
    setLoading(true);
    User.createUser(navigation);
  };

  return (
    <ScrollView>
      <Container>
        <HeaderImage
          source={require('../../../../assets/images/finalize-account-bg.png')}
        />
        <Top>
          <Text
            h4
            style={{
              marginBottom: 24,
              color: colors.white,
              textAlign: 'center',
            }}>
            Finalize Account
          </Text>
          <Avatar source={{ uri: User.photoURL }} size="xlarge" rounded />
        </Top>
        <Middle>
          <ZipContainer>
            <Input
              keyboardType="number-pad"
              label="What is your zip code?"
              value={User.postalCode}
              onChangeText={User.setPostalCode}
              placeholder="90210"
            />
          </ZipContainer>
        </Middle>
        <VeryBottom>
          <Icon name="check" type="antdesign" color={colors.accent} />
          <Text h4 style={{ textAlign: 'center', marginBottom: 24 }}>
            Fitness Goals
          </Text>
          <SpecialtiesContainer>
            <SpecialtyLeft>
              <ToggleButton specialty={specialties[0]} />
            </SpecialtyLeft>
            <SpecialtyRight>
              <ToggleButton specialty={specialties[1]} />
            </SpecialtyRight>
          </SpecialtiesContainer>
          <SpecialtiesContainer>
            <SpecialtyLeft>
              <ToggleButton specialty={specialties[2]} />
            </SpecialtyLeft>
            <SpecialtyRight>
              <ToggleButton specialty={specialties[3]} />
            </SpecialtyRight>
          </SpecialtiesContainer>
          <Button
            loading={loading}
            containerStyle={{ marginBottom: 36 }}
            onPress={createTrainee}
            title="Create Profile"
            style={{ marginTop: 24 }}
            buttonStyle={{ backgroundColor: colors.purple.default }}
          />
        </VeryBottom>
      </Container>
    </ScrollView>
  );
});
