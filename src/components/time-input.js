import React from 'react';
import { Input, Text } from 'react-native-elements';
import { view } from 'react-easy-state';
import styled from 'styled-components/native';

import { colors } from '../assets/colors';
import { User } from '../stores/user';

const TimeInputContainer = styled.View`
  flex: 1;
  width: 100%;
  margin-bottom: 24px;
`;

const TimeContainer = styled.View`
  width: 50%;
  flex-direction: row;
`;

export const TimeInput = view(({ day }) => {
  const d = day.toLowerCase();
  return (
    <TimeInputContainer>
      <Text h5 style={{ textAlign: 'left', color: colors.white, fontSize: 18 }}>
        {day}
      </Text>
      <TimeContainer>
        <Input
          value={User.hours[d].start}
          onChangeText={t => (User.hours[d].start = t)}
          placeholder="AM"
          inputStyle={{
            borderColor: colors.white,
            color: colors.white,
          }}
          placeholderTextColor={colors.grey.default}
          keyboardType="numbers-and-punctuation"
        />
        <Input
          value={User.hours[d].end}
          onChangeText={t => (User.hours[d].end = t)}
          placeholder="PM"
          inputStyle={{
            borderColor: colors.white,
            color: colors.white,
          }}
          placeholderTextColor={colors.grey.light}
          keyboardType="numbers-and-punctuation"
        />
      </TimeContainer>
    </TimeInputContainer>
  );
});
