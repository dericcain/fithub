import React from 'react';
import { Header } from 'react-native-elements';
import styled from 'styled-components/native';

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
        centerComponent={{
          text: title,
          style: { color: '#fff', fontSize: 18 },
        }}
        rightComponent={{
          icon: 'notifications',
          type: 'material',
          color: '#fff',
        }}
      />
      <ContainerNoPadding>{children}</ContainerNoPadding>
    </>
  );
};
