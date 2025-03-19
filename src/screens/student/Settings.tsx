import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Switch,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../../constants';

const Settings = ({ navigation }: any) => {
  // State for various settings
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [downloadOverWifi, setDownloadOverWifi] = useState(true);
  const [autoPlayVideos, setAutoPlayVideos] = useState(false);
  const [reminderEnabled, setReminderEnabled] = useState(true);
  
  // Setting sections
  const accountSettings = [
    {
      id: '1',
      title: 'Profile Information',
      icon: 'person-outline',
      screen: 'EditProfile',
      description: 'Edit your personal information',
    },
    {
      id: '2',
      title: 'Password & Security',
      icon: 'lock-closed-outline',
      screen: 'Security',
      description: 'Manage your passwords and security settings',
    },
    {
      id: '3',
      title: 'Linked Accounts',
      icon: 'link-outline',
      screen: 'LinkedAccounts',
      description: 'Connect with other accounts and services',
    },
    {
      id: '4',
      title: 'Privacy Settings',
      icon: 'shield-outline',
      screen: 'Privacy',
      description: 'Control your data and privacy preferences',
    },
  ];
  
  const appSettings = [
    {
      id: '1',
      title: 'Notifications',
      icon: 'notifications-outline',
      toggle: true,
      value: notificationsEnabled,
      onToggle: setNotificationsEnabled,
      description: 'Receive push notifications',
    },
    {
      id: '2',
      title: 'Email Notifications',
      icon: 'mail-outline',
      toggle: true,
      value: emailNotifications,
      onToggle: setEmailNotifications,
      description: 'Receive email updates and newsletters',
    },
    {
      id: '3',
      title: 'Dark Mode',
      icon: 'moon-outline',
      toggle: true,
      value: darkMode,
      onToggle: setDarkMode,
      description: 'Enable dark theme for the app',
    },
    {
      id: '4',
      title: 'Download Over Wi-Fi Only',
      icon: 'wifi-outline',
      toggle: true,
      value: downloadOverWifi,
      onToggle: setDownloadOverWifi,
      description: 'Download content only when connected to Wi-Fi',
    },
    {
      id: '5',
      title: 'Auto-Play Videos',
      icon: 'play-outline',
      toggle: true,
      value: autoPlayVideos,
      onToggle: setAutoPlayVideos,
      description: 'Automatically play videos in feeds',
    },
    {
      id: '6',
      title: 'Study Reminders',
      icon: 'alarm-outline',
      toggle: true,
      value: reminderEnabled,
      onToggle: setReminderEnabled,
      description: 'Get reminders for scheduled study sessions',
    },
  ];
  
  const supportSettings = [
    {
      id: '1',
      title: 'Help Center',
      icon: 'help-circle-outline',
      screen: 'Help',
      description: 'Get help and support',
    },
    {
      id: '2',
      title: 'Report a Problem',
      icon: 'warning-outline',
      screen: 'ReportProblem',
      description: 'Report issues or bugs in the app',
    },
    {
      id: '3',
      title: 'Terms of Service',
      icon: 'document-text-outline',
      screen: 'Terms',
      description: 'Read our terms and conditions',
    },
    {
      id: '4',
      title: 'Privacy Policy',
      icon: 'shield-checkmark-outline',
      screen: 'PrivacyPolicy',
      description: 'Read our privacy policy',
    },
    {
      id: '5',
      title: 'About',
      icon: 'information-circle-outline',
      screen: 'About',
      description: 'App version and information',
    },
  ];

  // Render a setting item with toggle
  const renderToggleSetting = (item: any) => (
    <View style={styles.settingItem} key={item.id}>
      <View style={styles.settingContent}>
        <View style={styles.settingIconContainer}>
          <Ionicons name={item.icon} size={22} color={COLORS.primary} />
        </View>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          <Text style={styles.settingDescription}>{item.description}</Text>
        </View>
      </View>
      <Switch
        trackColor={{ false: COLORS.lightGray, true: COLORS.lightPrimary }}
        thumbColor={item.value ? COLORS.primary : COLORS.gray}
        ios_backgroundColor={COLORS.lightGray}
        onValueChange={item.onToggle}
        value={item.value}
      />
    </View>
  );

  // Render a setting item that navigates to another screen
  const renderNavigationSetting = (item: any) => (
    <TouchableOpacity
      style={styles.settingItem}
      key={item.id}
      onPress={() => navigation.navigate(item.screen)}
    >
      <View style={styles.settingContent}>
        <View style={styles.settingIconContainer}>
          <Ionicons name={item.icon} size={22} color={COLORS.primary} />
        </View>
        <View style={styles.settingInfo}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          <Text style={styles.settingDescription}>{item.description}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={22} color={COLORS.gray} />
    </TouchableOpacity>
  );

  // Handle logout
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => navigation.navigate('Login'),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  // Handle clear cache
  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'This will clear all cached data. Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          onPress: () => {
            // Logic to clear cache would go here
            Alert.alert('Success', 'Cache cleared successfully.');
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholderView} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          {accountSettings.map(item => renderNavigationSetting(item))}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          {appSettings.map(item => renderToggleSetting(item))}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & About</Text>
          {supportSettings.map(item => renderNavigationSetting(item))}
        </View>
        
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleClearCache}
          >
            <Ionicons name="trash-outline" size={22} color={COLORS.text} />
            <Text style={styles.actionButtonText}>Clear Cache</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.logoutButton]}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={22} color={COLORS.error} />
            <Text style={[styles.actionButtonText, styles.logoutText]}>Logout</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding * 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.text,
  },
  backButton: {
    padding: SIZES.padding,
  },
  placeholderView: {
    width: 40, // Same width as backButton for balance
  },
  scrollContainer: {
    flex: 1,
  },
  section: {
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.padding,
  },
  settingContent: {
    flexDirection: 'row',
    flex: 1,
    marginRight: SIZES.padding,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding,
  },
  settingInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  settingTitle: {
    ...FONTS.body3,
    color: COLORS.text,
    marginBottom: 2,
  },
  settingDescription: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.padding,
    marginVertical: SIZES.padding / 2,
  },
  actionButtonText: {
    ...FONTS.body3,
    color: COLORS.text,
    marginLeft: SIZES.padding,
  },
  logoutButton: {
    marginTop: SIZES.padding,
  },
  logoutText: {
    color: COLORS.error,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: SIZES.padding * 2,
  },
  versionText: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
});

export default Settings; 