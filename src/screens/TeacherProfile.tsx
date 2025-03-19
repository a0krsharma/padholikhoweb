import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants';

const TeacherProfile = ({ navigation, route }: any) => {
  const { teacher } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Teacher Profile</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Ionicons name="person-circle" size={100} color={COLORS.primary} />
          </View>
          <Text style={styles.teacherName}>{teacher.name}</Text>
          <Text style={styles.teacherSubject}>{teacher.subject}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={20} color={COLORS.yellow} />
            <Text style={styles.rating}>{teacher.rating}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.sectionContent}>
            {teacher.name} is an experienced {teacher.subject} teacher with several years of teaching experience. 
            They specialize in making complex concepts easy to understand and providing personalized learning 
            experiences for students of all levels.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          <View style={styles.experienceItem}>
            <Text style={styles.experienceTitle}>Senior Teacher</Text>
            <Text style={styles.experienceSubtitle}>Padho Likho Academy</Text>
            <Text style={styles.experienceYears}>2019 - Present</Text>
          </View>
          <View style={styles.experienceItem}>
            <Text style={styles.experienceTitle}>Junior Teacher</Text>
            <Text style={styles.experienceSubtitle}>City High School</Text>
            <Text style={styles.experienceYears}>2015 - 2019</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          <View style={styles.educationItem}>
            <Text style={styles.educationDegree}>Masters in {teacher.subject}</Text>
            <Text style={styles.educationSchool}>National University</Text>
            <Text style={styles.educationYear}>2013 - 2015</Text>
          </View>
          <View style={styles.educationItem}>
            <Text style={styles.educationDegree}>Bachelor in Education</Text>
            <Text style={styles.educationSchool}>State University</Text>
            <Text style={styles.educationYear}>2009 - 2013</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.chatButton}
            onPress={() => navigation.navigate('Chat', { teacher })}
          >
            <Ionicons name="chatbubble-outline" size={20} color={COLORS.white} />
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.bookButton}
            onPress={() => navigation.navigate('BookSession', { teacher })}
          >
            <Ionicons name="calendar-outline" size={20} color={COLORS.white} />
            <Text style={styles.buttonText}>Book a Session</Text>
          </TouchableOpacity>
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
  profileHeader: {
    alignItems: 'center',
    padding: SIZES.padding * 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  profileImageContainer: {
    marginBottom: SIZES.padding,
  },
  teacherName: {
    ...FONTS.h2,
    color: COLORS.text,
    marginBottom: SIZES.padding / 2,
  },
  teacherSubject: {
    ...FONTS.body3,
    color: COLORS.gray,
    marginBottom: SIZES.padding / 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    ...FONTS.body3,
    color: COLORS.text,
    marginLeft: SIZES.padding / 2,
    fontWeight: 'bold',
  },
  section: {
    padding: SIZES.padding * 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  sectionContent: {
    ...FONTS.body3,
    color: COLORS.text,
    lineHeight: 22,
  },
  experienceItem: {
    marginBottom: SIZES.padding,
  },
  experienceTitle: {
    ...FONTS.h4,
    color: COLORS.text,
  },
  experienceSubtitle: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  experienceYears: {
    ...FONTS.body4,
    color: COLORS.primary,
  },
  educationItem: {
    marginBottom: SIZES.padding,
  },
  educationDegree: {
    ...FONTS.h4,
    color: COLORS.text,
  },
  educationSchool: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  educationYear: {
    ...FONTS.body4,
    color: COLORS.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: SIZES.padding * 2,
  },
  chatButton: {
    backgroundColor: COLORS.secondary,
    flex: 1,
    height: 50,
    borderRadius: SIZES.radius / 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: SIZES.padding,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    flex: 1,
    height: 50,
    borderRadius: SIZES.radius / 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    ...FONTS.body3,
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: SIZES.padding / 2,
  },
});

export default TeacherProfile; 