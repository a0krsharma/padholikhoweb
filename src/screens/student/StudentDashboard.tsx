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

const StudentDashboard = ({ navigation }: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [upcomingClasses, setUpcomingClasses] = useState<any[]>([]);
  const [pendingAssignments, setPendingAssignments] = useState<any[]>([]);
  const [recentProgress, setRecentProgress] = useState<any>(null);

  const loadData = async () => {
    try {
      const userId = AuthService.getCurrentUser()?.uid;
      if (!userId) return;

      // Load wallet balance
      const wallet = await PaymentService.getWallet(userId);
      setWalletBalance(wallet?.balance || 0);

      // Load upcoming classes
      const classes = await LearningService.getLiveClass('current-class-id');
      setUpcomingClasses(classes ? [classes] : []);

      // Load pending assignments
      // This would be expanded to load actual assignments
      setPendingAssignments([
        {
          id: '1',
          title: 'Math Assignment',
          subject: 'Mathematics',
          dueDate: new Date(Date.now() + 86400000), // Tomorrow
        },
        {
          id: '2',
          title: 'Physics Lab Report',
          subject: 'Physics',
          dueDate: new Date(Date.now() + 172800000), // Day after tomorrow
        },
      ]);

      // Load recent progress
      const progress = await LearningService.getStudentProgress(userId);
      setRecentProgress(progress);
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
      id: 'schedule',
      title: 'Class Schedule',
      icon: 'calendar-outline',
      onPress: () => navigation.navigate('Schedule'),
    },
    {
      id: 'assignments',
      title: 'Assignments',
      icon: 'document-text-outline',
      onPress: () => navigation.navigate('Assignments'),
    },
    {
      id: 'progress',
      title: 'My Progress',
      icon: 'trending-up-outline',
      onPress: () => navigation.navigate('Progress'),
    },
    {
      id: 'teachers',
      title: 'My Teachers',
      icon: 'people-outline',
      onPress: () => navigation.navigate('TeachersList'),
    },
    {
      id: 'resources',
      title: 'Learning Resources',
      icon: 'library-outline',
      onPress: () => navigation.navigate('Resources'),
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: 'settings-outline',
      onPress: () => navigation.navigate('StudentSettings'),
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
          <View>
            <Text style={styles.headerTitle}>Student Dashboard</Text>
            <Text style={styles.headerSubtitle}>Welcome back!</Text>
          </View>
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
          <Text style={styles.walletAmount}>₹{walletBalance}</Text>
          <View style={styles.walletActions}>
            <TouchableOpacity
              style={styles.walletButton}
              onPress={() => navigation.navigate('AddMoney')}
            >
              <Text style={styles.walletButtonText}>Add Money</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.walletButton}
              onPress={() => navigation.navigate('TransactionHistory')}
            >
              <Text style={styles.walletButtonText}>History</Text>
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

        {/* Pending Assignments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pending Assignments</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Assignments')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {pendingAssignments.map((assignment) => (
            <TouchableOpacity
              key={assignment.id}
              style={styles.assignmentCard}
              onPress={() => navigation.navigate('AssignmentDetails', { assignmentId: assignment.id })}
            >
              <View style={styles.assignmentInfo}>
                <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                <Text style={styles.assignmentSubject}>{assignment.subject}</Text>
                <Text style={styles.assignmentDue}>
                  Due: {assignment.dueDate.toLocaleDateString()}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Progress */}
        {recentProgress && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Progress</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Progress')}>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.progressCard}>
              <View style={styles.progressItem}>
                <Text style={styles.progressLabel}>Assignments Completed</Text>
                <Text style={styles.progressValue}>
                  {recentProgress.assignmentsCompleted}/{recentProgress.totalAssignments}
                </Text>
              </View>
              <View style={styles.progressItem}>
                <Text style={styles.progressLabel}>Average Score</Text>
                <Text style={styles.progressValue}>{recentProgress.averageScore}%</Text>
              </View>
              <View style={styles.progressItem}>
                <Text style={styles.progressLabel}>Classes Attended</Text>
                <Text style={styles.progressValue}>
                  {recentProgress.classesAttended}/{recentProgress.totalClasses}
                </Text>
              </View>
            </View>
          </View>
        )}

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
  headerSubtitle: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginTop: 4,
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
  assignmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.input,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding,
  },
  assignmentInfo: {
    flex: 1,
  },
  assignmentTitle: {
    ...FONTS.body3,
    color: COLORS.text,
    marginBottom: 4,
  },
  assignmentSubject: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginBottom: 4,
  },
  assignmentDue: {
    ...FONTS.body4,
    color: COLORS.warning,
  },
  progressCard: {
    backgroundColor: COLORS.input,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
  },
  progressItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.padding / 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  progressLabel: {
    ...FONTS.body3,
    color: COLORS.text,
  },
  progressValue: {
    ...FONTS.body3,
    color: COLORS.primary,
    fontWeight: 'bold',
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

export default StudentDashboard; 