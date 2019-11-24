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
      p.push(trainerPackage.data());
    });

    setPackages(p);
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
              title={trainerPackage.name}
              subtitle={trainerPackage.duration + 'min'}
              rightTitle={<Button title={'$' + trainerPackage.price} />}
              bottomDivider
            />
          ))}
        </ScrollView>
      </PackageContainer>
    </ContainerWithHeader>
  );
};
