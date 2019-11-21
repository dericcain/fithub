import React from 'react';
import { Icon, Text, PricingCard } from 'react-native-elements';
import styled from 'styled-components/native';

import { ContainerWithHeader } from '../../../components/container-with-header';
import { ScrollView } from 'react-native';

const PackageContainer = styled.View`
  flex: 1;
  width: 100%;
`;

const packages = [
  { name: 'The Beast', price: 100.0, duration: 60 },
  { name: 'Hercules', price: 150.0, duration: 60 },
  { name: 'The Hulk', price: 200.0, duration: 60 },
];

export const Packages = () => {
  const viewPackage = () => {};

  return (
    <ContainerWithHeader title="Packages">
      <Text h4>This is the Packages Page</Text>
      <PackageContainer>
        <ScrollView>
          {packages.map(p => (
            <PricingCard
              key={p.name}
              price={`$${p.price}`}
              color="#4f9deb"
              title={p.name}
              info={['1 User', 'Basic Support', 'All Core Features']}
              button={{ title: 'GET STARTED', icon: 'flight-takeoff' }}
              onButtonPress={viewPackage}
            />
          ))}
        </ScrollView>
      </PackageContainer>
    </ContainerWithHeader>
  );
};

Packages.navigationOptions = {
  tabBarIcon: () => <Icon name="switcher" type="antdesign" />,
};
