import React from 'react';
import { Modal, Picker } from 'react-native';
import { Text, Button } from 'react-native-elements';
import styled from 'styled-components/native';
import { ProfileScreen } from '../stores/profileScreen';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const ListContainer = styled.View`
  flex-direction: column;
  flex: 1;
  width: 100%;
`;

const HeaderContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const arrHours = (
  sunday,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
) => {
  const arr = [];

  if (sunday.start && sunday.end) {
    arr.push({
      day: 'sunday',
      start: sunday.start,
      end: sunday.end,
    });
  }
  if (monday.start && monday.end) {
    arr.push({
      day: 'monday',
      start: monday.start,
      end: monday.end,
    });
  }
  if (tuesday.start && tuesday.end) {
    arr.push({
      day: 'tuesday',
      start: tuesday.start,
      end: tuesday.end,
    });
  }
  if (wednesday.start && wednesday.end) {
    arr.push({
      day: 'wednesday',
      start: wednesday.start,
      end: wednesday.end,
    });
  }
  if (thursday.start && thursday.end) {
    arr.push({
      day: 'thursday',
      start: thursday.start,
      end: thursday.end,
    });
  }
  if (friday.start && friday.end) {
    arr.push({
      day: 'friday',
      start: friday.start,
      end: friday.end,
    });
  }
  if (saturday.start && saturday.end) {
    arr.push({
      day: 'saturday',
      start: saturday.start,
      end: saturday.end,
    });
  }

  return arr;
};

export const Availability = event => {
  const {
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    // Not sure why I had to stringify/parse to get the hours value.
  } = JSON.parse(JSON.stringify(event)).hours;

  const hours = arrHours(
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
  );

  return (
    <ListContainer>
      {hours.length < 1 ? (
        <Text>Edit this panel to add your available hours.</Text>
      ) : (
        hours.map(h => {
          return (
            <HeaderContainer>
              <Text>{h.day.charAt(0).toUpperCase() + h.day.slice(1)}</Text>
              <Text>{`${h.start} to ${h.end}`}</Text>
            </HeaderContainer>
          );
        })
      )}
    </ListContainer>
  );
};

export const HoursEdit = event => {
  const {
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    // Not sure why I had to stringify/parse to get the hours value.
  } = JSON.parse(JSON.stringify(event)).hours;

  return (
    <ListContainer>
      <Button onPress={ProfileScreen.setDayPickerVisible} />
      <Modal animationType="slide" transparent={true}>
        <Picker
          selectedValue={ProfileScreen.selectedDay}
          onPress={ProfileScreen.setEditHours}
          onValueChange={value => ProfileScreen.setDay(value)}>
          {days.map(d => {
            return <Picker.PickerItem label={d} value={d.toLowerCase()} />;
          })}
        </Picker>
      </Modal>
    </ListContainer>
  );
};
