import React from 'react';
import { ThemeProvider } from 'react-native-elements';

import { Routes } from './screens';

export const App = () => (
  <ThemeProvider>
    <Routes />
  </ThemeProvider>
);
