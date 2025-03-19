import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES, ICONS } from '../../constants';

const TeacherSettings = ({ navigation }: any) => {
  const [notifications, setNotifications] = useState({
    classReminders: true,
    studentMessages: true,
    paymentUpdates: true,
    marketingEmails: false,
  });

  const [preferences, setPreferences] = useState({
    autoAcceptBookings: false,
    showEarnings: true,
    darkMode: false,
    language: 'English',
  });

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            // Handle logout logic here
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        },
      ]
    );
  };

  const renderSection = (title: string, children: React.ReactNode) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const renderSettingItem = (
    icon: string,
    title: string,
    value?: string | boolean,
    onPress?: () => void,
    isSwitch?: boolean,
    onValueChange?: (value: boolean) => void
  ) => (
    <TouchableOpacity 
      style={styles.settingItem}
      onPress={onPress}
      disabled={isSwitch}
    >
      <View style={styles.settingItemLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={20} color={COLORS.primary} />
        </View>
        <Text style={styles.settingItemTitle}>{title}</Text>
      </View>
      {isSwitch ? (
        <Switch
          value={value as boolean}
          onValueChange={onValueChange}
          trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
          thumbColor={COLORS.white}
        />
      ) : (
        <View style={styles.settingItemRight}>
          <Text style={styles.settingItemValue}>{value}</Text>
          <Ionicons name={ICONS.chevronForward} size={20} color={COLORS.gray} />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name={ICONS.back} size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {renderSection('Profile', (
          <>
            {renderSettingItem(
              ICONS.person,
              'Edit Profile',
              undefined,
              () => navigation.navigate('EditProfile')
            )}
            {renderSettingItem(
              ICONS.document,
              'Teaching Profile',
              undefined,
              () => navigation.navigate('TeachingProfile')
            )}
            {renderSettingItem(
              ICONS.wallet,
              'Payment Information',
              undefined,
              () => navigation.navigate('PaymentInfo')
            )}
          </>
        ))}

        {renderSection('Notifications', (
          <>
            {renderSettingItem(
              ICONS.calendar,
              'Class Reminders',
              notifications.classReminders,
              undefined,
              true,
              (value) => setNotifications(prev => ({ ...prev, classReminders: value }))
            )}
            {renderSettingItem(
              ICONS.chat,
              'Student Messages',
              notifications.studentMessages,
              undefined,
              true,
              (value) => setNotifications(prev => ({ ...prev, studentMessages: value }))
            )}
            {renderSettingItem(
              ICONS.wallet,
              'Payment Updates',
              notifications.paymentUpdates,
              undefined,
              true,
              (value) => setNotifications(prev => ({ ...prev, paymentUpdates: value }))
            )}
            {renderSettingItem(
              ICONS.mail,
              'Marketing Emails',
              notifications.marketingEmails,
              undefined,
              true,
              (value) => setNotifications(prev => ({ ...prev, marketingEmails: value }))
            )}
          </>
        ))}

        {renderSection('Preferences', (
          <>
            {renderSettingItem(
              ICONS.checkmark,
              'Auto-Accept Bookings',
              preferences.autoAcceptBookings,
              undefined,
              true,
              (value) => setPreferences(prev => ({ ...prev, autoAcceptBookings: value }))
            )}
            {renderSettingItem(
              ICONS.wallet,
              'Show Earnings',
              preferences.showEarnings,
              undefined,
              true,
              (value) => setPreferences(prev => ({ ...prev, showEarnings: value }))
            )}
            {renderSettingItem(
              ICONS.moon,
              'Dark Mode',
              preferences.darkMode,
              undefined,
              true,
              (value) => setPreferences(prev => ({ ...prev, darkMode: value }))
            )}
            {renderSettingItem(
              ICONS.language,
              'Language',
              preferences.language,
              () => navigation.navigate('LanguageSettings')
            )}
          </>
        ))}

        {renderSection('Support', (
          <>
            {renderSettingItem(
              ICONS.help,
              'Help Center',
              undefined,
              () => navigation.navigate('HelpCenter')
            )}
            {renderSettingItem(
              ICONS.document,
              'Terms of Service',
              undefined,
              () => navigation.navigate('Terms')
            )}
            {renderSettingItem(
              ICONS.shield,
              'Privacy Policy',
              undefined,
              () => navigation.navigate('Privacy')
            )}
          </>
        ))}

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    paddingHorizontal: SIZES.padding * 2,
    paddingTop: SIZES.padding * 2,
    paddingBottom: SIZES.padding,
  },
  backButton: {
    padding: SIZES.padding / 2,
    marginRight: SIZES.padding,
  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.text,
  },
  section: {
    paddingHorizontal: SIZES.padding * 2,
    marginTop: SIZES.padding * 2,
  },
  sectionTitle: {
    ...FONTS.h4,
    color: COLORS.gray,
    marginBottom: SIZES.padding,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding,
  },
  settingItemTitle: {
    ...FONTS.body3,
    color: COLORS.text,
  },
  settingItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemValue: {
    ...FONTS.body3,
    color: COLORS.gray,
    marginRight: SIZES.padding / 2,
  },
  logoutButton: {
    margin: SIZES.padding * 2,
    padding: SIZES.padding,
    backgroundColor: COLORS.error,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  logoutText: {
    ...FONTS.button,
    color: COLORS.white,
  },
});

export default TeacherSettings; 