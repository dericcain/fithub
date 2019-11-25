import React from 'react';
import { Icon, Text, Avatar, Button, Input } from 'react-native-elements';
import { view } from 'react-easy-state';
import { firebase } from '@react-native-firebase/auth';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import { User } from '../../../stores/user';
import { ProfileScreen } from '../../../stores/profileScreen';
import { ContainerWithHeader } from '../../../components/container-with-header';
import { Availability, HoursEdit } from '../../../utils/hours-functions';

export const Profile = view(({ navigation }) => {
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      });
  };

  const handleZipChange = synthEvent => {
    User.setPostalCode(synthEvent.nativeEvent.text);
    ProfileScreen.setEditInfo();
  };

  const ListContainer = styled.View`
    flex-direction: column;
    flex: 1;
    width: 100%;
  `;

  const ContentContainer = styled.View`
    flex-direction: column;
    flex: 1;
    background-color: white;
    margin: 12px;
    padding: 12px;
    border-radius: 6px;
  `;

  const HeaderContainer = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
  `;

  const ProfileRow = styled.View`
    flex: 1;
    flex-direction: row;
  `;

  const ContentHeader = ({ title, edit }) => {
    return (
      <HeaderContainer style={{ marginBottom: 12 }}>
        <Text h4>{title}</Text>
        <Icon onPress={edit} name="edit" style={{ alignSelf: 'flex-end' }} />
      </HeaderContainer>
    );
  };

  return (
    <ScrollView>
      <ContainerWithHeader title="Profile">
        <Avatar rounded size="large" source={{ uri: User.photoURL }} />
        <Text h4 style={{ marginTop: 24 }}>
          {User.displayName}
        </Text>
        <ListContainer style={{ marginTop: 12 }}>
          <ContentContainer>
            <ContentHeader title="My Info" edit={ProfileScreen.setEditInfo} />
            {!ProfileScreen.editInfo ? (
              <ProfileRow style={{ alignItems: 'center' }}>
                <Icon name="mail" color="gray" />
                <Text style={{ fontSize: 16, marginLeft: 12 }}>
                  <Text style={{ fontWeight: '800' }}>Zip Code: </Text>
                  <Text stle={{ fontWeight: '100' }}>{User.postalCode}</Text>
                </Text>
              </ProfileRow>
            ) : (
              <Input
                style={{ marginTop: 12 }}
                label="Edit Zip Code: "
                keyboardType="number-pad"
                returnKeyType="done"
                defaultValue={User.postalCode}
                onSubmitEditing={handleZipChange}
                placeholder="90210"
              />
            )}
          </ContentContainer>
          <ContentContainer>
            <ContentHeader
              title="Availability"
              edit={ProfileScreen.setEditHours}
            />
            {ProfileScreen.editHours ? (
              <HoursEdit hours={User.hours} />
            ) : (
              <Availability hours={User.hours} />
            )}
          </ContentContainer>
          <ContentContainer>
            <ContentHeader title="Ratings" />
          </ContentContainer>
          <ContentContainer>
            <ContentHeader title="Package History" />
          </ContentContainer>
        </ListContainer>
        <Button title="Sign out" type="clear" onPress={logout} />
      </ContainerWithHeader>
    </ScrollView>
  );
});

Profile.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="user" type="antdesign" color={tintColor} />
  ),
};
