import React from 'react';
import { Text, Icon } from 'react-native-elements';
import styled from 'styled-components/native';

const Container = styled.View`
  padding: 24px;
`;

const Heading = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Schedule = () => {
  return (
    <Container>
      <Heading>
        <Icon
          containerStyle={{ marginRight: 8 }}
          name="schedule"
          type="material"
        />
        <Text h4>Schedule</Text>
      </Heading>
    </Container>
  );
};
