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
  ActivityIndicator,
  Platform
} from 'react-native';
import { SafeAreaView as SafeAreaViewRN } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FONTS, SIZES } from '../../constants';
import { AuthService } from '../../services/auth';

const Settings = ({ navigation }: any) => {
  // State variables for settings
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [sessionReminders, setSessionReminders] = useState(true);
  const [childActivityAlerts, setChildActivityAlerts] = useState(true);
  const [progressReports, setProgressReports] = useState(true);
  const [homeworkReminders, setHomeworkReminders] = useState(true);
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
          onPress: async () => {
            setIsLoading(true);
            try {
              await AuthService.signOut();
              navigation.reset({
                index: 0,
                routes: [{ name: 'Auth', params: { screen: 'Login' } }],
              });
            } catch (error) {
              Alert.alert('Error', 'Failed to logout. Please try again.');
            } finally {
              setIsLoading(false);
            }
          },
          style: 'destructive',
        },
      ]
    );
  }, [navigation]);

  const handleDeleteAccount = useCallback(() => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This will also remove all your children\'s data. This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            setIsLoading(true);
            try {
              // In a real app, you would call the API to delete the account
              await new Promise(resolve => setTimeout(resolve, 1500));
              navigation.reset({
                index: 0,
                routes: [{ name: 'Auth', params: { screen: 'Login' } }],
              });
            } catch (error) {
              Alert.alert('Error', 'Failed to delete account. Please try again.');
            } finally {
              setIsLoading(false);
            }
          },
          style: 'destructive',
        },
      ]
    );
  }, [navigation]);

  // Toggle handlers with better feedback
  const handleToggle = useCallback((settingName: string, currentValue: boolean, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsLoading(true);
    // Simulate API call to save setting
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
          icon: 'dark-mode',
          type: 'toggle',
          value: darkMode,
          onValueChange: () => handleToggle('darkMode', darkMode, setDarkMode),
          accessibilityLabel: 'Toggle dark mode',
        }
      ],
    },
    {
      title: 'Children',
      items: [
        {
          title: 'Manage Children',
          icon: 'people',
          type: 'link',
          onPress: () => navigation.navigate('ChildrenList'),
          accessibilityLabel: 'Manage children profiles',
        },
        {
          title: 'Progress Reports',
          icon: 'assessment',
          type: 'link',
          onPress: () => navigation.navigate('ProgressReports'),
          accessibilityLabel: 'View children progress reports',
        }
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          title: 'Push Notifications',
          icon: 'notifications',
          type: 'toggle',
          value: notifications,
          onValueChange: () => handleToggle('notifications', notifications, setNotifications),
          accessibilityLabel: 'Toggle push notifications',
        },
        {
          title: 'Email Notifications',
          icon: 'email',
          type: 'toggle',
          value: emailNotifications,
          onValueChange: () => handleToggle('emailNotifications', emailNotifications, setEmailNotifications),
          accessibilityLabel: 'Toggle email notifications',
        },
        {
          title: 'Session Reminders',
          icon: 'alarm',
          type: 'toggle',
          value: sessionReminders,
          onValueChange: () => handleToggle('sessionReminders', sessionReminders, setSessionReminders),
          accessibilityLabel: 'Toggle session reminders',
        },
        {
          title: 'Child Activity Alerts',
          icon: 'warning',
          type: 'toggle',
          value: childActivityAlerts,
          onValueChange: () => handleToggle('childActivityAlerts', childActivityAlerts, setChildActivityAlerts),
          accessibilityLabel: 'Toggle child activity alerts',
        },
        {
          title: 'Progress Reports',
          icon: 'bar-chart',
          type: 'toggle',
          value: progressReports,
          onValueChange: () => handleToggle('progressReports', progressReports, setProgressReports),
          accessibilityLabel: 'Toggle progress report notifications',
        },
        {
          title: 'Homework Reminders',
          icon: 'book',
          type: 'toggle',
          value: homeworkReminders,
          onValueChange: () => handleToggle('homeworkReminders', homeworkReminders, setHomeworkReminders),
          accessibilityLabel: 'Toggle homework reminders',
        },
        {
          title: 'Promotional Updates',
          icon: 'card-giftcard',
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
          icon: 'key',
          type: 'link',
          onPress: () => navigation.navigate('Auth', { screen: 'ForgotPassword' }),
          accessibilityLabel: 'Change password',
        },
        {
          title: 'Data Usage',
          icon: 'data-usage',
          type: 'toggle',
          value: dataUsage,
          onValueChange: () => handleToggle('dataUsage', dataUsage, setDataUsage),
          accessibilityLabel: 'Toggle data usage',
        },
        {
          title: 'Privacy Policy',
          icon: 'privacy-tip',
          type: 'link',
          onPress: () => navigation.navigate('PrivacyPolicy'),
          accessibilityLabel: 'View privacy policy',
        }
      ],
    },
    {
      title: 'Payment',
      items: [
        {
          title: 'Payment Methods',
          icon: 'credit-card',
          type: 'link',
          onPress: () => navigation.navigate('Payments'),
          accessibilityLabel: 'Manage payment methods',
        },
        {
          title: 'Transaction History',
          icon: 'receipt',
          type: 'link',
          onPress: () => navigation.navigate('TransactionHistory'),
          accessibilityLabel: 'View transaction history',
        }
      ],
    },
    {
      title: 'Support',
      items: [
        {
          title: 'Help Center',
          icon: 'help',
          type: 'link',
          onPress: () => navigation.navigate('Help'),
          accessibilityLabel: 'Visit help center',
        },
        {
          title: 'Contact Support',
          icon: 'support-agent',
          type: 'link',
          onPress: () => navigation.navigate('Support'),
          accessibilityLabel: 'Contact customer support',
        }
      ],
    },
    {
      title: 'Account',
      items: [
        {
          title: 'Logout',
          icon: 'logout',
          type: 'link',
          onPress: handleLogout,
          color: COLORS.error,
          accessibilityLabel: 'Logout from account',
        },
        {
          title: 'Delete Account',
          icon: 'delete',
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

  const SafeAreaComponent = Platform.OS === 'ios' ? SafeAreaViewRN : SafeAreaView;

  return (
    <SafeAreaComponent style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
        >
          <MaterialIcons name="arrow-back" size={24} color={COLORS.text} />
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
                  <MaterialIcons 
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
                {item.type === 'toggle' ? renderToggle(item) : (
                  <MaterialIcons 
                    name="chevron-right" 
                    size={24} 
                    color={item.color || COLORS.gray} 
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaComponent>
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
    marginBottom: SIZES.padding * 2,
  },
  sectionTitle: {
    ...FONTS.h4,
    color: COLORS.gray,
    marginHorizontal: SIZES.padding * 2,
    marginVertical: SIZES.padding,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    backgroundColor: COLORS.white,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: SIZES.padding,
  },
  settingTitle: {
    ...FONTS.body3,
    color: COLORS.text,
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});

export default Settings; 