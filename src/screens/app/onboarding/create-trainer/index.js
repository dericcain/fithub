import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { Text, Button, Input, Avatar, Icon } from 'react-native-elements';
import { view } from 'react-easy-state';

import { User } from '../../../../stores/user';
import { colors } from '../../../../assets/colors';
import { TimeInput } from '../../../../components/time-input';
import { ToggleButton } from '../../../../components/toggle-button';

const Container = styled.View`
  flex: 1;
`;

const Top = styled.View`
  height: 300px;
  width: 100%;
  padding: 36px;
  justify-content: center;
  align-items: center;
`;

const Middle = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120px;
  padding: 24px;
`;

const Bottom = styled.View`
  flex: 3;
  padding: 24px;
  align-items: center;
  background-color: ${colors.purple.dark};
`;

const HeaderImage = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 220px;
`;

const ZipContainer = styled.View`
  max-width: 200px;
`;

const VeryBottom = styled.View`
  padding: 24px;
`;

const SpecialtiesContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;

const SpecialtyLeft = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
  padding: 6px;
`;

const SpecialtyRight = styled(SpecialtyLeft)`
  align-items: flex-start;
`;

const specialties = [
  'Strength Training',
  'Weight Loss',
  'Sports Training',
  'Competition',
];

export const CreateTrainer = view(({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const createTrainer = () => {
    setLoading(true);
    User.createTrainer(navigation);
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
        <Bottom>
          <Icon name="calendar" type="antdesign" color="white" />
          <Text h4 style={{ textAlign: 'center', color: colors.white }}>
            Availability
          </Text>
          <TimeInput day="Sunday" />
          <TimeInput day="Monday" />
          <TimeInput day="Tuesday" />
          <TimeInput day="Wednesday" />
          <TimeInput day="Thursday" />
          <TimeInput day="Friday" />
          <TimeInput day="Saturday" />
        </Bottom>
        <VeryBottom>
          <Icon name="check" type="antdesign" color={colors.accent} />
          <Text h4 style={{ textAlign: 'center', marginBottom: 24 }}>
            Specialties
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
            onPress={createTrainer}
            title="Create Profile"
            style={{ marginTop: 24 }}
            buttonStyle={{ backgroundColor: colors.purple.default }}
          />
        </VeryBottom>
      </Container>
    </ScrollView>
  );
});
