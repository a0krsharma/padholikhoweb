import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../../constants';

const Earnings = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data for earnings
  const [earnings, setEarnings] = useState({
    totalEarnings: 25600,
    currentMonth: 4200,
    lastMonth: 3800,
    pendingPayments: 1200,
    transactions: [
      {
        id: '1',
        student: 'Rahul Sharma',
        course: 'Mathematics - Advanced',
        amount: 1200,
        date: '15 Mar, 2024',
        status: 'Completed',
      },
      {
        id: '2',
        student: 'Priya Patel',
        course: 'Physics - Basics',
        amount: 800,
        date: '12 Mar, 2024',
        status: 'Completed',
      },
      {
        id: '3',
        student: 'Amit Kumar',
        course: 'Chemistry - Organic',
        amount: 1000,
        date: '10 Mar, 2024',
        status: 'Completed',
      },
      {
        id: '4',
        student: 'Sneha Singh',
        course: 'Biology - Human Anatomy',
        amount: 1200,
        date: '05 Mar, 2024',
        status: 'Pending',
      },
      {
        id: '5',
        student: 'Vikram Joshi',
        course: 'Mathematics - Calculus',
        amount: 1000,
        date: '28 Feb, 2024',
        status: 'Completed',
      },
    ],
  });

  // Format amount to currency
  const formatCurrency = (amount: number) => {
    return '₹' + amount.toLocaleString('en-IN');
  };

  const renderTransactionItem = ({ item }: any) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionStudent}>{item.student}</Text>
        <Text style={styles.transactionCourse}>{item.course}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <View style={styles.transactionAmountContainer}>
        <Text style={styles.transactionAmount}>{formatCurrency(item.amount)}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: item.status === 'Completed' ? COLORS.success : COLORS.warning }
        ]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Earnings</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('PaymentSettings')}
        >
          <Ionicons name="settings-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'overview' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('overview')}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'overview' && styles.activeTabButtonText,
            ]}
          >
            Overview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'transactions' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('transactions')}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'transactions' && styles.activeTabButtonText,
            ]}
          >
            Transactions
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'overview' ? (
        <ScrollView style={styles.overviewContainer}>
          <View style={styles.totalEarningsCard}>
            <Text style={styles.totalEarningsLabel}>Total Earnings</Text>
            <Text style={styles.totalEarningsValue}>
              {formatCurrency(earnings.totalEarnings)}
            </Text>
          </View>

          <View style={styles.earningsStatsContainer}>
            <View style={styles.earningsStatCard}>
              <Text style={styles.earningsStatLabel}>This Month</Text>
              <Text style={styles.earningsStatValue}>
                {formatCurrency(earnings.currentMonth)}
              </Text>
            </View>
            <View style={styles.earningsStatCard}>
              <Text style={styles.earningsStatLabel}>Last Month</Text>
              <Text style={styles.earningsStatValue}>
                {formatCurrency(earnings.lastMonth)}
              </Text>
            </View>
            <View style={styles.earningsStatCard}>
              <Text style={styles.earningsStatLabel}>Pending</Text>
              <Text style={styles.earningsStatValue}>
                {formatCurrency(earnings.pendingPayments)}
              </Text>
            </View>
          </View>

          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.withdrawButton}>
              <Ionicons name="cash-outline" size={18} color={COLORS.white} />
              <Text style={styles.withdrawButtonText}>Withdraw</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.historyButton}>
              <Ionicons name="document-text-outline" size={18} color={COLORS.primary} />
              <Text style={styles.historyButtonText}>History</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.recentTransactionsContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Transactions</Text>
              <TouchableOpacity onPress={() => setActiveTab('transactions')}>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            {earnings.transactions.slice(0, 3).map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionStudent}>{transaction.student}</Text>
                  <Text style={styles.transactionCourse}>{transaction.course}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
                <View style={styles.transactionAmountContainer}>
                  <Text style={styles.transactionAmount}>
                    {formatCurrency(transaction.amount)}
                  </Text>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: transaction.status === 'Completed' ? COLORS.success : COLORS.warning }
                  ]}>
                    <Text style={styles.statusText}>{transaction.status}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <FlatList
          data={earnings.transactions}
          renderItem={renderTransactionItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.transactionsList}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  settingsButton: {
    padding: SIZES.padding,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding * 2,
    marginTop: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tabButton: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    marginRight: SIZES.padding * 2,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabButtonText: {
    ...FONTS.body3,
    color: COLORS.gray,
  },
  activeTabButtonText: {
    ...FONTS.body3,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  overviewContainer: {
    flex: 1,
    paddingHorizontal: SIZES.padding * 2,
    paddingTop: SIZES.padding * 2,
  },
  totalEarningsCard: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 2,
    marginBottom: SIZES.padding * 2,
  },
  totalEarningsLabel: {
    ...FONTS.body3,
    color: COLORS.white,
    opacity: 0.8,
    marginBottom: SIZES.padding / 2,
  },
  totalEarningsValue: {
    ...FONTS.h1,
    color: COLORS.white,
  },
  earningsStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding * 2,
  },
  earningsStatCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginHorizontal: SIZES.padding / 2,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  earningsStatLabel: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginBottom: SIZES.padding / 2,
  },
  earningsStatValue: {
    ...FONTS.h4,
    color: COLORS.text,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding * 2,
  },
  withdrawButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    flex: 1,
    marginRight: SIZES.padding,
  },
  withdrawButtonText: {
    ...FONTS.body3,
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: SIZES.padding / 2,
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    flex: 1,
    marginLeft: SIZES.padding,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  historyButtonText: {
    ...FONTS.body3,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginLeft: SIZES.padding / 2,
  },
  recentTransactionsContainer: {
    marginBottom: SIZES.padding * 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  sectionTitle: {
    ...FONTS.h4,
    color: COLORS.text,
  },
  seeAllText: {
    ...FONTS.body4,
    color: COLORS.primary,
  },
  transactionsList: {
    padding: SIZES.padding * 2,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: SIZES.padding,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionStudent: {
    ...FONTS.body3,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  transactionCourse: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginTop: 2,
  },
  transactionDate: {
    ...FONTS.body5,
    color: COLORS.lightGray,
    marginTop: 2,
  },
  transactionAmountContainer: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    ...FONTS.h4,
    color: COLORS.text,
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 4,
    borderRadius: SIZES.radius / 2,
  },
  statusText: {
    ...FONTS.body5,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default Earnings; 