import React, { useState, useEffect } from 'react';
import { Text, ListItem, Button, Avatar } from 'react-native-elements';
import styled from 'styled-components/native';
import { firebase } from '@react-native-firebase/firestore';

import { ContainerWithHeader } from '../../../components/container-with-header';
import { ScrollView } from 'react-native';
import { colors } from '../../../assets/colors';

const PackageContainer = styled.View`
  flex: 1;
  width: 100%;
`;

export const TrainerPackages = ({ navigation }) => {
  const trainer = navigation.getParam('trainer', '');
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]);

  function onSnapshot(snapshot) {
    const p = [];

    snapshot.forEach(trainerPackage => {
      // TODO: use user object
      p.push({ id: trainerPackage.id, ...trainerPackage.data() });
    });

    setPackages(p);
    console.log(p);
    setLoading(false);
  }

  useEffect(() => {
    // TODO: move into separate repository object
    const query = firebase
      .firestore()
      .collection('sessions')
      .where('userId', '==', trainer.uid);

    query.onSnapshot(onSnapshot);
    query.get();
  }, [trainer.uid]);

  if (loading) {
    return <Text>Loading Trainer Packages...</Text>;
  }

  const navigateToPayment = selectedPackage => {
    navigation.navigate('Payments', { selectedPackage });
  };

  return (
    <ContainerWithHeader
      title="Select a Package"
      leftComponent={{
        icon: 'left',
        type: 'antdesign',
        color: colors.white,
        onPress: () => navigation.navigate('Trainers'),
      }}>
      <Avatar rounded size="large" source={{ uri: trainer.photoURL }} />
      <Text h4>{trainer.displayName}</Text>
      <PackageContainer>
        <ScrollView>
          {packages.map(trainerPackage => (
            <ListItem
              key={trainerPackage.id}
              title={trainerPackage.name}
              titleStyle={{
                fontSize: 22,
                fontWeight: '400',
                color: colors.purple.dark,
              }}
              subtitle={trainerPackage.description}
              subtitleStyle={{
                fontWeight: '300',
                color: colors.grey.darker,
              }}
              rightSubtitle={trainerPackage.duration + 'min'}
              rightSubtitleStyle={{
                marginTop: 4,
                fontWeight: '600',
                color: colors.grey.dark,
              }}
              rightTitle={
                <Button
                  title={'$' + trainerPackage.price}
                  onPress={() => navigateToPayment(trainerPackage)}
                  buttonStyle={{ backgroundColor: colors.purple.default }}
                />
              }
              bottomDivider
            />
          ))}
        </ScrollView>
      </PackageContainer>
    </ContainerWithHeader>
  );
};
