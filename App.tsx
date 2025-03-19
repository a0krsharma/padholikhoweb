import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS } from './src/constants';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar 
        backgroundColor={COLORS.white} 
        barStyle="dark-content" 
      />
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;
