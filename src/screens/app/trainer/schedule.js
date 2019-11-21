import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Icon, Text, ListItem } from 'react-native-elements';
import styled from 'styled-components/native';
import { pick } from 'lodash';
import { format } from 'date-fns';
import { view } from 'react-easy-state';

import { ContainerWithHeader } from '../../../components/container-with-header';
import { GoogleSignin } from '@react-native-community/google-signin';

const ListContainer = styled.View`
  flex-direction: column;
  flex: 1;
  width: 100%;
`;

export const Schedule = view(() => {
  const [userEvents, setUserEvents] = useState([]);
  useEffect(() => {
    GoogleSignin.getTokens().then(({ accessToken }) => {
      function addDays(days) {
        const result = new Date();
        result.setDate(result.getDate() + days);
        return result;
      }
      const now = new Date().toISOString();
      const later = addDays(7).toISOString();

      const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${now}&timeMax=${later}&orderBy=startTime&singleEvents=true`;
      fetch(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(j => j.json())
        .then(r => {
          console.log(r);
          setUserEvents(
            r.items.map(i => pick(i, ['id', 'start', 'end', 'summary'])),
          );
        });
    });
  }, []);
  console.log(userEvents);
  return (
    <ContainerWithHeader title="Schedule">
      <Text h4>This is the Schedule Page</Text>
      <ListContainer>
        <ScrollView>
          {userEvents.map(({ id, start, end, summary }) => (
            <ListItem
              key={id}
              title={summary}
              subtitle={`${start.dateTime} to ${end.dateTime}`}
              bottomDivider
            />
          ))}
        </ScrollView>
      </ListContainer>
    </ContainerWithHeader>
  );
});

Schedule.navigationOptions = {
  tabBarIcon: () => <Icon name="calendar" type="antdesign" />,
};
