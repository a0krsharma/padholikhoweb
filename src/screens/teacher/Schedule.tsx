import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  Modal,
  TextInput,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { SafeAreaView as SafeAreaViewRN } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES, ICONS } from '../../constants';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthService } from '../../services/auth';
import firestore from '@react-native-firebase/firestore';

interface SessionType {
  id: string;
  title: string;
  subject: string;
  date: Date;
  startTime: string;
  endTime: string;
  studentIds: string[];
  studentNames: string[];
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  notes?: string;
  isRecurring?: boolean;
  recurringDays?: string[];
}

const TeacherSchedule = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState('day');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [sessions, setSessions] = useState<SessionType[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<SessionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [markedDates, setMarkedDates] = useState<{ [date: string]: { marked: boolean, dotColor: string } }>({});
  
  // For creating new session
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSession, setNewSession] = useState({
    title: '',
    subject: '',
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(new Date().setHours(new Date().getHours() + 1)),
    students: [] as { id: string, name: string }[],
    notes: '',
    isRecurring: false,
    recurringDays: [] as string[],
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    if (selectedDate && sessions.length > 0) {
      filterSessionsByDate(selectedDate);
    }
  }, [selectedDate, sessions]);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const userId = AuthService.getCurrentUser()?.uid;
      if (!userId) return;

      // In a real app, this would fetch sessions from Firestore
      // For now, we'll simulate this with mock data
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const mockSessions: SessionType[] = [
        {
          id: '1',
          title: 'Mathematics - Class 8A',
          subject: 'Mathematics',
          date: today,
          startTime: '09:00 AM',
          endTime: '10:30 AM',
          studentIds: ['s1', 's2', 's3'],
          studentNames: ['Rahul Sharma', 'Priya Patel', 'Sanjay Verma'],
          status: 'scheduled',
          notes: 'Chapter 5: Algebraic Expressions',
        },
        {
          id: '2',
          title: 'Science - Class 10B',
          subject: 'Science',
          date: today,
          startTime: '11:00 AM',
          endTime: '12:30 PM',
          studentIds: ['s4', 's5', 's6'],
          studentNames: ['Anjali Singh', 'Raj Kumar', 'Neha Gupta', 'Vikram Shah'],
          status: 'scheduled',
        },
        {
          id: '3',
          title: 'Mathematics - Class 9C',
          subject: 'Mathematics',
          date: tomorrow,
          startTime: '09:00 AM',
          endTime: '10:30 AM',
          studentIds: ['s7', 's8', 's9'],
          studentNames: ['Deepak Sharma', 'Maya Patel', 'Arjun Singh'],
          status: 'scheduled',
          notes: 'Chapter 7: Geometry',
        },
        {
          id: '4',
          title: 'English - Class 7A',
          subject: 'English',
          date: yesterday,
          startTime: '02:00 PM',
          endTime: '03:30 PM',
          studentIds: ['s10', 's11', 's12'],
          studentNames: ['Kiran Joshi', 'Amar Patel', 'Divya Verma'],
          status: 'completed',
        },
      ];
      
      setSessions(mockSessions);
      updateMarkedDates(mockSessions);
      filterSessionsByDate(selectedDate);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      Alert.alert('Error', 'Failed to load schedule');
    } finally {
      setLoading(false);
    }
  };

  const updateMarkedDates = (sessions: SessionType[]) => {
    const dates: { [date: string]: { marked: boolean, dotColor: string } } = {};
    
    sessions.forEach(session => {
      const dateStr = session.date.toISOString().split('T')[0];
      dates[dateStr] = { marked: true, dotColor: COLORS.primary };
    });
    
    // Mark selected date
    if (selectedDate) {
      dates[selectedDate] = { ...dates[selectedDate], marked: true, dotColor: COLORS.primary };
    }
    
    setMarkedDates(dates);
  };

  const filterSessionsByDate = (date: string) => {
    const filtered = sessions.filter(session => {
      const sessionDate = session.date.toISOString().split('T')[0];
      return sessionDate === date;
    });
    
    setFilteredSessions(filtered);
  };

  const handleDateSelect = (day: any) => {
    const date = day.dateString;
    setSelectedDate(new Date(date));
  };

  const formatTime = (time: string) => {
    return time;
  };

  const handleAddSession = () => {
    if (!newSession.title.trim()) {
      Alert.alert('Error', 'Please enter a session title');
      return;
    }
    
    if (!newSession.subject.trim()) {
      Alert.alert('Error', 'Please enter a subject');
      return;
    }
    
    setIsCreating(true);
    
    // Simulate API call
    setTimeout(() => {
      const startTimeStr = newSession.startTime.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
      });
      
      const endTimeStr = newSession.endTime.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
      });
      
      const newSessionObj: SessionType = {
        id: Date.now().toString(),
        title: newSession.title,
        subject: newSession.subject,
        date: new Date(newSession.date),
        startTime: startTimeStr,
        endTime: endTimeStr,
        studentIds: newSession.students.map(s => s.id),
        studentNames: newSession.students.map(s => s.name),
        status: 'scheduled',
        notes: newSession.notes,
        isRecurring: newSession.isRecurring,
        recurringDays: newSession.recurringDays,
      };
      
      const updatedSessions = [...sessions, newSessionObj];
      setSessions(updatedSessions);
      updateMarkedDates(updatedSessions);
      
      // If the new session is on the selected date, update filtered sessions
      const sessionDate = newSessionObj.date.toISOString().split('T')[0];
      if (sessionDate === selectedDate) {
        setFilteredSessions([...filteredSessions, newSessionObj]);
      }
      
      // Reset form
      setNewSession({
        title: '',
        subject: '',
        date: new Date(),
        startTime: new Date(),
        endTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        students: [],
        notes: '',
        isRecurring: false,
        recurringDays: [],
      });
      
      setIsCreating(false);
      setShowAddModal(false);
      
      Alert.alert('Success', 'Session added to schedule');
    }, 1000);
  };

  const handleCancelSession = (id: string) => {
    Alert.alert(
      'Cancel Session',
      'Are you sure you want to cancel this session?',
      [
        { text: 'No', style: 'cancel' },
        { 
          text: 'Yes', 
          style: 'destructive',
          onPress: () => {
            // Update status to cancelled in our local state
            const updatedSessions = sessions.map(session => 
              session.id === id ? { ...session, status: 'cancelled' as const } : session
            );
            
            setSessions(updatedSessions);
            
            // Update filtered sessions
            const updatedFiltered = filteredSessions.map(session => 
              session.id === id ? { ...session, status: 'cancelled' as const } : session
            );
            
            setFilteredSessions(updatedFiltered);
            
            Alert.alert('Success', 'Session cancelled successfully');
          }
        },
      ]
    );
  };

  const renderSessionItem = ({ item }: any) => {
    const statusColors: {[key: string]: string} = {
      'scheduled': COLORS.primary,
      'ongoing': COLORS.success,
      'completed': COLORS.gray,
      'cancelled': COLORS.error,
    };
    
    return (
      <TouchableOpacity 
        style={styles.sessionItem}
        onPress={() => navigation.navigate('SessionDetails', { sessionId: item.id })}
      >
        <View style={styles.sessionTime}>
          <Text style={styles.timeText}>{item.startTime}</Text>
          <View style={styles.timeLine} />
          <Text style={styles.timeText}>{item.endTime}</Text>
        </View>
        
        <View style={[styles.sessionContent, { borderLeftColor: getSubjectColor(item.subject) }]}>
          <View style={styles.sessionHeader}>
            <Text style={styles.sessionSubject}>{item.subject}</Text>
            <View style={[styles.statusBadge, { backgroundColor: statusColors[item.status] }]}>
              <Text style={styles.statusText}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Text>
            </View>
          </View>
          
          <Text style={styles.sessionTopic}>{item.title}</Text>
          
          <View style={styles.sessionDetails}>
            <View style={styles.detailItem}>
              <Ionicons name={ICONS.video} size={16} color={COLORS.gray} />
              <Text style={styles.detailText}>Online Class</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name={ICONS.student} size={16} color={COLORS.gray} />
              <Text style={styles.detailText}>{item.studentNames.length} Students</Text>
            </View>
          </View>
          
          <View style={styles.sessionActions}>
            {item.status === 'scheduled' && (
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={() => handleCancelSession(item.id)}
              >
                <Text style={styles.primaryButtonText}>Cancel</Text>
              </TouchableOpacity>
            )}
            {item.status === 'ongoing' && (
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={() => navigation.navigate('LiveClass', { sessionId: item.id })}
              >
                <Text style={styles.primaryButtonText}>Join Now</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name={ICONS.document} size={20} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name={ICONS.edit} size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'day':
        return (
          <View style={styles.dayView}>
            <View style={styles.dateHeader}>
              <Text style={styles.currentDateText}>
                {`${selectedDate.getDate()} ${months[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`}
              </Text>
              <View style={styles.dateNavigation}>
                <TouchableOpacity 
                  style={styles.dateButton}
                  onPress={() => {
                    const newDate = new Date(selectedDate);
                    newDate.setDate(newDate.getDate() - 1);
                    setSelectedDate(newDate);
                  }}
                >
                  <Ionicons name="chevron-back" size={20} color={COLORS.primary} />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.todayButton}
                  onPress={() => setSelectedDate(new Date())}
                >
                  <Text style={styles.todayButtonText}>Today</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.dateButton}
                  onPress={() => {
                    const newDate = new Date(selectedDate);
                    newDate.setDate(newDate.getDate() + 1);
                    setSelectedDate(newDate);
                  }}
                >
                  <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
            </View>
            
            {sessions.length > 0 ? (
              <FlatList
                data={sessions}
                renderItem={renderSessionItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.sessionsList}
              />
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="calendar-outline" size={80} color={COLORS.lightGray} />
                <Text style={styles.emptyStateTitle}>No Classes Scheduled</Text>
                <Text style={styles.emptyStateMessage}>You don't have any classes scheduled for this day.</Text>
                <TouchableOpacity 
                  style={styles.emptyStateButton}
                  onPress={() => navigation.navigate('CreateSession')}
                >
                  <Text style={styles.emptyStateButtonText}>Schedule a Class</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        );
      
      case 'week':
        return (
          <View style={styles.weekView}>
            <View style={styles.dateHeader}>
              <Text style={styles.currentDateText}>
                {`${months[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`}
              </Text>
              <View style={styles.dateNavigation}>
                <TouchableOpacity 
                  style={styles.dateButton}
                  onPress={() => {
                    const newDate = new Date(selectedDate);
                    newDate.setDate(newDate.getDate() - 7);
                    setSelectedDate(newDate);
                  }}
                >
                  <Ionicons name="chevron-back" size={20} color={COLORS.primary} />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.todayButton}
                  onPress={() => setSelectedDate(new Date())}
                >
                  <Text style={styles.todayButtonText}>This Week</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.dateButton}
                  onPress={() => {
                    const newDate = new Date(selectedDate);
                    newDate.setDate(newDate.getDate() + 7);
                    setSelectedDate(newDate);
                  }}
                >
                  <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.weekDays}>
              {getDatesForWeek().map((date, index) => {
                const isToday = date.toDateString() === new Date().toDateString();
                const isSelected = date.toDateString() === selectedDate.toDateString();
                
                return (
                  <TouchableOpacity 
                    key={index}
                    style={[
                      styles.weekDay,
                      isSelected && styles.selectedWeekDay,
                      isToday && styles.todayWeekDay,
                    ]}
                    onPress={() => setSelectedDate(date)}
                  >
                    <Text style={[
                      styles.weekDayName,
                      isSelected && styles.selectedWeekDayText,
                      isToday && styles.todayWeekDayText,
                    ]}>
                      {weekDays[date.getDay()]}
                    </Text>
                    <Text style={[
                      styles.weekDayNumber,
                      isSelected && styles.selectedWeekDayText,
                      isToday && styles.todayWeekDayText,
                    ]}>
                      {date.getDate()}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            
            {sessions.length > 0 ? (
              <FlatList
                data={sessions}
                renderItem={renderSessionItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.sessionsList}
              />
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="calendar-outline" size={80} color={COLORS.lightGray} />
                <Text style={styles.emptyStateTitle}>No Classes Scheduled</Text>
                <Text style={styles.emptyStateMessage}>You don't have any classes scheduled for this week.</Text>
                <TouchableOpacity 
                  style={styles.emptyStateButton}
                  onPress={() => navigation.navigate('CreateSession')}
                >
                  <Text style={styles.emptyStateButtonText}>Schedule a Class</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        );
      
      case 'month':
        return (
          <View style={styles.monthView}>
            <View style={styles.dateHeader}>
              <Text style={styles.currentDateText}>
                {`${months[selectedMonth]} ${selectedYear}`}
              </Text>
              <View style={styles.dateNavigation}>
                <TouchableOpacity 
                  style={styles.dateButton}
                  onPress={() => {
                    if (selectedMonth === 0) {
                      setSelectedMonth(11);
                      setSelectedYear(selectedYear - 1);
                    } else {
                      setSelectedMonth(selectedMonth - 1);
                    }
                  }}
                >
                  <Ionicons name="chevron-back" size={20} color={COLORS.primary} />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.todayButton}
                  onPress={() => {
                    const today = new Date();
                    setSelectedMonth(today.getMonth());
                    setSelectedYear(today.getFullYear());
                    setSelectedDate(today);
                  }}
                >
                  <Text style={styles.todayButtonText}>This Month</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.dateButton}
                  onPress={() => {
                    if (selectedMonth === 11) {
                      setSelectedMonth(0);
                      setSelectedYear(selectedYear + 1);
                    } else {
                      setSelectedMonth(selectedMonth + 1);
                    }
                  }}
                >
                  <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.calendarHeader}>
              {weekDays.map((day, index) => (
                <Text key={index} style={styles.calendarHeaderDay}>{day}</Text>
              ))}
            </View>
            
            <View style={styles.calendarGrid}>
              {getDaysInMonth(selectedMonth, selectedYear).map((date, index) => {
                if (date === null) {
                  return <View key={`empty-${index}`} style={styles.calendarDay} />;
                }
                
                const isToday = date.toDateString() === new Date().toDateString();
                const isSelected = date.toDateString() === selectedDate.toDateString();
                const hasEvents = sessions.some(session => 
                  new Date(session.date).toDateString() === date.toDateString()
                );
                
                return (
                  <TouchableOpacity 
                    key={index}
                    style={[
                      styles.calendarDay,
                      isSelected && styles.selectedCalendarDay,
                      isToday && styles.todayCalendarDay,
                    ]}
                    onPress={() => {
                      setSelectedDate(date);
                      setActiveTab('day');
                    }}
                  >
                    <Text style={[
                      styles.calendarDayText,
                      isSelected && styles.selectedCalendarDayText,
                      isToday && styles.todayCalendarDayText,
                    ]}>
                      {date.getDate()}
                    </Text>
                    {hasEvents && <View style={styles.eventDot} />}
                  </TouchableOpacity>
                );
              })}
            </View>
            
            <TouchableOpacity 
              style={styles.scheduleButton}
              onPress={() => navigation.navigate('CreateSession')}
            >
              <Ionicons name={ICONS.add} size={24} color={COLORS.white} />
              <Text style={styles.scheduleButtonText}>Schedule New Class</Text>
            </TouchableOpacity>
          </View>
        );
      
      default:
        return null;
    }
  };

  const getDatesForWeek = () => {
    const dates = [];
    const currentDate = new Date(selectedDate);
    const day = currentDate.getDay();
    
    // Start from Sunday of the current week
    currentDate.setDate(currentDate.getDate() - day);
    
    for (let i = 0; i < 7; i++) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  };

  const getDaysInMonth = (month: number, year: number) => {
    const date = new Date(year, month, 1);
    const days = [];
    
    // Get the first day of the month (0-6, where 0 is Sunday)
    const firstDay = date.getDay();
    
    // Add empty days for the start of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Get the number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <SafeAreaViewRN style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Schedule</Text>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => navigation.navigate('CreateSession')}
        >
          <Ionicons name={ICONS.add} size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'day' && styles.activeTab]}
          onPress={() => setActiveTab('day')}
        >
          <Text style={[styles.tabText, activeTab === 'day' && styles.activeTabText]}>Day</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'week' && styles.activeTab]}
          onPress={() => setActiveTab('week')}
        >
          <Text style={[styles.tabText, activeTab === 'week' && styles.activeTabText]}>Week</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'month' && styles.activeTab]}
          onPress={() => setActiveTab('month')}
        >
          <Text style={[styles.tabText, activeTab === 'month' && styles.activeTabText]}>Month</Text>
        </TouchableOpacity>
      </View>
      
      {renderTabContent()}
    </SafeAreaViewRN>
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
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingHorizontal: SIZES.padding * 2,
  },
  tab: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    marginRight: SIZES.padding,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    ...FONTS.body3,
    color: COLORS.gray,
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  dayView: {
    flex: 1,
    paddingHorizontal: SIZES.padding * 2,
    paddingTop: SIZES.padding,
  },
  weekView: {
    flex: 1,
    paddingHorizontal: SIZES.padding * 2,
    paddingTop: SIZES.padding,
  },
  monthView: {
    flex: 1,
    paddingHorizontal: SIZES.padding * 2,
    paddingTop: SIZES.padding,
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  currentDateText: {
    ...FONTS.h4,
    color: COLORS.text,
  },
  dateNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateButton: {
    padding: SIZES.padding / 2,
  },
  todayButton: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightPrimary,
    marginHorizontal: SIZES.padding / 2,
  },
  todayButtonText: {
    ...FONTS.body4,
    color: COLORS.primary,
  },
  sessionsList: {
    paddingBottom: SIZES.padding * 4,
  },
  sessionItem: {
    flexDirection: 'row',
    marginBottom: SIZES.padding,
  },
  sessionTime: {
    alignItems: 'center',
    width: 60,
    paddingTop: SIZES.padding,
  },
  timeText: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  timeLine: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },
  sessionContent: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginLeft: SIZES.padding,
    borderLeftWidth: 4,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding / 2,
  },
  sessionSubject: {
    ...FONTS.h4,
    color: COLORS.text,
  },
  statusBadge: {
    paddingHorizontal: SIZES.padding / 2,
    paddingVertical: 2,
    borderRadius: SIZES.radius / 2,
  },
  statusText: {
    ...FONTS.caption,
    color: COLORS.white,
  },
  sessionTopic: {
    ...FONTS.body3,
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  sessionDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SIZES.padding,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SIZES.padding,
    marginBottom: 4,
  },
  detailText: {
    ...FONTS.body5,
    color: COLORS.gray,
    marginLeft: 4,
  },
  sessionActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SIZES.padding,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
    marginHorizontal: SIZES.padding / 2,
  },
  primaryButtonText: {
    ...FONTS.body4,
    color: COLORS.white,
  },
  iconButton: {
    padding: SIZES.padding / 2,
    marginHorizontal: SIZES.padding / 2,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding * 2,
  },
  emptyStateTitle: {
    ...FONTS.h3,
    color: COLORS.text,
    marginTop: SIZES.padding * 2,
    marginBottom: SIZES.padding,
  },
  emptyStateMessage: {
    ...FONTS.body3,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: SIZES.padding * 2,
  },
  emptyStateButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.buttonRadius,
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
  },
  emptyStateButtonText: {
    ...FONTS.button,
    color: COLORS.white,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding,
  },
  weekDay: {
    alignItems: 'center',
    paddingVertical: SIZES.padding / 2,
    width: (SIZES.width - SIZES.padding * 4) / 7,
    borderRadius: SIZES.radius,
  },
  selectedWeekDay: {
    backgroundColor: COLORS.primary,
  },
  todayWeekDay: {
    backgroundColor: COLORS.lightPrimary,
  },
  weekDayName: {
    ...FONTS.body5,
    color: COLORS.gray,
    marginBottom: 4,
  },
  weekDayNumber: {
    ...FONTS.h4,
    color: COLORS.text,
  },
  selectedWeekDayText: {
    color: COLORS.white,
  },
  todayWeekDayText: {
    color: COLORS.primary,
  },
  calendarHeader: {
    flexDirection: 'row',
    marginBottom: SIZES.padding / 2,
  },
  calendarHeaderDay: {
    ...FONTS.body5,
    color: COLORS.gray,
    width: (SIZES.width - SIZES.padding * 4) / 7,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SIZES.padding * 2,
  },
  calendarDay: {
    width: (SIZES.width - SIZES.padding * 4) / 7,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  selectedCalendarDay: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
  },
  todayCalendarDay: {
    backgroundColor: COLORS.lightPrimary,
    borderRadius: 20,
  },
  calendarDayText: {
    ...FONTS.body4,
    color: COLORS.text,
  },
  selectedCalendarDayText: {
    color: COLORS.white,
  },
  todayCalendarDayText: {
    color: COLORS.primary,
  },
  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
    marginTop: 2,
  },
  scheduleButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.buttonRadius,
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZES.padding,
  },
  scheduleButtonText: {
    ...FONTS.button,
    color: COLORS.white,
    marginLeft: SIZES.padding / 2,
  },
});

export default TeacherSchedule; 