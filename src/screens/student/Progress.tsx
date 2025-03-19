import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../../constants';

const Progress = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data for student progress
  const [progress, setProgress] = useState({
    overallGrade: 'A-',
    averageScore: 85,
    totalCourses: 6,
    completedCourses: 2,
    attendanceRate: 92,
    testsPassed: 18,
    testsFailed: 2,
    recentGrades: [
      {
        id: '1',
        subject: 'Mathematics',
        title: 'Mid-term Exam',
        grade: 'A',
        score: 92,
        date: 'Mar 15, 2024',
      },
      {
        id: '2',
        subject: 'Physics',
        title: 'Lab Report',
        grade: 'B+',
        score: 87,
        date: 'Mar 10, 2024',
      },
      {
        id: '3',
        subject: 'Chemistry',
        title: 'Quiz 3',
        grade: 'A-',
        score: 89,
        date: 'Mar 8, 2024',
      },
      {
        id: '4',
        subject: 'English',
        title: 'Essay Submission',
        grade: 'B',
        score: 82,
        date: 'Mar 5, 2024',
      },
      {
        id: '5',
        subject: 'Computer Science',
        title: 'Project Evaluation',
        grade: 'A+',
        score: 95,
        date: 'Feb 28, 2024',
      },
    ],
    subjectPerformance: [
      {
        id: '1',
        subject: 'Mathematics',
        average: 88,
        highest: 94,
        lowest: 78,
        improvementRate: 5,
      },
      {
        id: '2',
        subject: 'Physics',
        average: 82,
        highest: 90,
        lowest: 75,
        improvementRate: 3,
      },
      {
        id: '3',
        subject: 'Chemistry',
        average: 85,
        highest: 92,
        lowest: 80,
        improvementRate: 7,
      },
      {
        id: '4',
        subject: 'English',
        average: 80,
        highest: 86,
        lowest: 72,
        improvementRate: -2,
      },
      {
        id: '5',
        subject: 'Computer Science',
        average: 92,
        highest: 98,
        lowest: 85,
        improvementRate: 8,
      },
      {
        id: '6',
        subject: 'Biology',
        average: 79,
        highest: 88,
        lowest: 72,
        improvementRate: 4,
      },
    ],
  });

  const renderGradeItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.gradeCard}
      onPress={() => navigation.navigate('GradeDetails', { gradeId: item.id })}
    >
      <View style={styles.gradeHeader}>
        <View
          style={[
            styles.gradeIndicator,
            { backgroundColor: getGradeColor(item.grade) }
          ]}
        >
          <Text style={styles.gradeText}>{item.grade}</Text>
        </View>
        <View style={styles.gradeInfo}>
          <Text style={styles.gradeTitle}>{item.title}</Text>
          <Text style={styles.gradeSubject}>{item.subject}</Text>
        </View>
        <Text style={styles.gradeScore}>{item.score}%</Text>
      </View>
      <Text style={styles.gradeDate}>{item.date}</Text>
    </TouchableOpacity>
  );

  const renderSubjectItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.subjectCard}
      onPress={() => navigation.navigate('SubjectProgress', { subjectId: item.id })}
    >
      <View style={styles.subjectHeader}>
        <Text style={styles.subjectName}>{item.subject}</Text>
        <View
          style={[
            styles.averageContainer,
            { backgroundColor: getPerformanceColor(item.average) }
          ]}
        >
          <Text style={styles.averageText}>{item.average}%</Text>
        </View>
      </View>
      
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${item.average}%`, backgroundColor: getPerformanceColor(item.average) }
            ]}
          />
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Highest</Text>
          <Text style={styles.statValue}>{item.highest}%</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Lowest</Text>
          <Text style={styles.statValue}>{item.lowest}%</Text>
        </View>
        <View style={styles.statItem}>
          <View style={styles.improvementContainer}>
            <Text style={styles.statLabel}>Trend</Text>
            <View style={styles.trendContainer}>
              <Ionicons
                name={item.improvementRate >= 0 ? 'arrow-up' : 'arrow-down'}
                size={12}
                color={item.improvementRate >= 0 ? COLORS.success : COLORS.error}
              />
              <Text
                style={[
                  styles.improvementText,
                  {
                    color: item.improvementRate >= 0 ? COLORS.success : COLORS.error
                  }
                ]}
              >
                {Math.abs(item.improvementRate)}%
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Helper function to get color based on grade
  const getGradeColor = (grade: string) => {
    const gradeColors: {[key: string]: string} = {
      'A+': '#2ECC71',
      'A': '#27AE60',
      'A-': '#2ECC71',
      'B+': '#3498DB',
      'B': '#2980B9',
      'B-': '#3498DB',
      'C+': '#F1C40F',
      'C': '#F39C12',
      'C-': '#F1C40F',
      'D': '#E67E22',
      'F': '#E74C3C',
    };
    
    return gradeColors[grade] || COLORS.primary;
  };

  // Helper function to get color based on performance
  const getPerformanceColor = (score: number) => {
    if (score >= 90) return '#2ECC71';
    if (score >= 80) return '#3498DB';
    if (score >= 70) return '#F1C40F';
    if (score >= 60) return '#E67E22';
    return '#E74C3C';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Progress</Text>
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={() => {}}
        >
          <Ionicons name="download-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'overview' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('overview')}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'overview' && styles.activeTabButtonText,
            ]}
          >
            Overview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'grades' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('grades')}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'grades' && styles.activeTabButtonText,
            ]}
          >
            Recent Grades
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'subjects' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('subjects')}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'subjects' && styles.activeTabButtonText,
            ]}
          >
            Subjects
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'overview' ? (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.overviewContainer}>
            <View style={styles.gradeOverviewCard}>
              <Text style={styles.overviewLabel}>Overall Grade</Text>
              <View style={styles.gradeCircle}>
                <Text style={styles.overallGradeText}>{progress.overallGrade}</Text>
                <Text style={styles.averageScoreText}>{progress.averageScore}%</Text>
              </View>
            </View>
            
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Ionicons name="book-outline" size={24} color={COLORS.primary} />
                <Text style={styles.statCardValue}>{progress.completedCourses}/{progress.totalCourses}</Text>
                <Text style={styles.statCardLabel}>Courses</Text>
              </View>
              <View style={styles.statCard}>
                <Ionicons name="calendar-outline" size={24} color={COLORS.primary} />
                <Text style={styles.statCardValue}>{progress.attendanceRate}%</Text>
                <Text style={styles.statCardLabel}>Attendance</Text>
              </View>
              <View style={styles.statCard}>
                <Ionicons name="checkmark-circle-outline" size={24} color={COLORS.primary} />
                <Text style={styles.statCardValue}>{progress.testsPassed}/{progress.testsPassed + progress.testsFailed}</Text>
                <Text style={styles.statCardLabel}>Tests Passed</Text>
              </View>
            </View>
            
            <Text style={styles.sectionTitle}>Recent Grades</Text>
            {progress.recentGrades.slice(0, 3).map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.gradeCard}
                onPress={() => navigation.navigate('GradeDetails', { gradeId: item.id })}
              >
                <View style={styles.gradeHeader}>
                  <View
                    style={[
                      styles.gradeIndicator,
                      { backgroundColor: getGradeColor(item.grade) }
                    ]}
                  >
                    <Text style={styles.gradeText}>{item.grade}</Text>
                  </View>
                  <View style={styles.gradeInfo}>
                    <Text style={styles.gradeTitle}>{item.title}</Text>
                    <Text style={styles.gradeSubject}>{item.subject}</Text>
                  </View>
                  <Text style={styles.gradeScore}>{item.score}%</Text>
                </View>
                <Text style={styles.gradeDate}>{item.date}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity 
              style={styles.viewAllButton}
              onPress={() => setActiveTab('grades')}
            >
              <Text style={styles.viewAllButtonText}>View All Grades</Text>
            </TouchableOpacity>
            
            <Text style={styles.sectionTitle}>Subject Performance</Text>
            {progress.subjectPerformance.slice(0, 3).map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.subjectCard}
                onPress={() => navigation.navigate('SubjectProgress', { subjectId: item.id })}
              >
                <View style={styles.subjectHeader}>
                  <Text style={styles.subjectName}>{item.subject}</Text>
                  <View
                    style={[
                      styles.averageContainer,
                      { backgroundColor: getPerformanceColor(item.average) }
                    ]}
                  >
                    <Text style={styles.averageText}>{item.average}%</Text>
                  </View>
                </View>
                
                <View style={styles.progressBarContainer}>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${item.average}%`, backgroundColor: getPerformanceColor(item.average) }
                      ]}
                    />
                  </View>
                </View>
                
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Highest</Text>
                    <Text style={styles.statValue}>{item.highest}%</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Lowest</Text>
                    <Text style={styles.statValue}>{item.lowest}%</Text>
                  </View>
                  <View style={styles.statItem}>
                    <View style={styles.improvementContainer}>
                      <Text style={styles.statLabel}>Trend</Text>
                      <View style={styles.trendContainer}>
                        <Ionicons
                          name={item.improvementRate >= 0 ? 'arrow-up' : 'arrow-down'}
                          size={12}
                          color={item.improvementRate >= 0 ? COLORS.success : COLORS.error}
                        />
                        <Text
                          style={[
                            styles.improvementText,
                            {
                              color: item.improvementRate >= 0 ? COLORS.success : COLORS.error
                            }
                          ]}
                        >
                          {Math.abs(item.improvementRate)}%
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            <TouchableOpacity 
              style={styles.viewAllButton}
              onPress={() => setActiveTab('subjects')}
            >
              <Text style={styles.viewAllButtonText}>View All Subjects</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : activeTab === 'grades' ? (
        <FlatList
          data={progress.recentGrades}
          renderItem={renderGradeItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={progress.subjectPerformance}
          renderItem={renderSubjectItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  downloadButton: {
    padding: SIZES.padding,
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
    paddingHorizontal: SIZES.padding,
    marginRight: SIZES.padding,
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
  content: {
    flex: 1,
  },
  overviewContainer: {
    padding: SIZES.padding * 2,
  },
  gradeOverviewCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 2,
    marginBottom: SIZES.padding * 2,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  overviewLabel: {
    ...FONTS.body3,
    color: COLORS.gray,
    marginBottom: SIZES.padding,
  },
  gradeCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.lightPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: COLORS.primary,
  },
  overallGradeText: {
    ...FONTS.h1,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  averageScoreText: {
    ...FONTS.body3,
    color: COLORS.text,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding * 2,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    alignItems: 'center',
    marginHorizontal: SIZES.padding / 2,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statCardValue: {
    ...FONTS.h3,
    color: COLORS.text,
    marginTop: SIZES.padding,
    marginBottom: 4,
  },
  statCardLabel: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.text,
    marginTop: SIZES.padding,
    marginBottom: SIZES.padding,
  },
  gradeCard: {
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
  gradeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  gradeIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding,
  },
  gradeText: {
    ...FONTS.body3,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  gradeInfo: {
    flex: 1,
  },
  gradeTitle: {
    ...FONTS.body3,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  gradeSubject: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  gradeScore: {
    ...FONTS.h4,
    color: COLORS.text,
  },
  gradeDate: {
    ...FONTS.body5,
    color: COLORS.lightGray,
    marginLeft: SIZES.padding * 2 + 32, // Align with grade info
  },
  viewAllButton: {
    alignItems: 'center',
    marginVertical: SIZES.padding,
  },
  viewAllButtonText: {
    ...FONTS.body3,
    color: COLORS.primary,
  },
  subjectCard: {
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
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  subjectName: {
    ...FONTS.body3,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  averageContainer: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 4,
    borderRadius: SIZES.radius / 2,
  },
  averageText: {
    ...FONTS.body4,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    marginBottom: SIZES.padding,
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.lightGray2,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    ...FONTS.body5,
    color: COLORS.gray,
    marginBottom: 2,
  },
  statValue: {
    ...FONTS.body3,
    color: COLORS.text,
  },
  improvementContainer: {
    alignItems: 'center',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  improvementText: {
    ...FONTS.body3,
    marginLeft: 2,
  },
  listContent: {
    padding: SIZES.padding * 2,
  },
});

export default Progress; 