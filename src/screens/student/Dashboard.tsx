import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES, ICONS } from '../../constants';

interface UpcomingClass {
  id: string;
  subject: string;
  teacher: string;
  time: string;
  duration: string;
  isOnline: boolean;
}

interface RecentActivity {
  id: string;
  type: 'class' | 'assignment' | 'quiz';
  title: string;
  subject: string;
  date: string;
  status: 'completed' | 'pending';
}

interface ProgressItem {
  subject: string;
  progress: number;
  totalClasses: number;
  completedClasses: number;
}

const StudentDashboard = ({ navigation }: any) => {
  const [upcomingClasses, setUpcomingClasses] = useState<UpcomingClass[]>([]);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [progress, setProgress] = useState<ProgressItem[]>([]);

  useEffect(() => {
    // In a real app, this would fetch data from an API
    loadMockData();
  }, []);

  const loadMockData = () => {
    // Mock upcoming classes
    setUpcomingClasses([
      {
        id: '1',
        subject: 'Mathematics',
        teacher: 'Dr. Sharma',
        time: '10:00 AM',
        duration: '1 hour',
        isOnline: true,
      },
      {
        id: '2',
        subject: 'Science',
        teacher: 'Prof. Patel',
        time: '2:00 PM',
        duration: '1.5 hours',
        isOnline: true,
      },
    ]);

    // Mock recent activities
    setRecentActivities([
      {
        id: '1',
        type: 'class',
        title: 'Algebra Basics',
        subject: 'Mathematics',
        date: 'Today',
        status: 'completed',
      },
      {
        id: '2',
        type: 'assignment',
        title: 'Physics Lab Report',
        subject: 'Science',
        date: 'Yesterday',
        status: 'pending',
      },
      {
        id: '3',
        type: 'quiz',
        title: 'Chemistry Quiz',
        subject: 'Science',
        date: '2 days ago',
        status: 'completed',
      },
    ]);

    // Mock progress data
    setProgress([
      {
        subject: 'Mathematics',
        progress: 75,
        totalClasses: 20,
        completedClasses: 15,
      },
      {
        subject: 'Science',
        progress: 60,
        totalClasses: 15,
        completedClasses: 9,
      },
      {
        subject: 'English',
        progress: 90,
        totalClasses: 10,
        completedClasses: 9,
      },
    ]);
  };

  const renderUpcomingClass = ({ item }: { item: UpcomingClass }) => (
    <TouchableOpacity 
      style={styles.classCard}
      onPress={() => navigation.navigate('ClassDetails', { classId: item.id })}
    >
      <View style={styles.classHeader}>
        <View style={styles.subjectContainer}>
          <View style={[styles.subjectIcon, { backgroundColor: getSubjectColor(item.subject) }]}>
            <Ionicons name={getSubjectIcon(item.subject)} size={20} color={COLORS.white} />
          </View>
          <View>
            <Text style={styles.subjectText}>{item.subject}</Text>
            <Text style={styles.teacherText}>{item.teacher}</Text>
          </View>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{item.time}</Text>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
      </View>
      
      <View style={styles.classFooter}>
        <View style={styles.onlineIndicator}>
          <View style={[styles.indicatorDot, { backgroundColor: item.isOnline ? COLORS.success : COLORS.error }]} />
          <Text style={styles.onlineText}>{item.isOnline ? 'Online' : 'Offline'}</Text>
        </View>
        <TouchableOpacity 
          style={styles.joinButton}
          onPress={() => navigation.navigate('LiveClass', { classId: item.id })}
        >
          <Text style={styles.joinButtonText}>Join Class</Text>
          <Ionicons name={ICONS.video} size={16} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderActivity = ({ item }: { item: RecentActivity }) => (
    <TouchableOpacity 
      style={styles.activityCard}
      onPress={() => navigation.navigate('ActivityDetails', { activityId: item.id })}
    >
      <View style={styles.activityIcon}>
        <Ionicons 
          name={item.type === 'class' ? ICONS.video : item.type === 'assignment' ? ICONS.document : ICONS.quiz} 
          size={24} 
          color={COLORS.primary} 
        />
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityTitle}>{item.title}</Text>
        <Text style={styles.activitySubject}>{item.subject}</Text>
        <View style={styles.activityFooter}>
          <Text style={styles.activityDate}>{item.date}</Text>
          <View style={[
            styles.statusBadge,
            { backgroundColor: item.status === 'completed' ? COLORS.success : COLORS.warning }
          ]}>
            <Text style={styles.statusText}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderProgress = ({ item }: { item: ProgressItem }) => (
    <View style={styles.progressCard}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressSubject}>{item.subject}</Text>
        <Text style={styles.progressPercentage}>{item.progress}%</Text>
      </View>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill,
            { width: `${item.progress}%` }
          ]} 
        />
      </View>
      <View style={styles.progressFooter}>
        <Text style={styles.progressText}>
          {item.completedClasses} of {item.totalClasses} classes completed
        </Text>
      </View>
    </View>
  );

  const getSubjectColor = (subject: string) => {
    const colors: {[key: string]: string} = {
      'Mathematics': '#4ECB71',
      'Science': '#FDA085',
      'English': '#9B5DE5',
    };
    return colors[subject] || COLORS.primary;
  };

  const getSubjectIcon = (subject: string) => {
    const icons: {[key: string]: string} = {
      'Mathematics': ICONS.calculator,
      'Science': ICONS.flask,
      'English': ICONS.book,
    };
    return icons[subject] || ICONS.school;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Student!</Text>
            <Text style={styles.subtitle}>Welcome back to your learning journey</Text>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Ionicons name={ICONS.person} size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Classes</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Schedule')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={upcomingClasses}
            renderItem={renderUpcomingClass}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.classesList}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activities</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Activities')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recentActivities}
            renderItem={renderActivity}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.activitiesList}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Learning Progress</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Progress')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={progress}
            renderItem={renderProgress}
            keyExtractor={(item) => item.subject}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.progressList}
          />
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
    paddingTop: SIZES.padding * 2,
    paddingBottom: SIZES.padding,
  },
  greeting: {
    ...FONTS.h2,
    color: COLORS.text,
  },
  subtitle: {
    ...FONTS.body3,
    color: COLORS.gray,
    marginTop: 4,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    paddingHorizontal: SIZES.padding * 2,
    marginTop: SIZES.padding * 2,
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
  classesList: {
    paddingRight: SIZES.padding,
  },
  classCard: {
    width: 300,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginRight: SIZES.padding,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SIZES.padding,
  },
  subjectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subjectIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding,
  },
  subjectText: {
    ...FONTS.h4,
    color: COLORS.text,
  },
  teacherText: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginTop: 2,
  },
  timeContainer: {
    alignItems: 'flex-end',
  },
  timeText: {
    ...FONTS.h4,
    color: COLORS.text,
  },
  durationText: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginTop: 2,
  },
  classFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SIZES.padding,
  },
  onlineIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  onlineText: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  joinButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
    alignItems: 'center',
  },
  joinButtonText: {
    ...FONTS.body4,
    color: COLORS.white,
    marginRight: 4,
  },
  activitiesList: {
    paddingBottom: SIZES.padding,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.lightPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    ...FONTS.h4,
    color: COLORS.text,
  },
  activitySubject: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginTop: 2,
  },
  activityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SIZES.padding / 2,
  },
  activityDate: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  statusBadge: {
    paddingHorizontal: SIZES.padding / 2,
    paddingVertical: 2,
    borderRadius: SIZES.radius / 2,
  },
  statusText: {
    ...FONTS.caption,
    color: COLORS.white,
  },
  progressList: {
    paddingBottom: SIZES.padding,
  },
  progressCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding / 2,
  },
  progressSubject: {
    ...FONTS.h4,
    color: COLORS.text,
  },
  progressPercentage: {
    ...FONTS.h4,
    color: COLORS.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  progressFooter: {
    marginTop: SIZES.padding / 2,
  },
  progressText: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
});

export default StudentDashboard; 