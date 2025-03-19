import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES, ICONS } from '../../constants';

type Student = {
  id: string;
  name: string;
  grade: string;
  subjects: string[];
  attendance: number;
  performance: number;
  lastActive: string;
  isFavorite: boolean;
};

const TeacherStudents = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [favorites, setFavorites] = useState<string[]>([]);

  // Mock data
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'Rahul Sharma',
      grade: '10th Grade',
      subjects: ['Mathematics', 'Physics'],
      attendance: 95,
      performance: 87,
      lastActive: '2 hours ago',
      isFavorite: true,
    },
    {
      id: '2',
      name: 'Priya Patel',
      grade: '9th Grade',
      subjects: ['Mathematics'],
      attendance: 88,
      performance: 92,
      lastActive: '1 day ago',
      isFavorite: false,
    },
    {
      id: '3',
      name: 'Arjun Singh',
      grade: '11th Grade',
      subjects: ['Physics', 'Chemistry'],
      attendance: 76,
      performance: 82,
      lastActive: '5 hours ago',
      isFavorite: true,
    },
    {
      id: '4',
      name: 'Neha Kapoor',
      grade: '12th Grade',
      subjects: ['Mathematics', 'Chemistry'],
      attendance: 98,
      performance: 95,
      lastActive: 'Just now',
      isFavorite: true,
    },
    {
      id: '5',
      name: 'Vikram Malhotra',
      grade: '10th Grade',
      subjects: ['Physics'],
      attendance: 65,
      performance: 70,
      lastActive: '3 days ago',
      isFavorite: false,
    },
    {
      id: '6',
      name: 'Sneha Gupta',
      grade: '9th Grade',
      subjects: ['Mathematics', 'Physics'],
      attendance: 92,
      performance: 88,
      lastActive: 'Yesterday',
      isFavorite: false,
    },
    {
      id: '7',
      name: 'Aditya Reddy',
      grade: '11th Grade',
      subjects: ['Chemistry'],
      attendance: 85,
      performance: 78,
      lastActive: '4 hours ago',
      isFavorite: false,
    },
  ]);

  // Initialize favorites from students
  React.useEffect(() => {
    const initialFavorites = students
      .filter(student => student.isFavorite)
      .map(student => student.id);
    setFavorites(initialFavorites);
  }, []);

  const toggleFavorite = (studentId: string) => {
    setStudents(prevStudents =>
      prevStudents.map(student => {
        if (student.id === studentId) {
          return {
            ...student,
            isFavorite: !student.isFavorite,
          };
        }
        return student;
      })
    );

    setFavorites(prevFavorites => {
      if (prevFavorites.includes(studentId)) {
        return prevFavorites.filter(id => id !== studentId);
      } else {
        return [...prevFavorites, studentId];
      }
    });
  };

  const getFilteredStudents = () => {
    let filtered = students;

    // Apply search filter
    if (searchQuery.trim() !== '') {
      const normalizedQuery = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        student => 
          student.name.toLowerCase().includes(normalizedQuery) ||
          student.grade.toLowerCase().includes(normalizedQuery) ||
          student.subjects.some(subject => 
            subject.toLowerCase().includes(normalizedQuery)
          )
      );
    }

    // Apply tab filter
    if (activeFilter === 'favorites') {
      filtered = filtered.filter(student => favorites.includes(student.id));
    } else if (activeFilter === 'active') {
      filtered = filtered.filter(student => 
        student.lastActive.includes('Just now') || 
        student.lastActive.includes('hours')
      );
    } else if (activeFilter === 'attention') {
      filtered = filtered.filter(student => 
        student.attendance < 80 || student.performance < 75
      );
    }

    return filtered;
  };

  const renderStudentCard = ({ item }: { item: Student }) => {
    const performanceColor = 
      item.performance >= 85 ? COLORS.success :
      item.performance >= 70 ? COLORS.warning :
      COLORS.error;

    const attendanceColor = 
      item.attendance >= 90 ? COLORS.success :
      item.attendance >= 75 ? COLORS.warning :
      COLORS.error;

    return (
      <TouchableOpacity 
        style={styles.studentCard}
        onPress={() => navigation.navigate('StudentDetails', { studentId: item.id })}
      >
        <View style={styles.cardHeader}>
          <View style={styles.studentInfo}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {item.name.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
            <View>
              <Text style={styles.studentName}>{item.name}</Text>
              <Text style={styles.studentGrade}>{item.grade}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(item.id)}
          >
            <Ionicons 
              name={item.isFavorite ? ICONS.star : ICONS.starOutline} 
              size={24} 
              color={item.isFavorite ? COLORS.warning : COLORS.gray} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.subjectsContainer}>
          {item.subjects.map((subject, index) => (
            <View key={index} style={styles.subjectTag}>
              <Text style={styles.subjectText}>{subject}</Text>
            </View>
          ))}
        </View>

        <View style={styles.metricsContainer}>
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Attendance</Text>
            <View style={styles.metricValueContainer}>
              <Text style={[styles.metricValue, { color: attendanceColor }]}>
                {item.attendance}%
              </Text>
            </View>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Performance</Text>
            <View style={styles.metricValueContainer}>
              <Text style={[styles.metricValue, { color: performanceColor }]}>
                {item.performance}%
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.lastActiveContainer}>
            <Ionicons name="time-outline" size={16} color={COLORS.gray} />
            <Text style={styles.lastActiveText}>
              Active {item.lastActive}
            </Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => navigation.navigate('Chat', { studentId: item.id })}
            >
              <Ionicons name={ICONS.chat} size={20} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => navigation.navigate('AssignAssignment', { studentId: item.id })}
            >
              <Ionicons name={ICONS.document} size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="people-outline" size={80} color={COLORS.lightGray} />
      <Text style={styles.emptyTitle}>No Students Found</Text>
      <Text style={styles.emptyText}>
        Try adjusting your search or filters to find students.
      </Text>
    </View>
  );

  const filteredStudents = getFilteredStudents();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Students</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('AddStudent')}
        >
          <Ionicons name={ICONS.add} size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name={ICONS.search} size={20} color={COLORS.gray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search students by name, grade, subject..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name={ICONS.close} size={20} color={COLORS.gray} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.filterTabs}>
        <TouchableOpacity
          style={[styles.filterTab, activeFilter === 'all' && styles.activeFilterTab]}
          onPress={() => setActiveFilter('all')}
        >
          <Text style={[styles.filterText, activeFilter === 'all' && styles.activeFilterText]}>
            All Students
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, activeFilter === 'favorites' && styles.activeFilterTab]}
          onPress={() => setActiveFilter('favorites')}
        >
          <Text style={[styles.filterText, activeFilter === 'favorites' && styles.activeFilterText]}>
            Favorites
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, activeFilter === 'active' && styles.activeFilterTab]}
          onPress={() => setActiveFilter('active')}
        >
          <Text style={[styles.filterText, activeFilter === 'active' && styles.activeFilterText]}>
            Recently Active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, activeFilter === 'attention' && styles.activeFilterTab]}
          onPress={() => setActiveFilter('attention')}
        >
          <Text style={[styles.filterText, activeFilter === 'attention' && styles.activeFilterText]}>
            Needs Attention
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.studentsContainer}>
        <Text style={styles.resultCount}>
          {filteredStudents.length} {filteredStudents.length === 1 ? 'Student' : 'Students'}
        </Text>
        <FlatList
          data={filteredStudents}
          renderItem={renderStudentCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.studentsList}
          ListEmptyComponent={renderEmptyState}
        />
      </View>
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
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.text,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: SIZES.padding * 2,
    marginBottom: SIZES.padding,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray2,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
  },
  searchIcon: {
    marginRight: SIZES.padding / 2,
  },
  searchInput: {
    flex: 1,
    ...FONTS.body3,
    color: COLORS.text,
  },
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding * 2,
    marginBottom: SIZES.padding,
  },
  filterTab: {
    paddingVertical: SIZES.padding / 2,
    marginRight: SIZES.padding,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeFilterTab: {
    borderBottomColor: COLORS.primary,
  },
  filterText: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  activeFilterText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  studentsContainer: {
    flex: 1,
    paddingHorizontal: SIZES.padding * 2,
  },
  resultCount: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginBottom: SIZES.padding,
  },
  studentsList: {
    paddingBottom: SIZES.padding * 2,
  },
  studentCard: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding,
  },
  avatarText: {
    ...FONTS.h3,
    color: COLORS.white,
  },
  studentName: {
    ...FONTS.h4,
    color: COLORS.text,
  },
  studentGrade: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  favoriteButton: {
    padding: SIZES.padding / 2,
  },
  subjectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SIZES.padding,
  },
  subjectTag: {
    backgroundColor: COLORS.lightPrimary,
    borderRadius: SIZES.radius / 2,
    paddingHorizontal: SIZES.padding / 2,
    paddingVertical: 2,
    marginRight: SIZES.padding / 2,
    marginBottom: SIZES.padding / 2,
  },
  subjectText: {
    ...FONTS.body5,
    color: COLORS.primary,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding,
  },
  metricItem: {
    width: '48%',
  },
  metricLabel: {
    ...FONTS.body5,
    color: COLORS.gray,
    marginBottom: 2,
  },
  metricValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricValue: {
    ...FONTS.h4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SIZES.padding / 2,
  },
  lastActiveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastActiveText: {
    ...FONTS.body5,
    color: COLORS.gray,
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: SIZES.padding / 2,
    marginLeft: SIZES.padding / 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SIZES.padding * 4,
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

export default TeacherStudents; 