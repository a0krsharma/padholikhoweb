import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../../constants';
import { PaymentService } from '../../services/payment';
import { LearningService } from '../../services/learning';
import { AuthService } from '../../services/auth';

const ParentDashboard = ({ navigation }: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const [wallet, setWallet] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [studentProgress, setStudentProgress] = useState<any[]>([]);
  const [upcomingClasses, setUpcomingClasses] = useState<any[]>([]);

  const loadData = async () => {
    try {
      const userId = AuthService.getCurrentUser()?.uid;
      if (!userId) return;

      // Load wallet
      const walletData = await PaymentService.getWallet(userId);
      setWallet(walletData);

      // Load transactions
      const { transactions: transactionData } = await PaymentService.getPaymentHistory(userId);
      setTransactions(transactionData);

      // Load student progress
      // This would be expanded to load progress for all children
      const progress = await LearningService.getStudentProgress(userId, 'current-session-id');
      setStudentProgress(progress.assessments);

      // Load upcoming classes
      // This would be expanded to load classes for all children
      const classes = await LearningService.getLiveClass('current-class-id');
      setUpcomingClasses(classes ? [classes] : []);
    } catch (error) {
      Alert.alert('Error', 'Failed to load dashboard data');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const menuItems = [
    {
      id: 'children',
      title: 'My Children',
      icon: 'people-outline',
      onPress: () => navigation.navigate('ChildrenList'),
    },
    {
      id: 'schedule',
      title: 'Class Schedule',
      icon: 'calendar-outline',
      onPress: () => navigation.navigate('Schedule'),
    },
    {
      id: 'progress',
      title: 'Progress Reports',
      icon: 'bar-chart-outline',
      onPress: () => navigation.navigate('ProgressReports'),
    },
    {
      id: 'payments',
      title: 'Payments',
      icon: 'card-outline',
      onPress: () => navigation.navigate('Payments'),
    },
    {
      id: 'teachers',
      title: 'Teachers',
      icon: 'school-outline',
      onPress: () => navigation.navigate('TeachersList'),
    },
    {
      id: 'meetings',
      title: 'Parent-Teacher Meetings',
      icon: 'videocam-outline',
      onPress: () => navigation.navigate('Meetings'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Parent Dashboard</Text>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        {/* Wallet Section */}
        <View style={styles.walletSection}>
          <Text style={styles.walletTitle}>Wallet Balance</Text>
          <Text style={styles.walletAmount}>
            ₹{wallet?.balance || 0}
          </Text>
          <View style={styles.walletActions}>
            <TouchableOpacity
              style={styles.walletButton}
              onPress={() => navigation.navigate('AddMoney')}
            >
              <Text style={styles.walletButtonText}>Add Money</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.walletButton}
              onPress={() => navigation.navigate('WithdrawMoney')}
            >
              <Text style={styles.walletButtonText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Classes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Classes</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Schedule')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {upcomingClasses.length > 0 ? (
            upcomingClasses.map((classItem) => (
              <TouchableOpacity
                key={classItem.id}
                style={styles.classCard}
                onPress={() => navigation.navigate('ClassDetails', { classId: classItem.id })}
              >
                <View style={styles.classInfo}>
                  <Text style={styles.classSubject}>{classItem.subject}</Text>
                  <Text style={styles.classTime}>
                    {new Date(classItem.startTime).toLocaleString()}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noDataText}>No upcoming classes</Text>
          )}
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {transactions.slice(0, 3).map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionTitle}>{transaction.description}</Text>
                <Text style={styles.transactionDate}>
                  {new Date(transaction.timestamp).toLocaleDateString()}
                </Text>
              </View>
              <Text
                style={[
                  styles.transactionAmount,
                  transaction.type === 'payment'
                    ? styles.paymentAmount
                    : styles.depositAmount,
                ]}
              >
                {transaction.type === 'payment' ? '-' : '+'}₹{transaction.amount}
              </Text>
            </View>
          ))}
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons name={item.icon} size={24} color={COLORS.primary} />
                <Text style={styles.menuItemTitle}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
            </TouchableOpacity>
          ))}
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
    padding: SIZES.padding * 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.text,
  },
  notificationButton: {
    padding: 8,
  },
  walletSection: {
    backgroundColor: COLORS.primary,
    padding: SIZES.padding * 2,
    margin: SIZES.padding * 2,
    borderRadius: SIZES.radius,
  },
  walletTitle: {
    ...FONTS.body3,
    color: COLORS.white,
    opacity: 0.8,
  },
  walletAmount: {
    ...FONTS.h1,
    color: COLORS.white,
    marginVertical: SIZES.padding,
  },
  walletActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  walletButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: SIZES.padding / 2,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.radius / 2,
    flex: 1,
    marginHorizontal: 5,
  },
  walletButtonText: {
    ...FONTS.body4,
    color: COLORS.white,
    textAlign: 'center',
  },
  section: {
    padding: SIZES.padding * 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.text,
  },
  seeAllText: {
    ...FONTS.body4,
    color: COLORS.primary,
  },
  classCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.input,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding,
  },
  classInfo: {
    flex: 1,
  },
  classSubject: {
    ...FONTS.body3,
    color: COLORS.text,
    marginBottom: 4,
  },
  classTime: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.input,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    ...FONTS.body3,
    color: COLORS.text,
    marginBottom: 4,
  },
  transactionDate: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  transactionAmount: {
    ...FONTS.h3,
    fontWeight: 'bold',
  },
  paymentAmount: {
    color: COLORS.error,
  },
  depositAmount: {
    color: COLORS.success,
  },
  menuSection: {
    padding: SIZES.padding * 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemTitle: {
    ...FONTS.body3,
    color: COLORS.text,
    marginLeft: SIZES.padding,
  },
  noDataText: {
    ...FONTS.body4,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: SIZES.padding,
  },
});

export default ParentDashboard; 