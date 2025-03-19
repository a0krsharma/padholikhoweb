import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants';

const StudentsList = ({ navigation }: any) => {
  // Mock data for students
  const [students, setStudents] = useState([
    {
      id: '1',
      name: 'Rahul Kumar',
      class: '10th Standard',
      subject: 'Mathematics',
      lastSession: '2 days ago',
    },
    {
      id: '2',
      name: 'Priya Sharma',
      class: '9th Standard',
      subject: 'Science',
      lastSession: '1 week ago',
    },
    {
      id: '3',
      name: 'Amit Singh',
      class: '11th Standard',
      subject: 'Physics',
      lastSession: 'Yesterday',
    },
    {
      id: '4',
      name: 'Neha Patel',
      class: '8th Standard',
      subject: 'English',
      lastSession: '3 days ago',
    },
  ]);

  const renderStudentItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.studentCard}
      onPress={() => navigation.navigate('StudentDetails', { studentId: item.id })}
    >
      <View style={styles.studentImagePlaceholder}>
        <Text style={styles.studentInitials}>
          {item.name.split(' ').map((n: string) => n[0]).join('')}
        </Text>
      </View>
      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>{item.name}</Text>
        <Text style={styles.studentClass}>{item.class}</Text>
        <Text style={styles.studentSubject}>{item.subject}</Text>
      </View>
      <View>
        <Text style={styles.lastSession}>Last session</Text>
        <Text style={styles.lastSessionDate}>{item.lastSession}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Students</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={students}
        renderItem={renderStudentItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.studentsList}
        showsVerticalScrollIndicator={false}
      />
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
  filterButton: {
    padding: SIZES.padding,
  },
  studentsList: {
    padding: SIZES.padding * 2,
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    marginBottom: SIZES.padding * 1.5,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  studentImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding * 1.5,
  },
  studentInitials: {
    ...FONTS.h3,
    color: COLORS.white,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    ...FONTS.h4,
    color: COLORS.text,
    marginBottom: 4,
  },
  studentClass: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginBottom: 2,
  },
  studentSubject: {
    ...FONTS.body4,
    color: COLORS.primary,
  },
  lastSession: {
    ...FONTS.body5,
    color: COLORS.gray,
    textAlign: 'right',
  },
  lastSessionDate: {
    ...FONTS.body4,
    color: COLORS.text,
    textAlign: 'right',
  },
});

export default StudentsList; 