import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES, IMAGES } from '../../constants';

const TeachersList = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  
  // List of subjects for filtering
  const subjects = [
    'All',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer Science',
    'English',
    'History',
    'Geography',
  ];
  
  // Mock data for teachers
  const [teachers, setTeachers] = useState([
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      profileImage: IMAGES.teacher1,
      subjects: ['Mathematics', 'Physics'],
      qualifications: 'PhD in Mathematics, IIT Delhi',
      experience: '10 years',
      rating: 4.8,
      reviewCount: 124,
      hourlyRate: 800,
      availability: 'Mon-Fri, 4PM-8PM',
      about: 'Experienced mathematics and physics teacher with a passion for making complex concepts easy to understand.',
    },
    {
      id: '2',
      name: 'Prof. Rahul Verma',
      profileImage: IMAGES.teacher2,
      subjects: ['Physics', 'Chemistry'],
      qualifications: 'MSc in Physics, Delhi University',
      experience: '8 years',
      rating: 4.5,
      reviewCount: 98,
      hourlyRate: 750,
      availability: 'Tue-Sat, 3PM-7PM',
      about: 'Dedicated physics and chemistry teacher with a focus on practical applications and exam preparation.',
    },
    {
      id: '3',
      name: 'Dr. Meena Gupta',
      profileImage: IMAGES.teacher3,
      subjects: ['Chemistry', 'Biology'],
      qualifications: 'PhD in Chemistry, AIIMS',
      experience: '12 years',
      rating: 4.9,
      reviewCount: 156,
      hourlyRate: 850,
      availability: 'Mon-Sat, 5PM-9PM',
      about: 'Passionate about teaching science subjects with a focus on conceptual understanding and real-world examples.',
    },
    {
      id: '4',
      name: 'Mrs. Anjali Singh',
      profileImage: IMAGES.teacher4,
      subjects: ['English', 'History'],
      qualifications: 'MA in English Literature, JNU',
      experience: '7 years',
      rating: 4.6,
      reviewCount: 87,
      hourlyRate: 700,
      availability: 'Mon-Fri, 2PM-6PM',
      about: 'Specializes in English language and literature, helping students improve their communication and writing skills.',
    },
    {
      id: '5',
      name: 'Prof. Amit Patel',
      profileImage: IMAGES.teacher5,
      subjects: ['Computer Science', 'Mathematics'],
      qualifications: 'BTech in Computer Science, IIT Bombay',
      experience: '9 years',
      rating: 4.7,
      reviewCount: 112,
      hourlyRate: 900,
      availability: 'Wed-Sun, 4PM-8PM',
      about: 'Passionate about coding and mathematics, teaching students to develop logical thinking and problem-solving skills.',
    },
    {
      id: '6',
      name: 'Dr. Suresh Kumar',
      profileImage: IMAGES.teacher6,
      subjects: ['Biology', 'Geography'],
      qualifications: 'PhD in Life Sciences, IISC Bangalore',
      experience: '11 years',
      rating: 4.4,
      reviewCount: 76,
      hourlyRate: 780,
      availability: 'Tue-Sun, 3PM-7PM',
      about: 'Dedicated to making biology and environmental sciences interesting and accessible to students of all levels.',
    },
  ]);
  
  // Filter teachers based on search query and selected subject
  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = 
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subjects.some(subject => 
        subject.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      teacher.qualifications.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = 
      selectedSubject === 'All' || 
      teacher.subjects.includes(selectedSubject);
    
    return matchesSearch && matchesSubject;
  });

  // Render subject filter buttons
  const renderSubjectItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.subjectButton,
        selectedSubject === item && styles.selectedSubjectButton,
      ]}
      onPress={() => setSelectedSubject(item)}
    >
      <Text
        style={[
          styles.subjectButtonText,
          selectedSubject === item && styles.selectedSubjectButtonText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  // Render teacher card
  const renderTeacherItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.teacherCard}
      onPress={() => navigation.navigate('TeacherProfile', { teacherId: item.id })}
    >
      <View style={styles.teacherInfo}>
        <Image source={item.profileImage} style={styles.teacherImage} />
        <View style={styles.teacherDetails}>
          <Text style={styles.teacherName}>{item.name}</Text>
          <View style={styles.subjectsContainer}>
            {item.subjects.map((subject: string, index: number) => (
              <View key={index} style={styles.subjectTag}>
                <Text style={styles.subjectTagText}>{subject}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.qualifications}>{item.qualifications}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewCount}>({item.reviewCount} reviews)</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.teacherFooter}>
        <View style={styles.rateContainer}>
          <Text style={styles.rateLabel}>Hourly Rate</Text>
          <Text style={styles.rateValue}>₹{item.hourlyRate}</Text>
        </View>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => navigation.navigate('BookSession', { teacherId: item.id })}
        >
          <Text style={styles.bookButtonText}>Book Session</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Empty state component
  const EmptyListComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="search" size={60} color={COLORS.lightGray} />
      <Text style={styles.emptyTitle}>No Teachers Found</Text>
      <Text style={styles.emptyText}>
        Try adjusting your filters or search for different keywords.
      </Text>
    </View>
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
        <Text style={styles.headerTitle}>Find Teachers</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => navigation.navigate('TeacherFilters')}
        >
          <Ionicons name="options-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color={COLORS.gray} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, subject, qualification..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={COLORS.gray}
        />
      </View>

      <View style={styles.subjectsContainer}>
        <FlatList
          data={subjects}
          renderItem={renderSubjectItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.subjectsList}
        />
      </View>

      <FlatList
        data={filteredTeachers}
        renderItem={renderTeacherItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.teachersList}
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
  backButton: {
    padding: SIZES.padding,
  },
  filterButton: {
    padding: SIZES.padding,
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
  subjectsContainer: {
    marginVertical: SIZES.padding,
  },
  subjectsList: {
    paddingHorizontal: SIZES.padding * 2,
  },
  subjectButton: {
    paddingVertical: SIZES.padding / 2,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.radius,
    marginRight: SIZES.padding,
    backgroundColor: COLORS.lightGray2,
  },
  selectedSubjectButton: {
    backgroundColor: COLORS.primary,
  },
  subjectButtonText: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  selectedSubjectButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  teachersList: {
    padding: SIZES.padding * 2,
  },
  teacherCard: {
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
  teacherInfo: {
    flexDirection: 'row',
    marginBottom: SIZES.padding,
  },
  teacherImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: SIZES.padding * 1.5,
  },
  teacherDetails: {
    flex: 1,
  },
  teacherName: {
    ...FONTS.h3,
    color: COLORS.text,
    marginBottom: 4,
  },
  subjectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  subjectTag: {
    backgroundColor: COLORS.lightPrimary,
    paddingVertical: 2,
    paddingHorizontal: SIZES.padding / 2,
    borderRadius: SIZES.radius / 2,
    marginRight: 6,
    marginBottom: 4,
  },
  subjectTagText: {
    ...FONTS.body5,
    color: COLORS.primary,
  },
  qualifications: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...FONTS.body4,
    color: COLORS.text,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  reviewCount: {
    ...FONTS.body5,
    color: COLORS.gray,
    marginLeft: 4,
  },
  teacherFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SIZES.padding,
    paddingTop: SIZES.padding,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  rateContainer: {
    flex: 1,
  },
  rateLabel: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  rateValue: {
    ...FONTS.h4,
    color: COLORS.text,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.padding / 2,
    paddingHorizontal: SIZES.padding * 1.5,
    borderRadius: SIZES.radius,
  },
  bookButtonText: {
    ...FONTS.body4,
    color: COLORS.white,
    fontWeight: 'bold',
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

export default TeachersList; 