import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  TeacherProfile, 
  Category, 
  Session, 
  BookSession, 
  Chat, 
  Settings,
  Help,
  Notifications,
  EditProfile
} from '../screens';
import { COLORS, ICONS } from '../constants';

// Auth Screens
import Login from '../screens/auth/Login';
import SignUp from '../screens/auth/SignUp';
import ForgotPassword from '../screens/auth/ForgotPassword';
import RoleSelection from '../screens/auth/RoleSelection';

// Teacher Screens
import TeacherDashboard from '../screens/teacher/Dashboard';
import TeacherSchedule from '../screens/teacher/Schedule';
import TeacherStudents from '../screens/teacher/Students';
import TeacherSettings from '../screens/teacher/Settings';

// Student Screens
import StudentDashboard from '../screens/student/Dashboard';
import StudentProfile from '../screens/student/Profile';
import TeachersList from '../screens/student/TeachersList';
import Resources from '../screens/student/Resources';
import StudentSettings from '../screens/student/Settings';

// Parent Screens
import ParentDashboard from '../screens/parent/Dashboard';
import ParentProfile from '../screens/parent/ParentProfile';
import Schedule from '../screens/parent/Schedule';
import Payments from '../screens/parent/Payments';
import ParentSettings from '../screens/parent/Settings';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Navigator
const AuthStack = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="RoleSelection" component={RoleSelection} />
    </Stack.Navigator>
  );
};

// Teacher Tab Navigator
const TeacherTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'TeacherDashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'TeacherSchedule') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'TeacherStudents') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'TeacherProfile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'TeacherSettings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 10,
          shadowOpacity: 0.1,
          shadowRadius: 20,
          height: 60,
          paddingBottom: 10,
        },
      })}
    >
      <Tab.Screen 
        name="TeacherDashboard" 
        component={TeacherDashboard} 
        options={{ 
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="TeacherSchedule" 
        component={TeacherSchedule} 
        options={{ 
          tabBarLabel: 'Schedule',
        }}
      />
      <Tab.Screen 
        name="TeacherStudents" 
        component={TeacherStudents} 
        options={{ 
          tabBarLabel: 'Students',
        }}
      />
      <Tab.Screen 
        name="TeacherProfile" 
        component={TeacherProfile} 
        options={{ 
          tabBarLabel: 'Profile',
        }}
      />
      <Tab.Screen 
        name="TeacherSettings" 
        component={TeacherSettings} 
        options={{ 
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};

// Student Tab Navigator
const StudentTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'StudentDashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'TeachersList') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Resources') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'StudentProfile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'StudentSettings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 10,
          shadowOpacity: 0.1,
          shadowRadius: 20,
          height: 60,
          paddingBottom: 10,
        },
      })}
    >
      <Tab.Screen 
        name="StudentDashboard" 
        component={StudentDashboard} 
        options={{ 
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="TeachersList" 
        component={TeachersList} 
        options={{ 
          tabBarLabel: 'Teachers',
        }}
      />
      <Tab.Screen 
        name="Resources" 
        component={Resources} 
        options={{ 
          tabBarLabel: 'Resources',
        }}
      />
      <Tab.Screen 
        name="StudentProfile" 
        component={StudentProfile} 
        options={{ 
          tabBarLabel: 'Profile',
        }}
      />
      <Tab.Screen 
        name="StudentSettings" 
        component={StudentSettings} 
        options={{ 
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};

// Parent Tab Navigator
const ParentTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'ParentDashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'ParentSchedule') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'ParentPayments') {
            iconName = focused ? 'card' : 'card-outline';
          } else if (route.name === 'ParentProfile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'ParentSettings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 10,
          shadowOpacity: 0.1,
          shadowRadius: 20,
          height: 60,
          paddingBottom: 10,
        },
      })}
    >
      <Tab.Screen 
        name="ParentDashboard" 
        component={ParentDashboard} 
        options={{ 
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="ParentSchedule" 
        component={Schedule} 
        options={{ 
          tabBarLabel: 'Schedule',
        }}
      />
      <Tab.Screen 
        name="ParentPayments" 
        component={Payments} 
        options={{ 
          tabBarLabel: 'Payments',
        }}
      />
      <Tab.Screen 
        name="ParentProfile" 
        component={ParentProfile} 
        options={{ 
          tabBarLabel: 'Profile',
        }}
      />
      <Tab.Screen 
        name="ParentSettings" 
        component={ParentSettings} 
        options={{ 
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};

// Main Navigator
const AppNavigator = () => {
  // Check if user is logged in
  const isLoggedIn = false; // Replace with actual auth check
  const userRole = null; // Replace with actual role check

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isLoggedIn ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <>
            {userRole === 'teacher' && (
              <Stack.Screen name="TeacherTabs" component={TeacherTabs} />
            )}
            {userRole === 'student' && (
              <Stack.Screen name="StudentTabs" component={StudentTabs} />
            )}
            {userRole === 'parent' && (
              <Stack.Screen name="ParentTabs" component={ParentTabs} />
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 