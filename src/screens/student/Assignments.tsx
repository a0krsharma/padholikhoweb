import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../../constants';

const Assignments = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for assignments
  const [assignments, setAssignments] = useState([
    {
      id: '1',
      title: 'Mathematics Homework',
      subject: 'Mathematics',
      teacher: 'Dr. Priya Sharma',
      dueDate: 'Today, 11:59 PM',
      description: 'Complete problems 1-10 from Chapter 5',
      status: 'pending',
      attachments: 2,
      grade: null,
    },
    {
      id: '2',
      title: 'Physics Lab Report',
      subject: 'Physics',
      teacher: 'Prof. Rahul Verma',
      dueDate: 'Tomorrow, 3:00 PM',
      description: 'Write a lab report on the pendulum experiment',
      status: 'pending',
      attachments: 1,
      grade: null,
    },
    {
      id: '3',
      title: 'Chemistry Quiz',
      subject: 'Chemistry',
      teacher: 'Dr. Meena Gupta',
      dueDate: 'Mar 25, 11:59 PM',
      description: 'Online quiz on organic chemistry',
      status: 'pending',
      attachments: 0,
      grade: null,
    },
    {
      id: '4',
      title: 'English Essay',
      subject: 'English',
      teacher: 'Mrs. Anjali Singh',
      dueDate: 'Mar 15, 11:59 PM',
      description: 'Write a 500-word essay on the given topic',
      status: 'completed',
      attachments: 1,
      grade: 'A',
    },
    {
      id: '5',
      title: 'Computer Science Project',
      subject: 'Computer Science',
      teacher: 'Prof. Amit Patel',
      dueDate: 'Mar 10, 11:59 PM',
      description: 'Create a simple calculator application',
      status: 'completed',
      attachments: 3,
      grade: 'A+',
    },
    {
      id: '6',
      title: 'Biology Diagram',
      subject: 'Biology',
      teacher: 'Dr. Suresh Kumar',
      dueDate: 'Mar 5, 11:59 PM',
      description: 'Draw and label the diagram of a plant cell',
      status: 'completed',
      attachments: 1,
      grade: 'B+',
    },
  ]);
  
  // Filter assignments based on active tab and search query
  const filteredAssignments = assignments.filter(assignment => {
    const matchesTab = assignment.status === activeTab;
    const matchesSearch = 
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  const renderAssignmentItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.assignmentCard}
      onPress={() => navigation.navigate('AssignmentDetails', { assignmentId: item.id })}
    >
      <View style={styles.assignmentHeader}>
        <View 
          style={[
            styles.subjectIndicator,
            { backgroundColor: getSubjectColor(item.subject) }
          ]} 
        />
        <View style={styles.assignmentTitleContainer}>
          <Text style={styles.assignmentTitle}>{item.title}</Text>
          <Text style={styles.assignmentSubject}>{item.subject}</Text>
        </View>
        {item.status === 'completed' && (
          <View style={styles.gradeContainer}>
            <Text style={styles.gradeText}>{item.grade}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.assignmentInfoContainer}>
        <View style={styles.infoItem}>
          <Ionicons name="person-outline" size={16} color={COLORS.gray} />
          <Text style={styles.infoText}>{item.teacher}</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="time-outline" size={16} color={COLORS.gray} />
          <Text style={styles.infoText}>{item.dueDate}</Text>
        </View>
        {item.attachments > 0 && (
          <View style={styles.infoItem}>
            <Ionicons name="document-attach-outline" size={16} color={COLORS.gray} />
            <Text style={styles.infoText}>{item.attachments} {item.attachments === 1 ? 'file' : 'files'}</Text>
          </View>
        )}
      </View>
      
      <Text style={styles.assignmentDescription} numberOfLines={2}>
        {item.description}
      </Text>
      
      <View style={styles.assignmentFooter}>
        {item.status === 'pending' ? (
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => navigation.navigate('SubmitAssignment', { assignmentId: item.id })}
          >
            <Ionicons name="cloud-upload-outline" size={16} color={COLORS.white} />
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.viewGradeButton}
            onPress={() => navigation.navigate('AssignmentFeedback', { assignmentId: item.id })}
          >
            <Ionicons name="document-text-outline" size={16} color={COLORS.primary} />
            <Text style={styles.viewGradeButtonText}>View Feedback</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  // Helper function to get color based on subject
  const getSubjectColor = (subject: string) => {
    const subjectColors: {[key: string]: string} = {
      'Mathematics': '#4C6EF5',
      'Physics': '#F59F0A',
      'Chemistry': '#8E44AD',
      'Biology': '#2ECC71',
      'English': '#E74C3C',
      'Computer Science': '#3498DB',
    };
    
    return subjectColors[subject] || COLORS.primary;
  };

  const EmptyListComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="document-text-outline" size={60} color={COLORS.lightGray} />
      <Text style={styles.emptyTitle}>No Assignments</Text>
      <Text style={styles.emptyText}>
        {activeTab === 'pending'
          ? 'You have no pending assignments.'
          : 'You have no completed assignments.'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Assignments</Text>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color={COLORS.gray} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search assignments..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={COLORS.gray}
        />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'pending' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('pending')}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'pending' && styles.activeTabButtonText,
            ]}
          >
            Pending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'completed' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('completed')}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'completed' && styles.activeTabButtonText,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredAssignments}
        renderItem={renderAssignmentItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.assignmentsList}
        ListEmptyComponent={EmptyListComponent}
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
  notificationButton: {
    position: 'relative',
    padding: SIZES.padding,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    ...FONTS.body5,
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  searchIcon: {
    marginRight: SIZES.padding,
  },
  searchInput: {
    flex: 1,
    ...FONTS.body3,
    color: COLORS.text,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding * 2,
    marginTop: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tabButton: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    marginRight: SIZES.padding * 2,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabButtonText: {
    ...FONTS.body3,
    color: COLORS.gray,
  },
  activeTabButtonText: {
    ...FONTS.body3,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  assignmentsList: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    flexGrow: 1,
  },
  assignmentCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    marginBottom: SIZES.padding,
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
    marginBottom: SIZES.padding,
  },
  subjectIndicator: {
    width: 4,
    borderRadius: 2,
    marginRight: SIZES.padding,
  },
  assignmentTitleContainer: {
    flex: 1,
  },
  assignmentTitle: {
    ...FONTS.h4,
    color: COLORS.text,
    marginBottom: 4,
  },
  assignmentSubject: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  gradeContainer: {
    backgroundColor: COLORS.lightPrimary,
    borderRadius: SIZES.radius / 2,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SIZES.padding,
  },
  gradeText: {
    ...FONTS.body4,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  assignmentInfoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SIZES.padding,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SIZES.padding * 1.5,
    marginBottom: SIZES.padding / 2,
  },
  infoText: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginLeft: 4,
  },
  assignmentDescription: {
    ...FONTS.body4,
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  assignmentFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
    borderRadius: SIZES.radius / 2,
  },
  submitButtonText: {
    ...FONTS.body4,
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  viewGradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
    borderRadius: SIZES.radius / 2,
  },
  viewGradeButtonText: {
    ...FONTS.body4,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SIZES.padding * 5,
  },
  emptyTitle: {
    ...FONTS.h3,
    color: COLORS.text,
    marginTop: SIZES.padding,
    marginBottom: SIZES.padding / 2,
  },
  emptyText: {
    ...FONTS.body4,
    color: COLORS.gray,
    textAlign: 'center',
    paddingHorizontal: SIZES.padding * 2,
  },
});

export default Assignments; 