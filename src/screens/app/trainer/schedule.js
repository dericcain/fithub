import React, { useEffect } from 'react';
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
import { colors } from '../../../assets/colors';
import { Events } from '../../../stores/events';
import { User } from '../../../stores/user';

const initials = name =>
  name
    .split(' ')
    .map(n => n[0])
    .join('');

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
  useEffect(() => {
    fetchGoogleEvents(true);
    Events.fetchEvents(User.uid);
  }, []);

  const getTimeText = (isAllDayEvent, start, end) =>
    isAllDayEvent ? 'All day event' : `${start} - ${end}`;

  const renderItem = ({
    name,
    allDayEvent,
    startTime,
    endTime,
    participant,
    price,
  }) => (
    <Event isFithubEvent={!!participant}>
      <EventLeft>
        <EventTime>
          <EventTimeText>
            {getTimeText(allDayEvent, startTime, endTime)}
          </EventTimeText>
        </EventTime>
        <EventName>
          <EventNameText>{participant ? participant : name}</EventNameText>
        </EventName>
        <EventDetails>
          <EventDetailsText>{participant && `$${price}: ${name}`}</EventDetailsText>
        </EventDetails>
      </EventLeft>
      <EventRight>
        {participant && (
          <Avatar
            rounded
            size="small"
            title={initials(participant)}
            overlayContainerStyle={{ backgroundColor: colors.purple.lighter }}
          />
        )}
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
          items={Events.events}
          selected={format(now, FORMAT)}
          minDate={format(subDays(now, RANGE), FORMAT)}
          maxDate={format(addDays(now, RANGE), FORMAT)}
          pastScrollRange={6}
          futureScrollRange={6}
          renderItem={renderItem}
          renderEmptyDate={renderEmptyDay}
          rowHasChanged={rowHasChanged}
          renderEmptyData={renderEmptyData}
          theme={{
            selectedDayBackgroundColor: colors.purple.light,
            todayTextColor: colors.accent,
            dayTextColor: colors.grey.dark,
            dotColor: colors.success,
            textSectionTitleColor: colors.grey.dark,
            agendaTodayColor: colors.purple.default,
            agendaKnobColor: colors.accent,
          }}
        />
      </ListContainer>
    </ContainerWithHeader>
  );
});

Schedule.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="calendar" type="antdesign" color={tintColor} />
  ),
};
