import React from 'react';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';

const App = () => {
  return (
    <NativeRouter style={{ fontFamily: 'Cochin' }}>
      <Main />
    </NativeRouter>
  );
};

export default App;