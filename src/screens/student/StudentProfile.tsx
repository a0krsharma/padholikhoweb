import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES, IMAGES } from '../../constants';

const StudentProfile = ({ navigation }: any) => {
  // Mock student profile data
  const [profile, setProfile] = useState({
    id: '1',
    name: 'Arjun Sharma',
    email: 'arjun.sharma@gmail.com',
    phone: '+91 9876543210',
    profileImage: IMAGES.defaultAvatar,
    grade: '10th Standard',
    school: 'Delhi Public School, New Delhi',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'English', 'Computer Science'],
    achievements: [
      {
        id: '1',
        title: 'Mathematics Olympiad',
        description: 'Secured 2nd rank in National Mathematics Olympiad',
        date: 'Feb 2024',
      },
      {
        id: '2',
        title: 'Science Exhibition',
        description: 'Winner of school science exhibition',
        date: 'Jan 2024',
      },
    ],
    enrolledCourses: 4,
    completedCourses: 2,
    currentAverage: 85,
    attendanceRate: 92,
  });

  // Profile menu items
  const menuItems = [
    {
      id: '1',
      title: 'Academic Performance',
      icon: 'trophy-outline',
      screen: 'Progress',
    },
    {
      id: '2',
      title: 'Enrolled Courses',
      icon: 'book-outline',
      screen: 'EnrolledCourses',
    },
    {
      id: '3',
      title: 'Attendance Report',
      icon: 'calendar-outline',
      screen: 'Attendance',
    },
    {
      id: '4',
      title: 'Payment History',
      icon: 'card-outline',
      screen: 'PaymentHistory',
    },
    {
      id: '5',
      title: 'Help & Support',
      icon: 'help-circle-outline',
      screen: 'Help',
    },
    {
      id: '6',
      title: 'Settings',
      icon: 'settings-outline',
      screen: 'StudentSettings',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image source={profile.profileImage} style={styles.profileImage} />
            <TouchableOpacity style={styles.editProfileImageButton}>
              <Ionicons name="camera" size={18} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>{profile.name}</Text>
          <Text style={styles.profileEmail}>{profile.email}</Text>
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.enrolledCourses}</Text>
            <Text style={styles.statLabel}>Enrolled Courses</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.currentAverage}%</Text>
            <Text style={styles.statLabel}>Current Average</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.attendanceRate}%</Text>
            <Text style={styles.statLabel}>Attendance</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.infoItem}>
            <Ionicons name="school-outline" size={20} color={COLORS.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Grade</Text>
              <Text style={styles.infoValue}>{profile.grade}</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="business-outline" size={20} color={COLORS.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>School</Text>
              <Text style={styles.infoValue}>{profile.school}</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="call-outline" size={20} color={COLORS.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Contact</Text>
              <Text style={styles.infoValue}>{profile.phone}</Text>
            </View>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Subjects</Text>
          <View style={styles.subjectsContainer}>
            {profile.subjects.map((subject, index) => (
              <View key={index} style={styles.subjectTag}>
                <Text style={styles.subjectText}>{subject}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Achievements')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {profile.achievements.map(achievement => (
            <View key={achievement.id} style={styles.achievementItem}>
              <View style={styles.achievementBadge}>
                <Ionicons name="trophy" size={24} color={COLORS.gold} />
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>
                  {achievement.description}
                </Text>
                <Text style={styles.achievementDate}>{achievement.date}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.menuSection}>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon} size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.menuItemText}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Ionicons name="log-out-outline" size={20} color={COLORS.white} />
          <Text style={styles.logoutButtonText}>Log Out</Text>
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
  settingsButton: {
    padding: SIZES.padding,
  },
  scrollContainer: {
    paddingBottom: SIZES.padding * 3,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: SIZES.padding * 2,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: SIZES.padding,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editProfileImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    ...FONTS.h2,
    color: COLORS.text,
    marginBottom: SIZES.padding / 2,
  },
  profileEmail: {
    ...FONTS.body3,
    color: COLORS.gray,
    marginBottom: SIZES.padding,
  },
  editProfileButton: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: SIZES.radius,
  },
  editProfileButtonText: {
    ...FONTS.body3,
    color: COLORS.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SIZES.padding * 1.5,
    paddingHorizontal: SIZES.padding * 2,
    backgroundColor: COLORS.lightGray2,
    marginHorizontal: SIZES.padding * 2,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding * 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...FONTS.h3,
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    ...FONTS.body4,
    color: COLORS.gray,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: COLORS.border,
  },
  infoSection: {
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
    marginBottom: SIZES.padding,
  },
  seeAllText: {
    ...FONTS.body4,
    color: COLORS.primary,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoContent: {
    marginLeft: SIZES.padding,
    flex: 1,
  },
  infoLabel: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  infoValue: {
    ...FONTS.body3,
    color: COLORS.text,
  },
  subjectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  subjectTag: {
    backgroundColor: COLORS.lightPrimary,
    paddingVertical: SIZES.padding / 2,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.radius,
    marginRight: SIZES.padding,
    marginBottom: SIZES.padding,
  },
  subjectText: {
    ...FONTS.body4,
    color: COLORS.primary,
  },
  achievementItem: {
    flexDirection: 'row',
    marginBottom: SIZES.padding,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  achievementBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGold,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    ...FONTS.body3,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  achievementDescription: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginTop: 2,
  },
  achievementDate: {
    ...FONTS.body5,
    color: COLORS.lightGray,
    marginTop: 4,
  },
  menuSection: {
    paddingHorizontal: SIZES.padding * 2,
    marginBottom: SIZES.padding * 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.padding * 1.2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding,
  },
  menuItemText: {
    ...FONTS.body3,
    color: COLORS.text,
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    marginHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding * 1.2,
    borderRadius: SIZES.radius,
    marginTop: SIZES.padding,
  },
  logoutButtonText: {
    ...FONTS.body3,
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: SIZES.padding / 2,
  },
});

export default StudentProfile; 