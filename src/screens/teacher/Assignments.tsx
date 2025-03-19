import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../../constants';

const Assignments = ({ navigation }: any) => {
  // Mock data for assignments
  const [assignments, setAssignments] = useState([
    {
      id: '1',
      title: 'Mathematics Quiz',
      class: '10th Standard',
      dueDate: '22 March, 2024',
      status: 'Pending',
      submissions: 12,
      totalStudents: 25,
    },
    {
      id: '2',
      title: 'Science Lab Report',
      class: '9th Standard',
      dueDate: '24 March, 2024',
      status: 'Pending',
      submissions: 8,
      totalStudents: 18,
    },
    {
      id: '3',
      title: 'Physics Problem Set',
      class: '11th Standard',
      dueDate: '20 March, 2024',
      status: 'Completed',
      submissions: 15,
      totalStudents: 15,
    },
    {
      id: '4',
      title: 'English Essay',
      class: '8th Standard',
      dueDate: '25 March, 2024',
      status: 'Pending',
      submissions: 5,
      totalStudents: 20,
    },
  ]);

  const renderAssignmentItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.assignmentCard}
      onPress={() => navigation.navigate('AssignmentDetails', { assignmentId: item.id })}
    >
      <View style={styles.assignmentHeader}>
        <Text style={styles.assignmentTitle}>{item.title}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: item.status === 'Completed' ? COLORS.success : COLORS.primary }
        ]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.assignmentDetails}>
        <Text style={styles.assignmentClass}>Class: {item.class}</Text>
        <View style={styles.dueDateContainer}>
          <Ionicons name="calendar-outline" size={16} color={COLORS.gray} />
          <Text style={styles.dueDate}>Due: {item.dueDate}</Text>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Submissions: {item.submissions}/{item.totalStudents}
        </Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${(item.submissions / item.totalStudents) * 100}%` }
            ]} 
          />
        </View>
      </View>
    </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Assignments</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateAssignment')}
        >
          <Ionicons name="add" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={assignments}
        renderItem={renderAssignmentItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.assignmentsList}
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
  backButton: {
    padding: SIZES.padding,
  },
  addButton: {
    padding: SIZES.padding,
  },
  assignmentsList: {
    padding: SIZES.padding * 2,
  },
  assignmentCard: {
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
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  assignmentTitle: {
    ...FONTS.h4,
    color: COLORS.text,
    flex: 1,
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
  assignmentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding,
  },
  assignmentClass: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueDate: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginLeft: 4,
  },
  progressContainer: {
    marginTop: SIZES.padding / 2,
  },
  progressText: {
    ...FONTS.body4,
    color: COLORS.text,
    marginBottom: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.lightGray,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
});

export default Assignments; 