import React, {useState, } from 'react';
import {Button, Icon, Input} from 'react-native-elements';
import styled from 'styled-components/native';
import {Text, StyleSheet, ScrollView} from 'react-native';
import { ContainerWithHeader } from '../../../components/container-with-header';
import { colors } from '../../../assets/colors';
import ModalDropdown from 'react-native-modal-dropdown';

export const PaymentSuccess = () => {
  return (
    <ContainerWithHeader title="Payment Successful">
      <Text>Thanks for your Payment!</Text>
      <Text></Text>

    </ContainerWithHeader>
  );
};
