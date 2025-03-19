import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  SafeAreaView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants';

const Notifications = ({ navigation }: any) => {
  const notifications = [
    {
      id: '1',
      title: 'Session Reminder',
      message: 'Your Mathematics session with Sarah Johnson starts in 1 hour.',
      time: '10:00 AM',
      date: 'Today',
      type: 'reminder',
      read: false,
    },
    {
      id: '2',
      title: 'Payment Successful',
      message: 'Your payment for Physics session with Michael Chen was successful.',
      time: '9:30 AM',
      date: 'Today',
      type: 'payment',
      read: false,
    },
    {
      id: '3',
      title: 'New Message',
      message: 'You received a new message from Emma Wilson.',
      time: '8:45 AM',
      date: 'Today',
      type: 'message',
      read: true,
    },
    {
      id: '4',
      title: 'Session Booked',
      message: 'Your Chemistry session with Emma Wilson has been confirmed.',
      time: '5:20 PM',
      date: 'Yesterday',
      type: 'booking',
      read: true,
    },
    {
      id: '5',
      title: 'Special Offer',
      message: 'Get 20% off on your next 5 session bookings. Limited time offer!',
      time: '3:00 PM',
      date: 'Yesterday',
      type: 'offer',
      read: true,
    },
  ];

  const getIconName = (type: string) => {
    switch (type) {
      case 'reminder':
        return 'alarm-outline';
      case 'payment':
        return 'card-outline';
      case 'message':
        return 'chatbubble-outline';
      case 'booking':
        return 'calendar-outline';
      case 'offer':
        return 'gift-outline';
      default:
        return 'notifications-outline';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'reminder':
        return COLORS.blue;
      case 'payment':
        return COLORS.green;
      case 'message':
        return COLORS.secondary;
      case 'booking':
        return COLORS.primary;
      case 'offer':
        return COLORS.yellow;
      default:
        return COLORS.primary;
    }
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity 
      style={[
        styles.notificationItem,
        !item.read && styles.unreadNotification
      ]}
    >
      <View style={[
        styles.iconContainer,
        { backgroundColor: getIconColor(item.type) + '20' } // add transparency
      ]}>
        <Ionicons 
          name={getIconName(item.type)} 
          size={24} 
          color={getIconColor(item.type)} 
        />
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.notificationsList}
        showsVerticalScrollIndicator={false}
      />
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
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    ...FONTS.h3,
    color: COLORS.text,
  },
  settingsButton: {
    padding: SIZES.padding / 2,
  },
  notificationsList: {
    padding: SIZES.padding,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
    marginBottom: SIZES.padding,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  unreadNotification: {
    backgroundColor: COLORS.light,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    ...FONTS.body3,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  notificationTime: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  notificationMessage: {
    ...FONTS.body4,
    color: COLORS.text,
    marginBottom: 4,
  },
  notificationDate: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
});

export default Notifications; 