import React from 'react';
import { Text, Icon } from 'react-native-elements';
import styled from 'styled-components/native';

const Container = styled.View`
  padding: 24px;
`;

export const Schedule = () => {
  return (
    <Container>
      <Icon name="schedule" type="material" />
      <Text h4>Schedule</Text>
    </Container>
  );
};
