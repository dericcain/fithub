import React, { useState } from 'react';
import { Input, Button, Overlay, Text } from 'react-native-elements';
import styled from 'styled-components/native';
import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { firebase } from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addMinutes } from 'date-fns';

import { ContainerWithHeader } from '../../../components/container-with-header';
import { colors } from '../../../assets/colors';
import { User } from '../../../stores/user';

const MONTHS = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];

const YEARS = ['19', '20', '21', '22', '23', '24', '25', '26'];

const DateContainer = styled.View`
  padding: 12px;
`;

const PaymentContainer = styled.View`
  flex-direction: column;
  flex: 1;
  width: 100%;
`;

const PaymentOptions = styled.View`
  background: #ffffff;
  opacity: 0.63;
  border-radius: 6px;
  margin-left: 25px;
  margin-right: 25px;
  margin-top: 20px;
  padding-top: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`;

const CreditCardCCV = styled.View`
  flex-direction: row;
  width: 62%;
`;

const Package = styled.View`
  padding-left: 18px;
  padding-right: 18px;
  margin-bottom: 12px;
`;

const styles = StyleSheet.create({
  dropdown: {
    alignSelf: 'flex-end',
    width: 55,
    marginBottom: 5,
    borderRadius: 6,
    backgroundColor: colors.purple.default,
  },
  dropdown_text: {
    marginVertical: 5,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dropdown_dropdown: {
    width: 75,
    height: 200,
    borderColor: colors.purple.default,
    borderWidth: 2,
    borderRadius: 3,
  },
  security_code_text: {
    alignSelf: 'flex-end',
    fontSize: 30,
    color: 'grey',
    marginBottom: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export const Payments = ({ navigation }) => {
  const [date, setDate] = useState(new Date(Date.now()));
  const [loading, setLoading] = useState(false);
  const {
    id,
    description,
    duration,
    name,
    price,
    userId: trainerId,
  } = navigation.getParam('selectedPackage', '');

  const pay = () => {
    setLoading(true);
    firebase
      .firestore()
      .collection('users')
      .doc(trainerId)
      .get()
      .then(r => {
        const { displayName, photoURL } = r.data();
        return firebase
          .firestore()
          .collection('events')
          .add({
            startTime: date,
            participant: User.displayName,
            sessionId: id,
            trainerId,
            price,
            endTime: addMinutes(date, duration),
            description,
            name,
            trainer: displayName,
            trainerAvatar: photoURL,
            participantEmail: User.email,
          });
      })
      .then(r => {
        console.log('Event added', r);
      })
      .catch(e => {
        throw new Error(e);
      });
    setTimeout(() => navigation.navigate('PaymentSuccess'), 3000);
  };

  return (
    <ContainerWithHeader
      title={`Reserve: ${name}`}
      leftComponent={{
        icon: 'left',
        type: 'antdesign',
        color: colors.white,
        onPress: () => navigation.navigate('Trainers'),
      }}>
      <Package>
        <Text h4 style={{ fontWeight: '500', color: colors.text.default }}>
          {name} ({duration}min)
        </Text>
      </Package>
      <Package>
        <Text h6 style={{ fontWeight: '300', color: colors.text.default }}>
          {description}
        </Text>
      </Package>
      <PaymentContainer>
        <ScrollView>
          <PaymentOptions>
            <Input
              textContentType="name"
              label="Name"
              placeholder="Bruce Lee"
              value={User.displayName}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              disabled
              disabledInputStyle={{ opacity: 0.9 }}
            />
            <Input
              textContentType="emailAddress"
              label="Email"
              placeholder="BruceLee@gmail.com"
              value={User.email}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              disabled
              disabledInputStyle={{ opacity: 0.9 }}
            />
            <DateContainer>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#86939e',
                }}>
                What day and time to reserve?
              </Text>
              <DateTimePicker
                value={date}
                mode="datetime"
                display="calendar"
                onChange={(_, newDate) => setDate(newDate)}
                minimumDate={new Date()}
                minuteInterval={15}
              />
            </DateContainer>
          </PaymentOptions>
          <PaymentOptions>
            <Input
              class="input"
              label="Credit Card"
              keyboardType="number-pad"
              textContentType="creditCardNumber"
              maxLength={16}
              placeholder="Card Number"
              inputContainerStyle={{ borderBottomWidth: 0 }}
            />
            <CreditCardCCV>
              <Input
                class="input"
                label="Security Code"
                keyboardType="number-pad"
                maxLength={4}
                placeholder="CCV"
                inputContainerStyle={{ borderBottomWidth: 0 }}
              />
              <ModalDropdown
                style={styles.dropdown}
                textStyle={styles.dropdown_text}
                dropdownStyle={styles.dropdown_dropdown}
                defaultValue="MM"
                options={MONTHS}
              />
              <Text style={styles.security_code_text}> / </Text>
              <ModalDropdown
                style={styles.dropdown}
                textStyle={styles.dropdown_text}
                dropdownStyle={styles.dropdown_dropdown}
                defaultValue="YY"
                options={YEARS}
              />
            </CreditCardCCV>
          </PaymentOptions>
          <Button
            title={`Pay $${price}`}
            style={{ marginTop: 10, paddingLeft: 25, paddingRight: 25 }}
            buttonStyle={{
              backgroundColor: colors.purple.default,
              marginTop: 20,
              paddingLeft: 25,
              paddingRight: 25,
            }}
            onPress={pay}
            loading={loading}
          />
          <Overlay
            isVisible={false}
            windowBackgroundColor="rgba(255, 255, 255, .5)"
            overlayBackgroundColor={colors.purple.default}
            width="auto"
            height="auto"
            borderRadius={6}>
            <>
              <Text style={{ marginBottom: 24, color: colors.white }}>
                Processing Payment
              </Text>
              <ActivityIndicator size="large" color={colors.white} />
            </>
          </Overlay>
        </ScrollView>
      </PaymentContainer>
    </ContainerWithHeader>
  );
};
