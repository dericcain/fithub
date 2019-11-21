import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Icon, Text } from 'react-native-elements';
import styled from 'styled-components/native';
import { addDays, format, subDays } from 'date-fns';
import { Agenda } from 'react-native-calendars';
import { view } from 'react-easy-state';

import { ContainerWithHeader } from '../../../components/container-with-header';
import { fetchGoogleEvents } from '../../../utils/fetch-google-events';
import {
  Event,
  EventDetails,
  EventDetailsText,
  EventLeft,
  EventName,
  EventNameText,
  EventRight,
  EventTime,
  EventTimeText,
  NoEvents,
} from '../../../components/event';

const ListContainer = styled.View`
  flex-direction: column;
  flex: 1;
  width: 100%;
`;

// For the Agenda calendar: yyyy-mm-dd
const FORMAT = 'yyyy-MM-dd';
const RANGE = 60;
const now = new Date();

export const Schedule = view(() => {
  const [userEvents, setUserEvents] = useState({});
  useEffect(() => {
    fetchGoogleEvents().then(events => {
      setUserEvents(events);
    });
  }, []);

  const getTimeText = (isAllDayEvent, start, end) =>
    isAllDayEvent ? 'All day event' : `${start} - ${end}`;

  const renderItem = ({ name, allDayEvent, startTime, endTime }) => (
    <Event>
      <EventLeft>
        <EventTime>
          <EventTimeText>
            {getTimeText(allDayEvent, startTime, endTime)}
          </EventTimeText>
        </EventTime>
        <EventName>
          <EventNameText>{name}</EventNameText>
        </EventName>
        <EventDetails>
          <EventDetailsText>
            These are some details of the event....
          </EventDetailsText>
        </EventDetails>
      </EventLeft>
      <EventRight>
        <Avatar rounded size="small" title="DC" />
      </EventRight>
    </Event>
  );

  const renderEmptyDay = () => {
    return (
      <NoEvents>
        <Text>This is empty date!</Text>
      </NoEvents>
    );
  };

  const rowHasChanged = (r1, r2) => r1.name !== r2.name;

  const renderEmptyData = () => (
    <NoEvents>
      <Text>You have no events today.</Text>
    </NoEvents>
  );

  return (
    <ContainerWithHeader title="Schedule">
      <ListContainer>
        <Agenda
          items={userEvents}
          selected={format(now, FORMAT)}
          minDate={format(subDays(now, RANGE), FORMAT)}
          maxDate={format(addDays(now, RANGE), FORMAT)}
          pastScrollRange={6}
          futureScrollRange={6}
          renderItem={renderItem}
          renderEmptyDate={renderEmptyDay}
          rowHasChanged={rowHasChanged}
          renderEmptyData={renderEmptyData}
        />
      </ListContainer>
    </ContainerWithHeader>
  );
});

Schedule.navigationOptions = {
  tabBarIcon: () => <Icon name="calendar" type="antdesign" />,
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
