import React, { useState, useEffect } from 'react';
import { Icon, Text, ListItem } from 'react-native-elements';
import styled from 'styled-components/native';
import { firebase } from '@react-native-firebase/firestore';

import { ContainerWithHeader } from '../../../components/container-with-header';
import { ScrollView } from 'react-native';

const TrainerContainer = styled.View`
  flex: 1;
  width: 100%;
`;

export const Trainers = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [trainers, setTrainers] = useState([]);

  function onSnapshot(snapshot) {
    const trainers = [];

    snapshot.forEach(trainer => {
      // TODO: use user object
      trainers.push(trainer.data());
    });

    setTrainers(trainers);
    setLoading(false);
  }

  useEffect(() => {
    // TODO: move into separate repository object
    const query = firebase
      .firestore()
      .collection('users')
      .where('isTrainer', '==', true);

    query.onSnapshot(onSnapshot);
    query.get();
  }, []);

  if (loading) {
    return <Text>Loading Trainers...</Text>;
  }

  return (
    <ContainerWithHeader title="Trainers">
      <Text h4>Select a Trainer</Text>
      <TrainerContainer>
        <ScrollView>
          {trainers.map(trainer => (
            <ListItem
              title={trainer.displayName}
              subtitle={(trainer.bio ? 'Bio: ' + trainer.bio : '')}
              leftAvatar={{ source: { uri: trainer.photoURL } }}
              onPress={() => navigation.navigate('TrainerPackages', {trainer: trainer})}
              bottomDivider
              chevron
            />
          ))}
        </ScrollView>
      </TrainerContainer>
    </ContainerWithHeader>
  );
};

Trainers.navigationOptions = {
  tabBarIcon: () => <Icon name="team" type="antdesign" />,
};
