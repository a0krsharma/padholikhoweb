import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../../constants';

const Schedule = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Generate week dates for the calendar strip
  const getWeekDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = -3; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };
  
  const weekDates = getWeekDates();
  
  // Format date to display day name
  const getDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };
  
  // Format date to display day number
  const getDayNumber = (date: Date) => {
    return date.getDate();
  };
  
  // Check if date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };
  
  // Check if two dates are the same
  const isSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() && 
           date1.getMonth() === date2.getMonth() && 
           date1.getFullYear() === date2.getFullYear();
  };
  
  // Mock data for classes
  const [classes, setClasses] = useState([
    {
      id: '1',
      subject: 'Mathematics',
      teacher: 'Dr. Priya Sharma',
      time: '09:00 AM - 10:30 AM',
      date: new Date(),
      location: 'Online',
      status: 'upcoming',
      zoomLink: 'https://zoom.us/j/123456789',
    },
    {
      id: '2',
      subject: 'Physics',
      teacher: 'Prof. Rahul Verma',
      time: '11:00 AM - 12:30 PM',
      date: new Date(),
      location: 'Online',
      status: 'upcoming',
      zoomLink: 'https://zoom.us/j/987654321',
    },
    {
      id: '3',
      subject: 'Chemistry',
      teacher: 'Dr. Meena Gupta',
      time: '02:00 PM - 03:30 PM',
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      location: 'Online',
      status: 'upcoming',
      zoomLink: 'https://zoom.us/j/567891234',
    },
    {
      id: '4',
      subject: 'Computer Science',
      teacher: 'Prof. Amit Patel',
      time: '09:00 AM - 10:30 AM',
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      location: 'Online',
      status: 'upcoming',
      zoomLink: 'https://zoom.us/j/345678912',
    },
    {
      id: '5',
      subject: 'English',
      teacher: 'Mrs. Anjali Singh',
      time: '11:00 AM - 12:30 PM',
      date: new Date(new Date().setDate(new Date().getDate() - 1)),
      location: 'Online',
      status: 'completed',
      zoomLink: 'https://zoom.us/j/234567891',
    },
    {
      id: '6',
      subject: 'Biology',
      teacher: 'Dr. Suresh Kumar',
      time: '02:00 PM - 03:30 PM',
      date: new Date(new Date().setDate(new Date().getDate() - 2)),
      location: 'Online',
      status: 'completed',
      zoomLink: 'https://zoom.us/j/891234567',
    },
  ]);
  
  // Filter classes based on selected date and active tab
  const filteredClasses = classes.filter(classItem => {
    const matchesDate = isSameDay(classItem.date, selectedDate);
    const matchesTab = classItem.status === activeTab;
    return matchesDate && matchesTab;
  });
  
  const renderDateItem = ({ item }: { item: Date }) => (
    <TouchableOpacity
      style={[
        styles.dateItem,
        isSameDay(item, selectedDate) && styles.selectedDateItem,
      ]}
      onPress={() => setSelectedDate(item)}
    >
      <Text
        style={[
          styles.dayName,
          isSameDay(item, selectedDate) && styles.selectedDayName,
          isToday(item) && styles.todayName,
        ]}
      >
        {getDayName(item)}
      </Text>
      <View
        style={[
          styles.dateNumber,
          isSameDay(item, selectedDate) && styles.selectedDateNumber,
          isToday(item) && styles.todayNumber,
        ]}
      >
        <Text
          style={[
            styles.dateNumberText,
            isSameDay(item, selectedDate) && styles.selectedDateNumberText,
            isToday(item) && styles.todayNumberText,
          ]}
        >
          {getDayNumber(item)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderClassItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.classCard}
      onPress={() => navigation.navigate('Session', { classId: item.id })}
    >
      <View style={styles.classHeader}>
        <View style={styles.subjectContainer}>
          <Text style={styles.subjectText}>{item.subject}</Text>
          <Text style={styles.teacherText}>{item.teacher}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Ionicons name="time-outline" size={16} color={COLORS.gray} />
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>
      
      <View style={styles.classFooter}>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color={COLORS.gray} />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        
        {item.status === 'upcoming' ? (
          <TouchableOpacity
            style={styles.joinButton}
            onPress={() => navigation.navigate('Session', { classId: item.id, joinDirectly: true })}
          >
            <Ionicons name="videocam-outline" size={16} color={COLORS.white} />
            <Text style={styles.joinButtonText}>Join Class</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.resourcesButton}
            onPress={() => navigation.navigate('ClassResources', { classId: item.id })}
          >
            <Ionicons name="document-outline" size={16} color={COLORS.primary} />
            <Text style={styles.resourcesButtonText}>Resources</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  const EmptyListComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="calendar-outline" size={60} color={COLORS.lightGray} />
      <Text style={styles.emptyTitle}>No Classes</Text>
      <Text style={styles.emptyText}>
        {activeTab === 'upcoming'
          ? 'You have no classes scheduled for this date.'
          : 'You have no completed classes for this date.'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Class Schedule</Text>
        <TouchableOpacity
          style={styles.calendarButton}
          onPress={() => navigation.navigate('Calendar')}
        >
          <Ionicons name="calendar-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.dateStripContainer}>
        <FlatList
          data={weekDates}
          renderItem={renderDateItem}
          keyExtractor={(item) => item.toISOString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dateStrip}
        />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'upcoming' && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === 'upcoming' && styles.activeTabButtonText,
            ]}
          >
            Upcoming
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
        data={filteredClasses}
        renderItem={renderClassItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.classesList}
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
  calendarButton: {
    padding: SIZES.padding,
  },
  dateStripContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dateStrip: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
  },
  dateItem: {
    alignItems: 'center',
    marginRight: SIZES.padding * 2,
    opacity: 0.7,
  },
  selectedDateItem: {
    opacity: 1,
  },
  dayName: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginBottom: 6,
  },
  selectedDayName: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  todayName: {
    color: COLORS.primary,
  },
  dateNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray2,
  },
  selectedDateNumber: {
    backgroundColor: COLORS.primary,
  },
  todayNumber: {
    backgroundColor: COLORS.lightPrimary,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  dateNumberText: {
    ...FONTS.body3,
    color: COLORS.text,
  },
  selectedDateNumberText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  todayNumberText: {
    color: COLORS.primary,
    fontWeight: 'bold',
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
  classesList: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    flexGrow: 1,
  },
  classCard: {
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
  classHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SIZES.padding,
  },
  subjectContainer: {
    flex: 1,
  },
  subjectText: {
    ...FONTS.h4,
    color: COLORS.text,
    marginBottom: 4,
  },
  teacherText: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
    backgroundColor: COLORS.lightGray2,
    borderRadius: SIZES.radius / 2,
  },
  timeText: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginLeft: 4,
  },
  classFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginLeft: 4,
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
    borderRadius: SIZES.radius / 2,
  },
  joinButtonText: {
    ...FONTS.body4,
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  resourcesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
    borderRadius: SIZES.radius / 2,
  },
  resourcesButtonText: {
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

export default Schedule; 