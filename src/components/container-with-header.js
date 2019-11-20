import React from 'react';
import { Header } from 'react-native-elements';

import { Container } from './container';

export const ContainerWithHeader = ({ title, children }) => {
  return (
    <>
      <Header
        centerComponent={{
          text: title,
          style: { color: '#fff', fontSize: 18 },
        }}
        rightComponent={{
          icon: 'notification',
          type: 'antdesign',
          color: '#fff',
        }}
      />
      <Container>{children}</Container>
    </>
  );
};
