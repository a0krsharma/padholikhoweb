import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES, ICONS } from '../../constants';

interface Child {
  id: string;
  name: string;
  grade: string;
  avatar: string | null;
}

interface ClassSession {
  id: string;
  subject: string;
  teacher: string;
  date: string;
  time: string;
  childId: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

interface PaymentSummary {
  childId: string;
  paid: number;
  pending: number;
  dueDate: string;
}

interface PerformanceMetric {
  childId: string;
  subject: string;
  score: number;
  improvement: number;
  lastAssessment: string;
}

const ParentDashboard = ({ navigation }: any) => {
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [upcomingClasses, setUpcomingClasses] = useState<ClassSession[]>([]);
  const [paymentSummaries, setPaymentSummaries] = useState<PaymentSummary[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch data from an API
    loadMockData();
  }, []);

  const loadMockData = () => {
    // Mock children data
    const mockChildren: Child[] = [
      {
        id: 'c1',
        name: 'Priya Sharma',
        grade: '10th',
        avatar: null,
      },
      {
        id: 'c2',
        name: 'Rahul Sharma',
        grade: '8th',
        avatar: null,
      }
    ];
    
    setChildren(mockChildren);
    setSelectedChild(mockChildren[0].id);
    
    // Mock upcoming classes
    const mockClasses: ClassSession[] = [
      {
        id: '1',
        subject: 'Mathematics',
        teacher: 'Dr. Patel',
        date: 'Today',
        time: '4:00 PM - 5:30 PM',
        childId: 'c1',
        status: 'upcoming',
      },
      {
        id: '2',
        subject: 'Science',
        teacher: 'Prof. Kumar',
        date: 'Tomorrow',
        time: '10:00 AM - 11:30 AM',
        childId: 'c1',
        status: 'upcoming',
      },
      {
        id: '3',
        subject: 'English',
        teacher: 'Mrs. Desai',
        date: 'Today',
        time: '2:00 PM - 3:00 PM',
        childId: 'c2',
        status: 'upcoming',
      },
      {
        id: '4',
        subject: 'History',
        teacher: 'Mr. Singh',
        date: '21 Mar',
        time: '11:00 AM - 12:00 PM',
        childId: 'c2',
        status: 'upcoming',
      },
    ];
    
    setUpcomingClasses(mockClasses);
    
    // Mock payment summaries
    const mockPayments: PaymentSummary[] = [
      {
        childId: 'c1',
        paid: 12000,
        pending: 3000,
        dueDate: '28 Mar 2023',
      },
      {
        childId: 'c2',
        paid: 10000,
        pending: 2000,
        dueDate: '31 Mar 2023',
      },
    ];
    
    setPaymentSummaries(mockPayments);
    
    // Mock performance metrics
    const mockPerformance: PerformanceMetric[] = [
      {
        childId: 'c1',
        subject: 'Mathematics',
        score: 85,
        improvement: 5,
        lastAssessment: '15 Mar 2023',
      },
      {
        childId: 'c1',
        subject: 'Science',
        score: 92,
        improvement: 8,
        lastAssessment: '10 Mar 2023',
      },
      {
        childId: 'c2',
        subject: 'English',
        score: 78,
        improvement: 3,
        lastAssessment: '12 Mar 2023',
      },
      {
        childId: 'c2',
        subject: 'Mathematics',
        score: 80,
        improvement: 10,
        lastAssessment: '14 Mar 2023',
      },
    ];
    
    setPerformanceMetrics(mockPerformance);
    setLoading(false);
  };

  const getChildName = (childId: string) => {
    const child = children.find(c => c.id === childId);
    return child ? child.name : '';
  };

  const getChildGrade = (childId: string) => {
    const child = children.find(c => c.id === childId);
    return child ? child.grade : '';
  };

  const getFilteredClasses = () => {
    if (!selectedChild) return [];
    return upcomingClasses.filter(cls => cls.childId === selectedChild);
  };

  const getFilteredPerformance = () => {
    if (!selectedChild) return [];
    return performanceMetrics.filter(perf => perf.childId === selectedChild);
  };

  const getSelectedChildPayment = () => {
    if (!selectedChild) return null;
    return paymentSummaries.find(pay => pay.childId === selectedChild);
  };

  const renderChildSelector = () => (
    <View style={styles.childSelector}>
      <Text style={styles.selectorLabel}>Select Child</Text>
      <View style={styles.childrenList}>
        {children.map(child => (
          <TouchableOpacity
            key={child.id}
            style={[
              styles.childItem,
              selectedChild === child.id && styles.selectedChildItem
            ]}
            onPress={() => setSelectedChild(child.id)}
          >
            <View style={styles.avatarContainer}>
              {child.avatar ? (
                <Image source={{ uri: child.avatar }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>{child.name.charAt(0)}</Text>
                </View>
              )}
            </View>
            <Text style={[
              styles.childName,
              selectedChild === child.id && styles.selectedChildName
            ]}>
              {child.name}
            </Text>
            <Text style={styles.childGrade}>{child.grade}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderClassItem = ({ item }: { item: ClassSession }) => (
    <TouchableOpacity 
      style={styles.classCard}
      onPress={() => navigation.navigate('ClassDetails', { classId: item.id })}
    >
      <View style={styles.classHeader}>
        <View style={[styles.subjectIcon, { backgroundColor: getSubjectColor(item.subject) }]}>
          <Ionicons name={getSubjectIcon(item.subject)} size={20} color={COLORS.white} />
        </View>
        <View style={styles.classInfo}>
          <Text style={styles.classSubject}>{item.subject}</Text>
          <Text style={styles.classTeacher}>{item.teacher}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Text>
        </View>
      </View>
      
      <View style={styles.classDetails}>
        <View style={styles.detailItem}>
          <Ionicons name={ICONS.calendar} size={16} color={COLORS.gray} />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name={ICONS.time} size={16} color={COLORS.gray} />
          <Text style={styles.detailText}>{item.time}</Text>
        </View>
      </View>
      
      <View style={styles.classActions}>
        {item.status === 'upcoming' && (
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('ClassDetails', { classId: item.id })}
          >
            <Text style={styles.actionButtonText}>View Details</Text>
          </TouchableOpacity>
        )}
        {item.status === 'ongoing' && (
          <TouchableOpacity 
            style={[styles.actionButton, styles.joinButton]}
            onPress={() => navigation.navigate('LiveClass', { classId: item.id })}
          >
            <Text style={styles.joinButtonText}>Join Now</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderPerformanceItem = ({ item }: { item: PerformanceMetric }) => (
    <View style={styles.performanceCard}>
      <View style={styles.performanceHeader}>
        <View style={[styles.subjectIcon, { backgroundColor: getSubjectColor(item.subject) }]}>
          <Ionicons name={getSubjectIcon(item.subject)} size={20} color={COLORS.white} />
        </View>
        <Text style={styles.performanceSubject}>{item.subject}</Text>
      </View>
      
      <View style={styles.performanceScore}>
        <Text style={styles.scoreValue}>{item.score}%</Text>
        <View style={styles.improvementContainer}>
          <Ionicons 
            name={item.improvement > 0 ? ICONS.arrowUp : ICONS.arrowDown} 
            size={14} 
            color={item.improvement > 0 ? COLORS.success : COLORS.error} 
          />
          <Text style={[
            styles.improvementText,
            { color: item.improvement > 0 ? COLORS.success : COLORS.error }
          ]}>
            {Math.abs(item.improvement)}%
          </Text>
        </View>
      </View>
      
      <Text style={styles.assessmentDate}>Last assessment: {item.lastAssessment}</Text>
    </View>
  );

  const renderPaymentSummary = () => {
    const payment = getSelectedChildPayment();
    if (!payment) return null;
    
    return (
      <View style={styles.paymentCard}>
        <View style={styles.paymentHeader}>
          <Text style={styles.paymentTitle}>Payment Summary</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Payments')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.paymentDetails}>
          <View style={styles.paymentItem}>
            <Text style={styles.paymentLabel}>Paid</Text>
            <Text style={styles.paymentValue}>₹{payment.paid.toLocaleString()}</Text>
          </View>
          <View style={styles.paymentItem}>
            <Text style={styles.paymentLabel}>Pending</Text>
            <Text style={[styles.paymentValue, styles.pendingValue]}>₹{payment.pending.toLocaleString()}</Text>
          </View>
        </View>
        
        <View style={styles.paymentDueDate}>
          <Text style={styles.dueDateLabel}>Next payment due:</Text>
          <Text style={styles.dueDateValue}>{payment.dueDate}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.payNowButton}
          onPress={() => navigation.navigate('Payments', { tab: 'pending' })}
        >
          <Text style={styles.payNowText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const getSubjectColor = (subject: string) => {
    const colors: {[key: string]: string} = {
      'Mathematics': '#4ECB71',
      'Science': '#FDA085',
      'English': '#9B5DE5',
      'History': '#F15BB5',
    };
    return colors[subject] || COLORS.primary;
  };

  const getSubjectIcon = (subject: string) => {
    const icons: {[key: string]: string} = {
      'Mathematics': ICONS.calculator,
      'Science': ICONS.flask,
      'English': ICONS.book,
      'History': ICONS.book,
    };
    return icons[subject] || ICONS.school;
  };

  const getStatusColor = (status: string) => {
    const colors: {[key: string]: string} = {
      'upcoming': COLORS.primary,
      'ongoing': COLORS.success,
      'completed': COLORS.gray,
      'cancelled': COLORS.error,
    };
    return colors[status] || COLORS.primary;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Parent!</Text>
          <Text style={styles.subtitle}>Monitor your child's educational journey</Text>
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Ionicons name={ICONS.person} size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {renderChildSelector()}

        {selectedChild && (
          <>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Upcoming Classes</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Schedule')}>
                  <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
              </View>
              
              {getFilteredClasses().length > 0 ? (
                <FlatList
                  data={getFilteredClasses().slice(0, 2)}
                  renderItem={renderClassItem}
                  keyExtractor={(item) => item.id}
                  horizontal={false}
                  scrollEnabled={false}
                  contentContainerStyle={styles.classesList}
                />
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>No upcoming classes for {getChildName(selectedChild)}</Text>
                  <TouchableOpacity 
                    style={styles.scheduleButton}
                    onPress={() => navigation.navigate('Schedule')}
                  >
                    <Text style={styles.scheduleButtonText}>View Schedule</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Academic Performance</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Performance', { childId: selectedChild })}>
                  <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
              </View>
              
              {getFilteredPerformance().length > 0 ? (
                <FlatList
                  data={getFilteredPerformance()}
                  renderItem={renderPerformanceItem}
                  keyExtractor={(item) => `${item.childId}-${item.subject}`}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.performanceList}
                />
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>No performance data for {getChildName(selectedChild)}</Text>
                </View>
              )}
            </View>

            <View style={styles.section}>
              {renderPaymentSummary()}
            </View>

            <View style={styles.quickActions}>
              <TouchableOpacity 
                style={styles.actionCard}
                onPress={() => navigation.navigate('Schedule')}
              >
                <View style={[styles.actionIcon, { backgroundColor: COLORS.lightPrimary }]}>
                  <Ionicons name={ICONS.calendar} size={24} color={COLORS.primary} />
                </View>
                <Text style={styles.actionText}>Schedule</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionCard}
                onPress={() => navigation.navigate('Payments')}
              >
                <View style={[styles.actionIcon, { backgroundColor: COLORS.lightSuccess }]}>
                  <Ionicons name={ICONS.wallet} size={24} color={COLORS.success} />
                </View>
                <Text style={styles.actionText}>Payments</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionCard}
                onPress={() => navigation.navigate('Teachers')}
              >
                <View style={[styles.actionIcon, { backgroundColor: COLORS.lightInfo }]}>
                  <Ionicons name={ICONS.person} size={24} color={COLORS.info} />
                </View>
                <Text style={styles.actionText}>Teachers</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionCard}
                onPress={() => navigation.navigate('Support')}
              >
                <View style={[styles.actionIcon, { backgroundColor: COLORS.lightWarning }]}>
                  <Ionicons name={ICONS.help} size={24} color={COLORS.warning} />
                </View>
                <Text style={styles.actionText}>Support</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
    paddingTop: SIZES.padding * 2,
    paddingBottom: SIZES.padding,
  },
  greeting: {
    ...FONTS.h2,
    color: COLORS.text,
  },
  subtitle: {
    ...FONTS.body3,
    color: COLORS.gray,
    marginTop: 4,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  childSelector: {
    paddingHorizontal: SIZES.padding * 2,
    marginTop: SIZES.padding,
  },
  selectorLabel: {
    ...FONTS.h4,
    color: COLORS.gray,
    marginBottom: SIZES.padding / 2,
  },
  childrenList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  childItem: {
    alignItems: 'center',
    marginRight: SIZES.padding * 2,
    marginBottom: SIZES.padding,
  },
  selectedChildItem: {
    // Selected child styling
  },
  avatarContainer: {
    marginBottom: SIZES.padding / 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.lightPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    ...FONTS.h2,
    color: COLORS.primary,
  },
  childName: {
    ...FONTS.body3,
    color: COLORS.text,
  },
  selectedChildName: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  childGrade: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  section: {
    paddingHorizontal: SIZES.padding * 2,
    marginTop: SIZES.padding * 2,
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
  },
  seeAllText: {
    ...FONTS.body4,
    color: COLORS.primary,
  },
  classesList: {
    paddingBottom: SIZES.padding,
  },
  classCard: {
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
  classHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  subjectIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding,
  },
  classInfo: {
    flex: 1,
  },
  classSubject: {
    ...FONTS.h4,
    color: COLORS.text,
  },
  classTeacher: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  statusBadge: {
    paddingHorizontal: SIZES.padding / 2,
    paddingVertical: 4,
    borderRadius: SIZES.radius / 2,
  },
  statusText: {
    ...FONTS.caption,
    color: COLORS.white,
  },
  classDetails: {
    flexDirection: 'row',
    marginBottom: SIZES.padding,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SIZES.padding * 2,
  },
  detailText: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginLeft: 4,
  },
  classActions: {
    alignItems: 'flex-end',
  },
  actionButton: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightPrimary,
  },
  actionButtonText: {
    ...FONTS.body4,
    color: COLORS.primary,
  },
  joinButton: {
    backgroundColor: COLORS.primary,
  },
  joinButtonText: {
    ...FONTS.body4,
    color: COLORS.white,
  },
  performanceList: {
    paddingRight: SIZES.padding,
  },
  performanceCard: {
    width: 150,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginRight: SIZES.padding,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  performanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  performanceSubject: {
    ...FONTS.body4,
    color: COLORS.text,
    flex: 1,
  },
  performanceScore: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding / 2,
  },
  scoreValue: {
    ...FONTS.h2,
    color: COLORS.text,
  },
  improvementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  improvementText: {
    ...FONTS.body5,
    marginLeft: 2,
  },
  assessmentDate: {
    ...FONTS.caption,
    color: COLORS.gray,
  },
  paymentCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  paymentTitle: {
    ...FONTS.h4,
    color: COLORS.text,
  },
  viewAllText: {
    ...FONTS.body5,
    color: COLORS.primary,
  },
  paymentDetails: {
    flexDirection: 'row',
    marginBottom: SIZES.padding,
  },
  paymentItem: {
    flex: 1,
  },
  paymentLabel: {
    ...FONTS.body5,
    color: COLORS.gray,
    marginBottom: 4,
  },
  paymentValue: {
    ...FONTS.h3,
    color: COLORS.success,
  },
  pendingValue: {
    color: COLORS.warning,
  },
  paymentDueDate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  dueDateLabel: {
    ...FONTS.body5,
    color: COLORS.gray,
    marginRight: SIZES.padding / 2,
  },
  dueDateValue: {
    ...FONTS.body4,
    color: COLORS.text,
  },
  payNowButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.padding / 2,
    alignItems: 'center',
  },
  payNowText: {
    ...FONTS.button,
    color: COLORS.white,
  },
  emptyState: {
    alignItems: 'center',
    padding: SIZES.padding * 2,
  },
  emptyStateText: {
    ...FONTS.body3,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: SIZES.padding,
  },
  scheduleButton: {
    backgroundColor: COLORS.lightPrimary,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
    borderRadius: SIZES.radius,
  },
  scheduleButtonText: {
    ...FONTS.body4,
    color: COLORS.primary,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding * 2,
    marginTop: SIZES.padding * 2,
    marginBottom: SIZES.padding * 4,
  },
  actionCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    alignItems: 'center',
    marginBottom: SIZES.padding,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  actionText: {
    ...FONTS.body3,
    color: COLORS.text,
  },
});

export default ParentDashboard; 