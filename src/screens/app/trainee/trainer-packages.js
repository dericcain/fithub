import React, { useState, useEffect } from 'react';
import { Icon, Text, ListItem, Button, Avatar } from 'react-native-elements';
import styled from 'styled-components/native';
import { firebase } from '@react-native-firebase/firestore';
import { Packages } from '../../../stores/packages';
import { ContainerWithHeader } from '../../../components/container-with-header';
import { ScrollView } from 'react-native';

const PackageContainer = styled.View`
  flex: 1;
  width: 100%;
`;

export const TrainerPackages = ({ navigation }) => {
  const trainer = navigation.getParam('trainer', '');
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]);

  function onSnapshot(snapshot) {
    const packages = [];

    snapshot.forEach(trainerPackage => {
      // TODO: use user object
      packages.push(trainerPackage.data());
    });

    setPackages(packages);
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
  }, []);

  if (loading) {
    return <Text>Loading Trainer Packages...</Text>;
  }

  return (
    <ContainerWithHeader title="Select a Package">
      <Avatar rounded size="large" source={{ uri: trainer.photoURL }} />
      <Text h4>{trainer.displayName}</Text>
      <PackageContainer>
        <ScrollView>
          {packages.map(trainerPackage => (
            <ListItem
              title={trainerPackage.name}
              subtitle={trainerPackage.duration + 'min'}
              rightTitle={
                <Button
                  title={'$' + trainerPackage.price}
                />
              }
              bottomDivider
            />
          ))}
        </ScrollView>
      </PackageContainer>
      <Button
        title="Go back"
        onPress={() => navigation.navigate('Trainers')}
      />
    </ContainerWithHeader>
  );
};
