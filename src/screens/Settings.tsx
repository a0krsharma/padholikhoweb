import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  Switch,
  Alert,
  ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants';

const Settings = ({ navigation }: any) => {
  // State variables for settings
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [sessionReminders, setSessionReminders] = useState(true);
  const [promotionalUpdates, setPromotionalUpdates] = useState(false);
  const [dataUsage, setDataUsage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = useCallback(() => {
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
          onPress: () => {
            setIsLoading(true);
            // Simulate logout process
            setTimeout(() => {
              setIsLoading(false);
              navigation.reset({
                index: 0,
                routes: [{ name: 'Auth', params: { screen: 'Login' } }],
              });
            }, 800);
          },
          style: 'destructive',
        },
      ]
    );
  }, [navigation]);

  const handleDeleteAccount = useCallback(() => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            setIsLoading(true);
            // In a real app, you would send a request to delete the account
            setTimeout(() => {
              setIsLoading(false);
              Alert.alert('Account Deleted', 'Your account has been deleted.');
              navigation.reset({
                index: 0,
                routes: [{ name: 'Auth', params: { screen: 'Login' } }],
              });
            }, 1500);
          },
          style: 'destructive',
        },
      ]
    );
  }, [navigation]);

  // Toggle handlers with better feedback
  const handleToggle = useCallback((settingName: string, currentValue: boolean, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    // Simulate API call to save setting
    setIsLoading(true);
    setTimeout(() => {
      setter(!currentValue);
      setIsLoading(false);
    }, 300);
  }, []);

  const settingSections = [
    {
      title: 'Appearance',
      items: [
        {
          title: 'Dark Mode',
          icon: 'moon-outline',
          type: 'toggle',
          value: darkMode,
          onValueChange: () => handleToggle('darkMode', darkMode, setDarkMode),
          accessibilityLabel: 'Toggle dark mode',
        }
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          title: 'Push Notifications',
          icon: 'notifications-outline',
          type: 'toggle',
          value: notifications,
          onValueChange: () => handleToggle('notifications', notifications, setNotifications),
          accessibilityLabel: 'Toggle push notifications',
        },
        {
          title: 'Email Notifications',
          icon: 'mail-outline',
          type: 'toggle',
          value: emailNotifications,
          onValueChange: () => handleToggle('emailNotifications', emailNotifications, setEmailNotifications),
          accessibilityLabel: 'Toggle email notifications',
        },
        {
          title: 'Session Reminders',
          icon: 'alarm-outline',
          type: 'toggle',
          value: sessionReminders,
          onValueChange: () => handleToggle('sessionReminders', sessionReminders, setSessionReminders),
          accessibilityLabel: 'Toggle session reminders',
        },
        {
          title: 'Promotional Updates',
          icon: 'gift-outline',
          type: 'toggle',
          value: promotionalUpdates,
          onValueChange: () => handleToggle('promotionalUpdates', promotionalUpdates, setPromotionalUpdates),
          accessibilityLabel: 'Toggle promotional updates',
        }
      ],
    },
    {
      title: 'Privacy and Security',
      items: [
        {
          title: 'Change Password',
          icon: 'key-outline',
          type: 'link',
          onPress: () => navigation.navigate('Auth', { screen: 'ForgotPassword' }),
          accessibilityLabel: 'Change password',
        },
        {
          title: 'Data Usage',
          icon: 'analytics-outline',
          type: 'toggle',
          value: dataUsage,
          onValueChange: () => handleToggle('dataUsage', dataUsage, setDataUsage),
          accessibilityLabel: 'Toggle data usage',
        },
        {
          title: 'Privacy Policy',
          icon: 'document-text-outline',
          type: 'link',
          onPress: () => Alert.alert('Privacy Policy', 'Opens privacy policy page'),
          accessibilityLabel: 'View privacy policy',
        }
      ],
    },
    {
      title: 'Account',
      items: [
        {
          title: 'Logout',
          icon: 'log-out-outline',
          type: 'link',
          onPress: handleLogout,
          color: COLORS.error,
          accessibilityLabel: 'Logout from account',
        },
        {
          title: 'Delete Account',
          icon: 'trash-outline',
          type: 'link',
          onPress: handleDeleteAccount,
          color: COLORS.error,
          accessibilityLabel: 'Delete your account',
        }
      ],
    }
  ];

  const renderToggle = (item: any) => (
    <Switch
      trackColor={{ false: COLORS.lightGray, true: `${COLORS.primary}80` }}
      thumbColor={item.value ? COLORS.primary : COLORS.gray}
      onValueChange={item.onValueChange}
      value={item.value}
      disabled={isLoading}
      accessibilityLabel={item.accessibilityLabel}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingSections.map((section, sectionIndex) => (
          <View key={`section-${sectionIndex}`} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={`item-${sectionIndex}-${itemIndex}`}
                style={styles.settingItem}
                onPress={item.type === 'link' ? item.onPress : null}
                activeOpacity={item.type === 'link' ? 0.7 : 1}
                disabled={isLoading}
                accessibilityLabel={item.accessibilityLabel}
              >
                <View style={styles.settingItemLeft}>
                  <Ionicons 
                    name={item.icon} 
                    size={24} 
                    color={item.color || COLORS.primary} 
                    style={styles.settingIcon} 
                  />
                  <Text style={[
                    styles.settingTitle,
                    item.color ? { color: item.color } : null
                  ]}>
                    {item.title}
                  </Text>
                </View>
                
                {item.type === 'toggle' && renderToggle(item)}
                
                {item.type === 'link' && (
                  <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <View style={styles.appInfoContainer}>
          <Text style={styles.appVersion}>Padho Likho App v1.0.0</Text>
          <Text style={styles.copyright}>© 2023 Padho Likho Education Pvt. Ltd.</Text>
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
    alignItems: 'center',
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    marginRight: SIZES.padding,
  },
  headerTitle: {
    ...FONTS.h3,
    color: COLORS.text,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: SIZES.padding * 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionTitle: {
    ...FONTS.h4,
    color: COLORS.gray,
    marginBottom: SIZES.padding,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SIZES.padding,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: SIZES.padding,
  },
  settingTitle: {
    ...FONTS.body3,
    color: COLORS.text,
  },
  appInfoContainer: {
    padding: SIZES.padding * 2,
    alignItems: 'center',
  },
  appVersion: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginBottom: 4,
  },
  copyright: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  loadingOverlay: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Settings; 