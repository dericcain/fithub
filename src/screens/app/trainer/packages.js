import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import {
  Icon,
  Text,
  PricingCard,
  Overlay,
  Input,
  Button,
} from 'react-native-elements';
import styled from 'styled-components/native';
import { FloatingAction } from 'react-native-floating-action';
import { firebase } from '@react-native-firebase/firestore';
import { view } from 'react-easy-state';

import { ContainerWithHeader } from '../../../components/container-with-header';
import { User } from '../../../stores/user';
import { Packages as P } from '../../../stores/packages';
import { colors } from '../../../assets/colors';

const PackageContainer = styled.View`
  flex: 1;
  width: 100%;
`;

const packages = [
  { name: 'The Beast', price: 100.0, duration: 60 },
  { name: 'Hercules', price: 150.0, duration: 60 },
  { name: 'The Hulk', price: 200.0, duration: 60 },
];

const CreatePackageContainer = styled.View`
  justify-content: center;
`;

const Success = styled.View`
  background-color: ${colors.success};
  color: #fff;
  padding: 12px;
  height: auto;
  margin: 18px;
  justify-content: center;
  align-items: center;
`;

const InputWrapper = styled.View`
  margin-bottom: 12px;
`;

export const Packages = view(() => {
  const [createPackageOpen, setCreatePackageOpen] = useState(false);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [created, setCreated] = useState(false);

  useEffect(() => {
    P.fetchPackages(User.uid);
  }, []);

  const viewPackage = () => {};

  const createPackage = async () => {
    try {
      await firebase
        .firestore()
        .collection('sessions')
        .add({
          name,
          price,
          description,
          duration,
          userId: User.uid,
        });
      setCreated(true);
      P.fetchPackages(User.uid);
      setTimeout(() => {
        setCreatePackageOpen(false);
      }, 3000);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <ContainerWithHeader title="Packages">
      <Overlay
        isVisible={createPackageOpen}
        height="auto"
        overlayStyle={{ padding: 24 }}>
        <CreatePackageContainer>
          <Text h4 style={{ marginBottom: 24, color: colors.text.default }}>
            Create your package
          </Text>
          <InputWrapper>
            <Input
              label="Package name"
              value={name}
              placeholder="The Hercules Package"
              onChangeText={t => setName(t)}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Package description"
              value={description}
              placeholder="This will make you a beast"
              onChangeText={t => setDescription(t)}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Session duration in minutes"
              value={duration}
              placeholder="60"
              onChangeText={t => setDuration(t)}
              keyboardType="number-pad"
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              label="Package price"
              value={price}
              placeholder="99.99"
              onChangeText={t => setPrice(t)}
              keyboardType="number-pad"
            />
          </InputWrapper>
          <InputWrapper>
            <Button
              title="Create Package"
              onPress={createPackage}
              buttonStyle={{ backgroundColor: colors.purple.default }}
            />
          </InputWrapper>
          <InputWrapper>
            <Button
              title="Cancel"
              type="clear"
              onPress={() => setCreatePackageOpen(false)}
              titleStyle={{ color: colors.purple.light }}
            />
          </InputWrapper>
          {created && (
            <Success>
              <Text style={{ color: colors.white }}>
                Your package was created successfully.
              </Text>
            </Success>
          )}
        </CreatePackageContainer>
      </Overlay>
      <PackageContainer>
        <ScrollView>
          {P.sessions.map(p => (
            <PricingCard
              key={p.name}
              price={`$${p.price}`}
              title={p.name}
              info={[p.description]}
              button={{
                title: 'DELETE',
                icon: 'delete',
                buttonStyle: {
                  backgroundColor: colors.danger,
                },
              }}
              onButtonPress={viewPackage}
              color={colors.purple.default}
            />
          ))}
        </ScrollView>
      </PackageContainer>
      <FloatingAction
        onPressMain={() => setCreatePackageOpen(true)}
        showBackground={false}
        animated={false}
        color={colors.accent}
      />
    </ContainerWithHeader>
  );
});

Packages.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="switcher" type="antdesign" color={tintColor} />
  ),
};
