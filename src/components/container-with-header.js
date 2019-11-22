import React from 'react';
import { Header } from 'react-native-elements';
import styled from 'styled-components/native';
import { colors } from '../assets/colors';

const ContainerNoPadding = styled.View`
  padding: 24px 0 0 0;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ContainerWithHeader = ({ title, children }) => {
  return (
    <>
      <Header
        statusBarProps={{ barStyle: 'light-content' }}
        backgroundColor={colors.purple.dark}
        centerComponent={{
          text: title,
          style: { color: colors.white, fontSize: 18 },
        }}
        rightComponent={{
          icon: 'notifications',
          type: 'material',
          color: colors.white,
        }}
      />
      <ContainerNoPadding>{children}</ContainerNoPadding>
    </>
  );
};
