import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../../constants';
import { LearningService } from '../../services/learning';
import { LineChart, BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const ProgressReports = ({ route, navigation }: any) => {
  const { childId } = route.params;
  const [childInfo, setChildInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'assignments' | 'tests' | 'attendance'>('overview');
  const [progressData, setProgressData] = useState<any>({
    assignments: [],
    tests: [],
    attendance: [],
    overview: {
      totalAssignments: 0,
      completedAssignments: 0,
      totalTests: 0,
      averageScore: 0,
      totalClasses: 0,
      attendedClasses: 0,
    }
  });

  useEffect(() => {
    fetchChildData();
    fetchProgressData();
  }, [childId]);

  const fetchChildData = async () => {
    try {
      // In a real app, this would fetch the child's data from Firestore
      // For now, we'll simulate this with mock data
      setChildInfo({
        id: childId,
        name: 'Rahul Sharma',
        age: 12,
        grade: '7th Grade',
        school: 'Delhi Public School',
      });
    } catch (error) {
      console.error('Error fetching child info:', error);
      Alert.alert('Error', 'Failed to load child information');
    }
  };

  const fetchProgressData = async () => {
    try {
      setLoading(true);
      
      // In a real app, this would fetch the child's progress data from Firestore
      // For now, we'll simulate this with mock data
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for assignments
      const assignments = [
        { id: '1', title: 'Math Assignment', subject: 'Mathematics', score: 85, maxScore: 100, submittedOn: new Date(2023, 3, 5) },
        { id: '2', title: 'Science Lab Report', subject: 'Science', score: 78, maxScore: 100, submittedOn: new Date(2023, 3, 12) },
        { id: '3', title: 'English Essay', subject: 'English', score: 92, maxScore: 100, submittedOn: new Date(2023, 3, 18) },
        { id: '4', title: 'History Project', subject: 'History', score: 88, maxScore: 100, submittedOn: new Date(2023, 3, 25) },
        { id: '5', title: 'Algebra Test', subject: 'Mathematics', score: 75, maxScore: 100, submittedOn: new Date(2023, 4, 2) },
      ];
      
      // Mock data for tests
      const tests = [
        { id: '1', title: 'Math Monthly Test', subject: 'Mathematics', score: 82, maxScore: 100, date: new Date(2023, 3, 10) },
        { id: '2', title: 'Science Quiz', subject: 'Science', score: 75, maxScore: 100, date: new Date(2023, 3, 15) },
        { id: '3', title: 'English Vocabulary', subject: 'English', score: 90, maxScore: 100, date: new Date(2023, 3, 20) },
        { id: '4', title: 'Term Assessment', subject: 'All Subjects', score: 85, maxScore: 100, date: new Date(2023, 4, 5) },
      ];
      
      // Mock data for attendance
      const attendance = [
        { month: 'Jan', presentDays: 18, totalDays: 20 },
        { month: 'Feb', presentDays: 16, totalDays: 18 },
        { month: 'Mar', presentDays: 20, totalDays: 22 },
        { month: 'Apr', presentDays: 19, totalDays: 21 },
        { month: 'May', presentDays: 15, totalDays: 16 },
      ];
      
      // Calculate overview metrics
      const totalAssignments = assignments.length;
      const completedAssignments = assignments.length; // assuming all assignments are completed
      
      const totalTests = tests.length;
      const testScores = tests.map(test => test.score);
      const averageScore = testScores.reduce((acc, score) => acc + score, 0) / testScores.length;
      
      const totalClasses = attendance.reduce((acc, month) => acc + month.totalDays, 0);
      const attendedClasses = attendance.reduce((acc, month) => acc + month.presentDays, 0);
      
      setProgressData({
        assignments,
        tests,
        attendance,
        overview: {
          totalAssignments,
          completedAssignments,
          totalTests,
          averageScore,
          totalClasses,
          attendedClasses,
        }
      });
    } catch (error) {
      console.error('Error fetching progress data:', error);
      Alert.alert('Error', 'Failed to load progress data');
    } finally {
      setLoading(false);
    }
  };

  const renderTabBar = () => (
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
        onPress={() => setActiveTab('overview')}
      >
        <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>Overview</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'assignments' && styles.activeTab]}
        onPress={() => setActiveTab('assignments')}
      >
        <Text style={[styles.tabText, activeTab === 'assignments' && styles.activeTabText]}>Assignments</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'tests' && styles.activeTab]}
        onPress={() => setActiveTab('tests')}
      >
        <Text style={[styles.tabText, activeTab === 'tests' && styles.activeTabText]}>Tests</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'attendance' && styles.activeTab]}
        onPress={() => setActiveTab('attendance')}
      >
        <Text style={[styles.tabText, activeTab === 'attendance' && styles.activeTabText]}>Attendance</Text>
      </TouchableOpacity>
    </View>
  );

  const renderOverviewTab = () => {
    const { overview } = progressData;
    
    const assignmentCompletion = Math.round((overview.completedAssignments / overview.totalAssignments) * 100) || 0;
    const attendanceRate = Math.round((overview.attendedClasses / overview.totalClasses) * 100) || 0;
    
    return (
      <View style={styles.tabContent}>
        <Text style={styles.sectionTitle}>Academic Progress</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressItem}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Assignments</Text>
              <Text style={styles.progressValue}>{assignmentCompletion}%</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${assignmentCompletion}%` }]} />
            </View>
            <Text style={styles.progressMeta}>
              {overview.completedAssignments} completed out of {overview.totalAssignments}
            </Text>
          </View>
          
          <View style={styles.progressItem}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Average Test Score</Text>
              <Text style={styles.progressValue}>{Math.round(overview.averageScore)}%</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { width: `${overview.averageScore}%`, backgroundColor: getScoreColor(overview.averageScore) }
                ]} 
              />
            </View>
            <Text style={styles.progressMeta}>
              Based on {overview.totalTests} tests
            </Text>
          </View>
          
          <View style={styles.progressItem}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Attendance</Text>
              <Text style={styles.progressValue}>{attendanceRate}%</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { width: `${attendanceRate}%`, backgroundColor: getAttendanceColor(attendanceRate) }
                ]} 
              />
            </View>
            <Text style={styles.progressMeta}>
              {overview.attendedClasses} days present out of {overview.totalClasses}
            </Text>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Subject Performance</Text>
        
        {/* Subject performance chart - we'll simulate this with random data */}
        <View style={styles.chartContainer}>
          <BarChart
            data={{
              labels: ['Math', 'Science', 'English', 'History', 'Art'],
              datasets: [
                {
                  data: [85, 75, 90, 88, 95],
                },
              ],
            }}
            width={screenWidth - SIZES.padding * 4}
            height={220}
            chartConfig={{
              backgroundColor: COLORS.white,
              backgroundGradientFrom: COLORS.white,
              backgroundGradientTo: COLORS.white,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(72, 114, 199, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: SIZES.radius,
              },
            }}
            style={{
              marginVertical: SIZES.padding,
              borderRadius: SIZES.radius,
            }}
          />
        </View>
      </View>
    );
  };

  const renderAssignmentsTab = () => {
    const { assignments } = progressData;
    
    return (
      <View style={styles.tabContent}>
        <Text style={styles.sectionTitle}>Recent Assignments</Text>
        
        <View style={styles.listContainer}>
          {assignments.map((assignment: any) => (
            <View key={assignment.id} style={styles.listItem}>
              <View style={styles.listItemContent}>
                <Text style={styles.listItemTitle}>{assignment.title}</Text>
                <Text style={styles.listItemSubtitle}>{assignment.subject}</Text>
                <Text style={styles.listItemMeta}>
                  Submitted on {assignment.submittedOn.toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.scoreContainer}>
                <Text style={[styles.scoreText, { color: getScoreColor(assignment.score) }]}>
                  {assignment.score}%
                </Text>
              </View>
            </View>
          ))}
        </View>
        
        <Text style={styles.sectionTitle}>Progress Over Time</Text>
        
        <View style={styles.chartContainer}>
          <LineChart
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
              datasets: [
                {
                  data: progressData.assignments.map((a: any) => a.score).slice(0, 5),
                },
              ],
            }}
            width={screenWidth - SIZES.padding * 4}
            height={220}
            chartConfig={{
              backgroundColor: COLORS.white,
              backgroundGradientFrom: COLORS.white,
              backgroundGradientTo: COLORS.white,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(72, 114, 199, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: SIZES.radius,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: COLORS.primary,
              },
            }}
            bezier
            style={{
              marginVertical: SIZES.padding,
              borderRadius: SIZES.radius,
            }}
          />
        </View>
      </View>
    );
  };

  const renderTestsTab = () => {
    const { tests } = progressData;
    
    return (
      <View style={styles.tabContent}>
        <Text style={styles.sectionTitle}>Recent Tests</Text>
        
        <View style={styles.listContainer}>
          {tests.map((test: any) => (
            <View key={test.id} style={styles.listItem}>
              <View style={styles.listItemContent}>
                <Text style={styles.listItemTitle}>{test.title}</Text>
                <Text style={styles.listItemSubtitle}>{test.subject}</Text>
                <Text style={styles.listItemMeta}>
                  Test date: {test.date.toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.scoreContainer}>
                <Text style={[styles.scoreText, { color: getScoreColor(test.score) }]}>
                  {test.score}%
                </Text>
              </View>
            </View>
          ))}
        </View>
        
        <Text style={styles.sectionTitle}>Performance Trend</Text>
        
        <View style={styles.chartContainer}>
          <LineChart
            data={{
              labels: ['Test 1', 'Test 2', 'Test 3', 'Test 4'],
              datasets: [
                {
                  data: tests.map((t: any) => t.score),
                },
              ],
            }}
            width={screenWidth - SIZES.padding * 4}
            height={220}
            chartConfig={{
              backgroundColor: COLORS.white,
              backgroundGradientFrom: COLORS.white,
              backgroundGradientTo: COLORS.white,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(72, 114, 199, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: SIZES.radius,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: COLORS.primary,
              },
            }}
            bezier
            style={{
              marginVertical: SIZES.padding,
              borderRadius: SIZES.radius,
            }}
          />
        </View>
      </View>
    );
  };

  const renderAttendanceTab = () => {
    const { attendance } = progressData;
    
    const totalDays = attendance.reduce((acc: number, month: any) => acc + month.totalDays, 0);
    const presentDays = attendance.reduce((acc: number, month: any) => acc + month.presentDays, 0);
    const attendanceRate = Math.round((presentDays / totalDays) * 100) || 0;
    
    return (
      <View style={styles.tabContent}>
        <View style={styles.attendanceSummary}>
          <View style={styles.attendanceCircle}>
            <Text style={styles.attendancePercentage}>{attendanceRate}%</Text>
            <Text style={styles.attendanceLabel}>Attendance</Text>
          </View>
          <View style={styles.attendanceDetails}>
            <View style={styles.attendanceDetail}>
              <Text style={styles.attendanceDetailLabel}>Present Days:</Text>
              <Text style={styles.attendanceDetailValue}>{presentDays}</Text>
            </View>
            <View style={styles.attendanceDetail}>
              <Text style={styles.attendanceDetailLabel}>Absent Days:</Text>
              <Text style={styles.attendanceDetailValue}>{totalDays - presentDays}</Text>
            </View>
            <View style={styles.attendanceDetail}>
              <Text style={styles.attendanceDetailLabel}>Total Days:</Text>
              <Text style={styles.attendanceDetailValue}>{totalDays}</Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Monthly Attendance</Text>
        
        <View style={styles.chartContainer}>
          <BarChart
            data={{
              labels: attendance.map((a: any) => a.month),
              datasets: [
                {
                  data: attendance.map((a: any) => Math.round((a.presentDays / a.totalDays) * 100)),
                },
              ],
            }}
            width={screenWidth - SIZES.padding * 4}
            height={220}
            chartConfig={{
              backgroundColor: COLORS.white,
              backgroundGradientFrom: COLORS.white,
              backgroundGradientTo: COLORS.white,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(72, 114, 199, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: SIZES.radius,
              },
            }}
            style={{
              marginVertical: SIZES.padding,
              borderRadius: SIZES.radius,
            }}
          />
        </View>
        
        <Text style={styles.sectionTitle}>Attendance History</Text>
        
        <View style={styles.listContainer}>
          {attendance.map((month: any, index: number) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.listItemContent}>
                <Text style={styles.listItemTitle}>{month.month} 2023</Text>
                <Text style={styles.listItemMeta}>
                  {month.presentDays} days present out of {month.totalDays}
                </Text>
              </View>
              <View style={styles.scoreContainer}>
                <Text 
                  style={[
                    styles.scoreText, 
                    { color: getAttendanceColor(Math.round((month.presentDays / month.totalDays) * 100)) }
                  ]}
                >
                  {Math.round((month.presentDays / month.totalDays) * 100)}%
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return COLORS.success;
    if (score >= 75) return COLORS.primary;
    if (score >= 60) return COLORS.warning;
    return COLORS.error;
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return COLORS.success;
    if (attendance >= 75) return COLORS.primary;
    if (attendance >= 60) return COLORS.warning;
    return COLORS.error;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Progress Report</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Child Info */}
      {childInfo && (
        <View style={styles.childInfo}>
          <Text style={styles.childName}>{childInfo.name}</Text>
          <Text style={styles.childDetails}>
            {childInfo.grade} | {childInfo.school}
          </Text>
        </View>
      )}

      {/* Tab Bar */}
      {renderTabBar()}

      {/* Tab Content */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'assignments' && renderAssignmentsTab()}
          {activeTab === 'tests' && renderTestsTab()}
          {activeTab === 'attendance' && renderAttendanceTab()}
        </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.text,
  },
  childInfo: {
    padding: SIZES.padding * 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  childName: {
    ...FONTS.h3,
    color: COLORS.text,
  },
  childDetails: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginTop: 4,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    paddingVertical: SIZES.padding,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  activeTabText: {
    ...FONTS.body4,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: SIZES.padding * 4,
  },
  tabContent: {
    padding: SIZES.padding * 2,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.text,
    marginTop: SIZES.padding,
    marginBottom: SIZES.padding,
  },
  progressContainer: {
    marginBottom: SIZES.padding * 2,
  },
  progressItem: {
    marginBottom: SIZES.padding * 1.5,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    ...FONTS.body3,
    color: COLORS.text,
  },
  progressValue: {
    ...FONTS.h4,
    color: COLORS.primary,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  progressMeta: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: SIZES.padding * 2,
  },
  listContainer: {
    marginBottom: SIZES.padding * 2,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    ...FONTS.body3,
    color: COLORS.text,
    marginBottom: 4,
  },
  listItemSubtitle: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginBottom: 4,
  },
  listItemMeta: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  scoreContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SIZES.padding,
  },
  scoreText: {
    ...FONTS.h3,
    fontWeight: 'bold',
  },
  attendanceSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.padding,
    marginBottom: SIZES.padding,
  },
  attendanceCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding * 2,
  },
  attendancePercentage: {
    ...FONTS.h2,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  attendanceLabel: {
    ...FONTS.body4,
    color: COLORS.white,
    marginTop: 4,
  },
  attendanceDetails: {
    flex: 1,
  },
  attendanceDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  attendanceDetailLabel: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  attendanceDetailValue: {
    ...FONTS.body4,
    color: COLORS.text,
    fontWeight: 'bold',
  },
});

export default ProgressReports; 