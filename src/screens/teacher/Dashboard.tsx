import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES, ICONS } from '../../constants';

const TeacherDashboard = ({ navigation }: any) => {
  // Mock data
  const [teacher, setTeacher] = useState({
    name: 'Dr. Rajesh Kumar',
    earnings: {
      thisMonth: 25000,
      pending: 5000,
    },
    metrics: {
      totalStudents: 48,
      activeClasses: 6,
      completedClasses: 128,
      rating: 4.8,
    },
  });

  const upcomingSessions = [
    {
      id: '1',
      subject: 'Physics',
      topic: 'Newton\'s Laws of Motion',
      time: '10:00 AM - 11:30 AM',
      date: 'Today',
      students: 12,
      isOnline: true,
    },
    {
      id: '2',
      subject: 'Mathematics',
      topic: 'Differential Calculus',
      time: '01:00 PM - 02:30 PM',
      date: 'Today',
      students: 15,
      isOnline: true,
    },
    {
      id: '3',
      subject: 'Chemistry',
      topic: 'Periodic Table',
      time: '09:30 AM - 11:00 AM',
      date: 'Tomorrow',
      students: 10,
      isOnline: false,
    },
  ];

  const renderMetricItem = (title: string, value: string | number, icon: string) => (
    <View style={styles.metricItem}>
      <View style={styles.metricIconContainer}>
        <Ionicons name={icon} size={24} color={COLORS.primary} />
      </View>
      <View>
        <Text style={styles.metricValue}>{value}</Text>
        <Text style={styles.metricTitle}>{title}</Text>
      </View>
    </View>
  );

  const renderSessionItem = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.sessionItem}
      onPress={() => navigation.navigate('SessionDetails', { sessionId: item.id })}
    >
      <View style={styles.sessionHeader}>
        <View style={[styles.subjectIndicator, { backgroundColor: getSubjectColor(item.subject) }]} />
        <Text style={styles.sessionSubject}>{item.subject}</Text>
        <View style={styles.sessionStatus}>
          <View style={[styles.statusDot, { backgroundColor: item.isOnline ? COLORS.success : COLORS.info }]} />
          <Text style={styles.statusText}>{item.isOnline ? 'Online' : 'In-Person'}</Text>
        </View>
      </View>
      
      <Text style={styles.sessionTopic}>{item.topic}</Text>
      
      <View style={styles.sessionDetails}>
        <View style={styles.sessionDetail}>
          <Ionicons name={ICONS.time} size={16} color={COLORS.gray} />
          <Text style={styles.sessionDetailText}>{item.time}</Text>
        </View>
        <View style={styles.sessionDetail}>
          <Ionicons name={ICONS.calendar} size={16} color={COLORS.gray} />
          <Text style={styles.sessionDetailText}>{item.date}</Text>
        </View>
        <View style={styles.sessionDetail}>
          <Ionicons name={ICONS.student} size={16} color={COLORS.gray} />
          <Text style={styles.sessionDetailText}>{item.students} Students</Text>
        </View>
      </View>
      
      <View style={styles.sessionActions}>
        <TouchableOpacity style={styles.sessionAction}>
          <Ionicons name={ICONS.document} size={20} color={COLORS.primary} />
          <Text style={styles.sessionActionText}>Materials</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.sessionAction, styles.joinButton]}
          onPress={() => navigation.navigate('Session', { sessionId: item.id })}
        >
          <Text style={styles.joinButtonText}>Start Session</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const getSubjectColor = (subject: string) => {
    const colors: {[key: string]: string} = {
      'Physics': '#FF6B6B',
      'Mathematics': '#4ECB71',
      'Chemistry': '#FDA085',
      'Biology': '#3E7BFA',
      'English': '#9B5DE5',
      'History': '#F15BB5',
    };
    return colors[subject] || COLORS.primary;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.teacherName}>{teacher.name}</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Ionicons name={ICONS.notifications} size={24} color={COLORS.text} />
            <View style={styles.badge} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('TeacherProfile')}
          >
            <Ionicons name={ICONS.profile} size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.earningsContainer}>
          <View style={styles.earningBox}>
            <Text style={styles.earningLabel}>This Month's Earnings</Text>
            <Text style={styles.earningValue}>₹{teacher.earnings.thisMonth.toLocaleString()}</Text>
          </View>
          <View style={styles.earningBox}>
            <Text style={styles.earningLabel}>Pending Payments</Text>
            <Text style={[styles.earningValue, { color: COLORS.warning }]}>
              ₹{teacher.earnings.pending.toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.metricsContainer}>
          <View style={styles.metricsRow}>
            {renderMetricItem('Total Students', teacher.metrics.totalStudents, ICONS.student)}
            {renderMetricItem('Active Classes', teacher.metrics.activeClasses, ICONS.book)}
          </View>
          <View style={styles.metricsRow}>
            {renderMetricItem('Completed', teacher.metrics.completedClasses, ICONS.checkmark)}
            {renderMetricItem('Rating', `${teacher.metrics.rating}/5`, ICONS.star)}
          </View>
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => navigation.navigate('CreateSession')}
            >
              <View style={styles.actionIcon}>
                <Ionicons name={ICONS.calendar} size={24} color={COLORS.primary} />
              </View>
              <Text style={styles.actionText}>Schedule Class</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => navigation.navigate('UploadMaterials')}
            >
              <View style={styles.actionIcon}>
                <Ionicons name={ICONS.document} size={24} color={COLORS.primary} />
              </View>
              <Text style={styles.actionText}>Add Materials</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => navigation.navigate('TeacherStudents')}
            >
              <View style={styles.actionIcon}>
                <Ionicons name={ICONS.student} size={24} color={COLORS.primary} />
              </View>
              <Text style={styles.actionText}>My Students</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionItem}
              onPress={() => navigation.navigate('Earnings')}
            >
              <View style={styles.actionIcon}>
                <Ionicons name={ICONS.wallet} size={24} color={COLORS.primary} />
              </View>
              <Text style={styles.actionText}>Earnings</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sessionsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Sessions</Text>
            <TouchableOpacity onPress={() => navigation.navigate('TeacherSchedule')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={upcomingSessions}
            renderItem={renderSessionItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.sessionsList}
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
  welcomeText: {
    ...FONTS.body3,
    color: COLORS.gray,
  },
  teacherName: {
    ...FONTS.h2,
    color: COLORS.text,
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: SIZES.padding,
    position: 'relative',
  },
  badge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.error,
    position: 'absolute',
    top: SIZES.padding,
    right: SIZES.padding,
  },
  earningsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding * 2,
    marginTop: SIZES.padding,
  },
  earningBox: {
    flex: 1,
    backgroundColor: COLORS.lightPrimary,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    marginHorizontal: SIZES.padding / 2,
  },
  earningLabel: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginBottom: SIZES.padding / 2,
  },
  earningValue: {
    ...FONTS.h3,
    color: COLORS.primary,
  },
  metricsContainer: {
    paddingHorizontal: SIZES.padding * 2,
    marginTop: SIZES.padding * 2,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    width: '48%',
  },
  metricIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding,
  },
  metricValue: {
    ...FONTS.h3,
    color: COLORS.text,
  },
  metricTitle: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  quickActions: {
    paddingHorizontal: SIZES.padding * 2,
    marginTop: SIZES.padding * 2,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionItem: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.lightPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  actionText: {
    ...FONTS.body4,
    color: COLORS.text,
  },
  sessionsContainer: {
    marginTop: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding * 2,
    paddingBottom: SIZES.padding * 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  seeAllText: {
    ...FONTS.body4,
    color: COLORS.primary,
  },
  sessionsList: {
    paddingBottom: SIZES.padding,
  },
  sessionItem: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    marginBottom: SIZES.padding,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  sessionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.padding / 2,
  },
  subjectIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SIZES.padding / 2,
  },
  sessionSubject: {
    ...FONTS.h4,
    flex: 1,
    color: COLORS.text,
  },
  sessionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  statusText: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  sessionTopic: {
    ...FONTS.body3,
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  sessionDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SIZES.padding,
  },
  sessionDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SIZES.padding,
    marginBottom: SIZES.padding / 2,
  },
  sessionDetailText: {
    ...FONTS.body5,
    color: COLORS.gray,
    marginLeft: 4,
  },
  sessionActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SIZES.padding,
  },
  sessionAction: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding / 2,
  },
  sessionActionText: {
    ...FONTS.body4,
    color: COLORS.primary,
    marginLeft: 4,
  },
  joinButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
  },
  joinButtonText: {
    ...FONTS.body4,
    color: COLORS.white,
  },
});

export default TeacherDashboard; 