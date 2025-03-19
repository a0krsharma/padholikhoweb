import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../../constants';
import { AuthService } from '../../services/auth';
import firestore from '@react-native-firebase/firestore';

interface SessionType {
  id: string;
  title: string;
  subject: string;
  date: Date;
  startTime: string;
  endTime: string;
  studentCount: number;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
}

interface StatsType {
  totalClasses: number;
  totalStudents: number;
  completedClasses: number;
  upcomingClasses: number;
  averageRating: number;
  totalEarnings: number;
  pendingPayments: number;
}

const TeacherDashboard = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState<StatsType>({
    totalClasses: 0,
    totalStudents: 0,
    completedClasses: 0,
    upcomingClasses: 0,
    averageRating: 0,
    totalEarnings: 0,
    pendingPayments: 0,
  });
  const [todaySessions, setTodaySessions] = useState<SessionType[]>([]);
  const [upcomingSessions, setUpcomingSessions] = useState<SessionType[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const userId = AuthService.getCurrentUser()?.uid;
      if (!userId) return;

      // In a real app, this would fetch data from Firestore
      // For now, we'll simulate this with mock data
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock stats
      const mockStats: StatsType = {
        totalClasses: 76,
        totalStudents: 45,
        completedClasses: 48,
        upcomingClasses: 28,
        averageRating: 4.8,
        totalEarnings: 32500,
        pendingPayments: 5000,
      };
      
      // Mock today's sessions
      const today = new Date();
      const mockTodaySessions: SessionType[] = [
        {
          id: '1',
          title: 'Mathematics - Class 8A',
          subject: 'Mathematics',
          date: today,
          startTime: '09:00 AM',
          endTime: '10:30 AM',
          studentCount: 18,
          status: 'completed',
        },
        {
          id: '2',
          title: 'Science - Class 10B',
          subject: 'Science',
          date: today,
          startTime: '11:00 AM',
          endTime: '12:30 PM',
          studentCount: 22,
          status: 'ongoing',
        },
        {
          id: '3',
          title: 'Physics - Class 11C',
          subject: 'Physics',
          date: today,
          startTime: '02:00 PM',
          endTime: '03:30 PM',
          studentCount: 15,
          status: 'scheduled',
        },
      ];
      
      // Mock upcoming sessions
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dayAfter = new Date(today);
      dayAfter.setDate(dayAfter.getDate() + 2);
      
      const mockUpcomingSessions: SessionType[] = [
        {
          id: '4',
          title: 'Mathematics - Class 9C',
          subject: 'Mathematics',
          date: tomorrow,
          startTime: '09:00 AM',
          endTime: '10:30 AM',
          studentCount: 20,
          status: 'scheduled',
        },
        {
          id: '5',
          title: 'Chemistry - Class 12A',
          subject: 'Chemistry',
          date: tomorrow,
          startTime: '11:30 AM',
          endTime: '01:00 PM',
          studentCount: 16,
          status: 'scheduled',
        },
        {
          id: '6',
          title: 'Science - Class 7B',
          subject: 'Science',
          date: dayAfter,
          startTime: '10:00 AM',
          endTime: '11:30 AM',
          studentCount: 25,
          status: 'scheduled',
        },
      ];
      
      setStats(mockStats);
      setTodaySessions(mockTodaySessions);
      setUpcomingSessions(mockUpcomingSessions);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' });
    }
  };

  const renderSessionItem = ({ item }: { item: SessionType }) => {
    const isUpcoming = item.status === 'scheduled';
    const isToday = item.date.toDateString() === new Date().toDateString();
    const showDate = !isToday;
    
    let statusColor = COLORS.success;
    if (item.status === 'scheduled') statusColor = COLORS.warning;
    else if (item.status === 'completed') statusColor = COLORS.gray;
    else if (item.status === 'cancelled') statusColor = COLORS.error;
    
    return (
      <TouchableOpacity 
        style={styles.sessionCard}
        onPress={() => navigation.navigate('SessionDetails', { sessionId: item.id })}
      >
        <View style={styles.sessionHeader}>
          <View style={styles.sessionTimeContainer}>
            <Text style={styles.sessionTime}>{item.startTime}</Text>
            <Text style={styles.sessionTimeDivider}>-</Text>
            <Text style={styles.sessionTime}>{item.endTime}</Text>
            {showDate && (
              <Text style={styles.sessionDate}>{formatDate(item.date)}</Text>
            )}
          </View>
          
          <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>
        
        <Text style={styles.sessionTitle}>{item.title}</Text>
        <Text style={styles.sessionSubject}>Subject: {item.subject}</Text>
        
        <View style={styles.sessionFooter}>
          <View style={styles.studentsContainer}>
            <Ionicons name="people-outline" size={16} color={COLORS.gray} />
            <Text style={styles.studentsText}>{item.studentCount} Students</Text>
          </View>
          
          {isUpcoming && (
            <TouchableOpacity 
              style={styles.viewButton}
              onPress={() => navigation.navigate('SessionDetails', { sessionId: item.id })}
            >
              <Text style={styles.viewButtonText}>View Details</Text>
            </TouchableOpacity>
          )}
          
          {item.status === 'ongoing' && (
            <TouchableOpacity 
              style={styles.joinButton}
              onPress={() => navigation.navigate('LiveClass', { sessionId: item.id })}
            >
              <Text style={styles.joinButtonText}>Join Now</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.name}>Mr. Amit Kumar</Text>
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      >
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statsCard, styles.classesCard]}>
            <View style={styles.statsIconContainer}>
              <Ionicons name="school-outline" size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.statsValue}>{stats.totalClasses}</Text>
            <Text style={styles.statsLabel}>Total Classes</Text>
          </View>
          
          <View style={[styles.statsCard, styles.studentsCard]}>
            <View style={styles.statsIconContainer}>
              <Ionicons name="people-outline" size={24} color="#6C5CE7" />
            </View>
            <Text style={styles.statsValue}>{stats.totalStudents}</Text>
            <Text style={styles.statsLabel}>Students</Text>
          </View>
          
          <View style={[styles.statsCard, styles.ratingCard]}>
            <View style={styles.statsIconContainer}>
              <Ionicons name="star-outline" size={24} color="#FDCB6E" />
            </View>
            <View style={styles.ratingContainer}>
              <Text style={styles.statsValue}>{stats.averageRating}</Text>
              <Ionicons name="star" size={16} color="#FDCB6E" />
            </View>
            <Text style={styles.statsLabel}>Rating</Text>
          </View>
          
          <View style={[styles.statsCard, styles.earningsCard]}>
            <View style={styles.statsIconContainer}>
              <Ionicons name="cash-outline" size={24} color="#00B894" />
            </View>
            <Text style={styles.statsValue}>₹{stats.totalEarnings}</Text>
            <Text style={styles.statsLabel}>Earnings</Text>
          </View>
        </View>

        {/* Today's Schedule */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Schedule</Text>
            <TouchableOpacity 
              style={styles.viewAllButton}
              onPress={() => navigation.navigate('Schedule')}
            >
              <Text style={styles.viewAllText}>View All</Text>
              <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          
          {todaySessions.length > 0 ? (
            <FlatList
              data={todaySessions}
              renderItem={renderSessionItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.sessionsContainer}
            />
          ) : (
            <View style={styles.emptySessionsContainer}>
              <Ionicons name="calendar-outline" size={40} color={COLORS.lightGray} />
              <Text style={styles.emptySessionsText}>No classes scheduled for today</Text>
            </View>
          )}
        </View>

        {/* Upcoming Classes */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Classes</Text>
            <TouchableOpacity 
              style={styles.viewAllButton}
              onPress={() => navigation.navigate('Schedule')}
            >
              <Text style={styles.viewAllText}>View All</Text>
              <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          
          {upcomingSessions.length > 0 ? (
            upcomingSessions.map(session => (
              <View key={session.id} style={styles.upcomingSessionCard}>
                <View style={styles.upcomingSessionLeft}>
                  <Text style={styles.upcomingSessionDate}>
                    {formatDate(session.date)}
                  </Text>
                  <Text style={styles.upcomingSessionTime}>
                    {session.startTime} - {session.endTime}
                  </Text>
                </View>
                
                <View style={styles.upcomingSessionRight}>
                  <Text style={styles.upcomingSessionTitle}>{session.title}</Text>
                  <Text style={styles.upcomingSessionSubject}>
                    {session.subject} • {session.studentCount} Students
                  </Text>
                </View>
                
                <TouchableOpacity 
                  style={styles.detailsButton}
                  onPress={() => navigation.navigate('SessionDetails', { sessionId: session.id })}
                >
                  <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.emptySessionsContainer}>
              <Ionicons name="calendar-outline" size={40} color={COLORS.lightGray} />
              <Text style={styles.emptySessionsText}>No upcoming classes scheduled</Text>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('Schedule')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: COLORS.primary + '20' }]}>
                <Ionicons name="calendar" size={24} color={COLORS.primary} />
              </View>
              <Text style={styles.quickActionText}>Schedule</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('Students')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#6C5CE7' + '20' }]}>
                <Ionicons name="people" size={24} color="#6C5CE7" />
              </View>
              <Text style={styles.quickActionText}>Students</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('Assignments')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#FDCB6E' + '20' }]}>
                <Ionicons name="document-text" size={24} color="#FDCB6E" />
              </View>
              <Text style={styles.quickActionText}>Assignments</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('Earnings')}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: '#00B894' + '20' }]}>
                <Ionicons name="cash" size={24} color="#00B894" />
              </View>
              <Text style={styles.quickActionText}>Earnings</Text>
            </TouchableOpacity>
          </View>
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
    paddingVertical: SIZES.padding,
  },
  greeting: {
    ...FONTS.body3,
    color: COLORS.gray,
  },
  name: {
    ...FONTS.h2,
    color: COLORS.text,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding * 2,
    marginBottom: SIZES.padding,
  },
  statsCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  classesCard: {
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  studentsCard: {
    borderLeftWidth: 3,
    borderLeftColor: '#6C5CE7',
  },
  ratingCard: {
    borderLeftWidth: 3,
    borderLeftColor: '#FDCB6E',
  },
  earningsCard: {
    borderLeftWidth: 3,
    borderLeftColor: '#00B894',
  },
  statsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    marginBottom: SIZES.padding / 2,
  },
  statsValue: {
    ...FONTS.h2,
    color: COLORS.text,
  },
  statsLabel: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionContainer: {
    paddingHorizontal: SIZES.padding * 2,
    marginBottom: SIZES.padding * 2,
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
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    ...FONTS.body4,
    color: COLORS.primary,
  },
  sessionsContainer: {
    paddingRight: SIZES.padding * 2,
  },
  sessionCard: {
    width: 280,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginRight: SIZES.padding,
    marginBottom: SIZES.padding / 2,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SIZES.padding / 2,
  },
  sessionTimeContainer: {
    alignItems: 'flex-start',
  },
  sessionTime: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  sessionTimeDivider: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  sessionDate: {
    ...FONTS.body5,
    color: COLORS.gray,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: SIZES.padding / 2,
    paddingVertical: 2,
    borderRadius: SIZES.radius / 2,
  },
  statusText: {
    ...FONTS.body5,
    fontWeight: 'bold',
  },
  sessionTitle: {
    ...FONTS.h4,
    color: COLORS.text,
    marginBottom: 4,
  },
  sessionSubject: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginBottom: SIZES.padding,
  },
  sessionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  studentsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studentsText: {
    ...FONTS.body5,
    color: COLORS.gray,
    marginLeft: 4,
  },
  viewButton: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius / 2,
  },
  viewButtonText: {
    ...FONTS.body5,
    color: COLORS.text,
  },
  joinButton: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius / 2,
  },
  joinButtonText: {
    ...FONTS.body5,
    color: COLORS.white,
  },
  emptySessionsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 2,
  },
  emptySessionsText: {
    ...FONTS.body3,
    color: COLORS.gray,
    marginTop: SIZES.padding,
    textAlign: 'center',
  },
  upcomingSessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  upcomingSessionLeft: {
    width: 100,
  },
  upcomingSessionDate: {
    ...FONTS.body4,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  upcomingSessionTime: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  upcomingSessionRight: {
    flex: 1,
    marginLeft: SIZES.padding,
  },
  upcomingSessionTitle: {
    ...FONTS.body3,
    color: COLORS.text,
    marginBottom: 2,
  },
  upcomingSessionSubject: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  detailsButton: {
    padding: SIZES.padding / 2,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.padding,
  },
  quickActionButton: {
    alignItems: 'center',
    width: '23%',
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding / 2,
  },
  quickActionText: {
    ...FONTS.body5,
    color: COLORS.text,
  },
});

export default TeacherDashboard; 