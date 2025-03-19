import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnBoarding1 from '../screens/OnBoarding1';
import OnBoarding2 from '../screens/OnBoarding2';
import OnBoarding3 from '../screens/OnBoarding3';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Verification from '../screens/Verification';
import ForgotPassword from '../screens/ForgotPassword';
import { COLORS } from '../constants';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: COLORS.white },
      }}
    >
      <Stack.Screen name="OnBoarding1" component={OnBoarding1} />
      <Stack.Screen name="OnBoarding2" component={OnBoarding2} />
      <Stack.Screen name="OnBoarding3" component={OnBoarding3} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack; 