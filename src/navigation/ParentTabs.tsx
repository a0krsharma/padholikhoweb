import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';

// Screens
import ParentDashboard from '../screens/parent/ParentDashboard';
import ChildrenList from '../screens/parent/ChildrenList';
import AddEditChild from '../screens/parent/AddEditChild';
import ProgressReports from '../screens/parent/ProgressReports';
import Meetings from '../screens/parent/Meetings';
import MeetingDetails from '../screens/parent/MeetingDetails';
import Messages from '../screens/parent/Messages';
import Chat from '../screens/parent/Chat';
import Profile from '../screens/parent/Profile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ChildrenStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ChildrenList" component={ChildrenList} />
      <Stack.Screen name="AddEditChild" component={AddEditChild} />
      <Stack.Screen name="ChildProgress" component={ProgressReports} />
    </Stack.Navigator>
  );
};

const MeetingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MeetingsList" component={Meetings} />
      <Stack.Screen name="MeetingDetails" component={MeetingDetails} />
    </Stack.Navigator>
  );
};

const MessagesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MessagesList" component={Messages} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileMain" component={Profile} />
      {/* These screens would be implemented in a complete app */}
      <Stack.Screen name="ChangePassword" component={Profile} />
      <Stack.Screen name="Privacy" component={Profile} />
      <Stack.Screen name="Support" component={Profile} />
    </Stack.Navigator>
  );
};

const ParentTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";
          
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Children') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Meetings') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={ParentDashboard} />
      <Tab.Screen name="Children" component={ChildrenStack} />
      <Tab.Screen name="Meetings" component={MeetingsStack} />
      <Tab.Screen 
        name="Messages" 
        component={MessagesStack} 
        options={{ tabBarBadge: 3 }} 
      />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default ParentTabs; 