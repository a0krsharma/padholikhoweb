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

const Session = ({ navigation, route }: any) => {
  // Add a default session object in case route.params is undefined
  const { session = {
    id: '1',
    subject: 'Mathematics',
    teacher: 'Sarah Johnson',
    date: 'Today, 2:00 PM',
    status: 'Upcoming'
  }} = route?.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Session Details</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.sessionHeader}>
          <View style={styles.subjectIcon}>
            <Ionicons 
              name={session.subject === 'Mathematics' ? 'calculator' : 
                   session.subject === 'Physics' ? 'flask' : 
                   session.subject === 'Chemistry' ? 'beaker' : 'book'} 
              size={40} 
              color={COLORS.white} 
            />
          </View>
          <Text style={styles.sessionSubject}>{session.subject}</Text>
          <Text style={styles.sessionTeacher}>with {session.teacher}</Text>
          
          <View style={[
            styles.statusBadge,
            { backgroundColor: session.status === 'Upcoming' ? COLORS.primary : COLORS.secondary }
          ]}>
            <Text style={styles.statusText}>{session.status}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date & Time</Text>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={24} color={COLORS.primary} />
            <Text style={styles.infoText}>{session.date}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={24} color={COLORS.primary} />
            <Text style={styles.infoText}>60 minutes</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meeting Link</Text>
          <View style={styles.linkContainer}>
            <Ionicons name="videocam-outline" size={24} color={COLORS.primary} />
            <Text style={styles.linkText}>https://meet.padholikho.app/session123</Text>
          </View>
          <TouchableOpacity style={styles.copyButton}>
            <Text style={styles.copyButtonText}>Copy Link</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Session Notes</Text>
          <Text style={styles.notesText}>
            This session will cover advanced concepts in {session.subject}. Please come prepared with 
            questions from chapters 5-7 of the textbook. The teacher will be focusing on problem-solving 
            techniques and exam preparation strategies.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.rescheduleButton]}
            onPress={() => navigation.navigate('Main')}
          >
            <Ionicons name="calendar" size={20} color={COLORS.primary} />
            <Text style={styles.rescheduleButtonText}>Reschedule</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.joinButton]}
            onPress={() => navigation.navigate('Main')}
          >
            <Ionicons name="videocam" size={20} color={COLORS.white} />
            <Text style={styles.joinButtonText}>Join Session</Text>
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
  sessionHeader: {
    alignItems: 'center',
    padding: SIZES.padding * 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  subjectIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  sessionSubject: {
    ...FONTS.h2,
    color: COLORS.text,
    marginBottom: SIZES.padding / 2,
  },
  sessionTeacher: {
    ...FONTS.body3,
    color: COLORS.gray,
    marginBottom: SIZES.padding,
  },
  statusBadge: {
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding / 2,
    borderRadius: SIZES.radius / 2,
  },
  statusText: {
    ...FONTS.body4,
    color: COLORS.white,
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  infoText: {
    ...FONTS.body3,
    color: COLORS.text,
    marginLeft: SIZES.padding,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.input,
    padding: SIZES.padding,
    borderRadius: SIZES.radius / 2,
    marginBottom: SIZES.padding,
  },
  linkText: {
    ...FONTS.body4,
    color: COLORS.text,
    marginLeft: SIZES.padding,
    flex: 1,
  },
  copyButton: {
    alignSelf: 'flex-end',
  },
  copyButtonText: {
    ...FONTS.body4,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  notesText: {
    ...FONTS.body3,
    color: COLORS.text,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: SIZES.padding * 2,
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: SIZES.radius / 2,
    paddingHorizontal: SIZES.padding * 2,
  },
  rescheduleButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  rescheduleButtonText: {
    ...FONTS.body3,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginLeft: SIZES.padding / 2,
  },
  joinButton: {
    backgroundColor: COLORS.primary,
  },
  joinButtonText: {
    ...FONTS.body3,
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: SIZES.padding / 2,
  },
});

export default Session; 