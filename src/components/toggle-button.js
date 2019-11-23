import React from 'react';
import { Button } from 'react-native-elements';
import { view } from 'react-easy-state';

import { colors } from '../assets/colors';
import { User } from '../stores/user';

export const ToggleButton = view(({ specialty }) => {
  const included = User.specialties.includes(specialty);
  return (
    <Button
      containerStyle={{ flex: 1, width: '100%' }}
      buttonStyle={{
        width: '100%',
        borderColor: colors.accent,
        backgroundColor: included ? colors.accent : colors.white,
      }}
      titleStyle={{
        color: included ? colors.white : colors.accent,
      }}
      style={{ flex: 1 }}
      title={specialty}
      type={included ? 'solid' : 'outline'}
      onPress={() => User.toggleSpecialty(specialty)}
    />
  );
});
