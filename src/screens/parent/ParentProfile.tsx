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

const ParentProfile = ({ navigation }: any) => {
  // Mock parent profile data
  const [profile, setProfile] = useState({
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@gmail.com',
    phone: '+91 9845123678',
    profileImage: IMAGES.parentAvatar,
    address: '123, Park Street, New Delhi',
    children: [
      {
        id: '1',
        name: 'Arjun Kumar',
        age: 16,
        grade: '10th Standard',
        school: 'Delhi Public School',
        avatar: IMAGES.child1,
        subjects: ['Mathematics', 'Physics', 'Chemistry'],
        activeCourses: 3,
      },
      {
        id: '2',
        name: 'Neha Kumar',
        age: 14,
        grade: '8th Standard',
        school: 'Delhi Public School',
        avatar: IMAGES.child2,
        subjects: ['Science', 'English', 'Social Studies'],
        activeCourses: 2,
      },
    ],
    paymentMethods: 2,
    notifications: 5,
    pendingPayments: 1,
    upcomingMeetings: 2,
  });

  // Profile menu items
  const menuItems = [
    {
      id: '1',
      title: 'Manage Children',
      icon: 'people-outline',
      screen: 'ChildrenList',
    },
    {
      id: '2',
      title: 'Payment Methods',
      icon: 'card-outline',
      screen: 'Payments',
    },
    {
      id: '3',
      title: 'Upcoming Meetings',
      icon: 'calendar-outline',
      screen: 'Meetings',
    },
    {
      id: '4',
      title: 'Progress Reports',
      icon: 'analytics-outline',
      screen: 'ProgressReports',
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
      screen: 'Settings',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
          {profile.notifications > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>
                {profile.notifications}
              </Text>
            </View>
          )}
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
            <Text style={styles.statValue}>{profile.children.length}</Text>
            <Text style={styles.statLabel}>Children</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.paymentMethods}</Text>
            <Text style={styles.statLabel}>Payment Methods</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile.upcomingMeetings}</Text>
            <Text style={styles.statLabel}>Upcoming Meetings</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.infoItem}>
            <Ionicons name="call-outline" size={20} color={COLORS.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{profile.phone}</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={20} color={COLORS.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Address</Text>
              <Text style={styles.infoValue}>{profile.address}</Text>
            </View>
          </View>
        </View>

        <View style={styles.childrenSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Children</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ChildrenList')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {profile.children.map((child) => (
            <TouchableOpacity
              key={child.id}
              style={styles.childCard}
              onPress={() => navigation.navigate('ChildDetails', { childId: child.id })}
            >
              <Image source={child.avatar} style={styles.childAvatar} />
              <View style={styles.childInfo}>
                <Text style={styles.childName}>{child.name}</Text>
                <Text style={styles.childDetails}>{child.grade}, {child.age} years</Text>
                <Text style={styles.childSchool}>{child.school}</Text>
              </View>
              <View style={styles.childActions}>
                <View style={styles.coursesTag}>
                  <Text style={styles.coursesText}>{child.activeCourses} Courses</Text>
                </View>
                <TouchableOpacity 
                  style={styles.viewButton}
                  onPress={() => navigation.navigate('ChildProgress', { childId: child.id })}
                >
                  <Text style={styles.viewButtonText}>View Progress</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity
            style={styles.addChildButton}
            onPress={() => navigation.navigate('AddChild')}
          >
            <Ionicons name="add-circle-outline" size={20} color={COLORS.primary} />
            <Text style={styles.addChildButtonText}>Add Child</Text>
          </TouchableOpacity>
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
  notificationButton: {
    position: 'relative',
    padding: SIZES.padding,
  },
  notificationBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    ...FONTS.body5,
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
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
  childrenSection: {
    paddingHorizontal: SIZES.padding * 2,
    marginBottom: SIZES.padding * 2,
  },
  childCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  childAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: SIZES.padding,
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    ...FONTS.body3,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  childDetails: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginTop: 2,
  },
  childSchool: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginTop: 2,
  },
  childActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  coursesTag: {
    backgroundColor: COLORS.lightPrimary,
    paddingHorizontal: SIZES.padding / 2,
    paddingVertical: 2,
    borderRadius: SIZES.radius / 2,
    marginBottom: SIZES.padding / 2,
  },
  coursesText: {
    ...FONTS.body5,
    color: COLORS.primary,
  },
  viewButton: {
    paddingVertical: 4,
    paddingHorizontal: SIZES.padding / 2,
  },
  viewButtonText: {
    ...FONTS.body5,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  addChildButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.padding,
    marginTop: SIZES.padding / 2,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.primary,
    borderRadius: SIZES.radius,
  },
  addChildButtonText: {
    ...FONTS.body3,
    color: COLORS.primary,
    marginLeft: SIZES.padding / 2,
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

export default ParentProfile; 