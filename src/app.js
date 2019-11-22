import React from 'react';
import { ThemeProvider } from 'react-native-elements';

import { Routes } from './screens';
import { colors } from './assets/colors';

const theme = {
  Text: {
    color: colors.text.default,
  },
};

export const App = () => (
  <ThemeProvider theme={theme}>
    <Routes />
  </ThemeProvider>
);
