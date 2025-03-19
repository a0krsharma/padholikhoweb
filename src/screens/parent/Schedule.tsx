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
import { COLORS, FONTS, SIZES, IMAGES } from '../../constants';

const Schedule = ({ navigation }: any) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedChild, setSelectedChild] = useState('all');
  
  // Mock children data
  const children = [
    { id: 'all', name: 'All Children' },
    { id: '1', name: 'Arjun Kumar' },
    { id: '2', name: 'Neha Kumar' },
  ];
  
  // Mock schedule data
  const scheduleData = [
    {
      id: '1',
      childId: '1',
      childName: 'Arjun Kumar',
      subject: 'Mathematics',
      topic: 'Calculus - Derivatives',
      teacherName: 'Dr. Sharma',
      teacherImage: IMAGES.teacher1,
      date: new Date(selectedDate),
      startTime: '09:00 AM',
      endTime: '10:30 AM',
      status: 'upcoming', // upcoming, ongoing, completed, cancelled
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      notes: 'Please review the previous class notes on integration before joining.',
    },
    {
      id: '2',
      childId: '1',
      childName: 'Arjun Kumar',
      subject: 'Physics',
      topic: 'Kinematics',
      teacherName: 'Mrs. Patel',
      teacherImage: IMAGES.teacher2,
      date: new Date(selectedDate),
      startTime: '11:00 AM',
      endTime: '12:30 PM',
      status: 'upcoming',
      meetingLink: 'https://meet.google.com/klm-nopq-rst',
      notes: 'Bring your doubts related to numerical problems.',
    },
    {
      id: '3',
      childId: '2',
      childName: 'Neha Kumar',
      subject: 'English',
      topic: 'Creative Writing',
      teacherName: 'Mr. Singh',
      teacherImage: IMAGES.teacher3,
      date: new Date(selectedDate),
      startTime: '02:00 PM',
      endTime: '03:30 PM',
      status: 'upcoming',
      meetingLink: 'https://meet.google.com/uvw-xyz-123',
      notes: 'Prepare a draft story on any topic of your choice.',
    },
    {
      id: '4',
      childId: '2',
      childName: 'Neha Kumar',
      subject: 'Science',
      topic: 'Human Body Systems',
      teacherName: 'Dr. Gupta',
      teacherImage: IMAGES.teacher4,
      date: new Date(selectedDate),
      startTime: '04:00 PM',
      endTime: '05:30 PM',
      status: 'upcoming',
      meetingLink: 'https://meet.google.com/456-789-abc',
      notes: 'Review the diagrams of circulatory and respiratory systems.',
    },
  ];

  // Filter schedule based on selected child
  const filteredSchedule = scheduleData.filter(item => 
    selectedChild === 'all' || item.childId === selectedChild
  );

  // Generate an array of dates for the date selector
  const getDates = () => {
    const dates = [];
    for (let i = -3; i <= 10; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const renderDateItem = ({ item }: { item: Date }) => {
    const isSelected = selectedDate.getDate() === item.getDate() &&
      selectedDate.getMonth() === item.getMonth() &&
      selectedDate.getFullYear() === item.getFullYear();
      
    return (
      <TouchableOpacity
        style={[
          styles.dateItem,
          isSelected && styles.selectedDateItem,
        ]}
        onPress={() => setSelectedDate(item)}
      >
        <Text 
          style={[
            styles.dateDay, 
            isSelected && styles.selectedDateText,
            isToday(item) && styles.todayText
          ]}
        >
          {item.toLocaleDateString('en-US', { weekday: 'short' })}
        </Text>
        <Text 
          style={[
            styles.dateNumber, 
            isSelected && styles.selectedDateText,
            isToday(item) && styles.todayText
          ]}
        >
          {item.getDate()}
        </Text>
        {isToday(item) && <View style={styles.todayDot} />}
      </TouchableOpacity>
    );
  };

  const renderChildSelector = () => (
    <View style={styles.childSelectorContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.childSelectorScroll}
      >
        {children.map(child => (
          <TouchableOpacity
            key={child.id}
            style={[
              styles.childItem,
              selectedChild === child.id && styles.selectedChildItem
            ]}
            onPress={() => setSelectedChild(child.id)}
          >
            <Text 
              style={[
                styles.childName,
                selectedChild === child.id && styles.selectedChildName
              ]}
            >
              {child.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'upcoming':
        return COLORS.primary;
      case 'ongoing':
        return COLORS.green;
      case 'completed':
        return COLORS.gray;
      case 'cancelled':
        return COLORS.red;
      default:
        return COLORS.primary;
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'upcoming':
        return 'Upcoming';
      case 'ongoing':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Upcoming';
    }
  };

  const renderScheduleItem = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.scheduleCard}
      onPress={() => navigation.navigate('ClassDetails', { classId: item.id })}
    >
      <View style={styles.scheduleCardHeader}>
        <View style={styles.scheduleInfo}>
          <Text style={styles.scheduleTime}>{item.startTime} - {item.endTime}</Text>
          <Text style={styles.scheduleChild}>{item.childName}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>
      
      <View style={styles.subjectContainer}>
        <View style={styles.subjectDot} />
        <Text style={styles.subjectName}>{item.subject}</Text>
      </View>
      
      <Text style={styles.topicName}>{item.topic}</Text>
      
      <View style={styles.teacherRow}>
        <View style={styles.teacherInfo}>
          <Text style={styles.teacherLabel}>Teacher:</Text>
          <Text style={styles.teacherName}>{item.teacherName}</Text>
        </View>
        
        <View style={styles.actionButtons}>
          {item.status === 'upcoming' && (
            <TouchableOpacity 
              style={styles.joinButton}
              onPress={() => navigation.navigate('VideoCall', { meetingLink: item.meetingLink })}
            >
              <Text style={styles.joinButtonText}>Join</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity 
            style={styles.detailsButton}
            onPress={() => navigation.navigate('ClassDetails', { classId: item.id })}
          >
            <Ionicons name="information-circle-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
      
      {item.notes && (
        <View style={styles.notesContainer}>
          <Text style={styles.notesLabel}>Notes:</Text>
          <Text style={styles.notesText}>{item.notes}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderEmptySchedule = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="calendar-outline" size={60} color={COLORS.lightGray} />
      <Text style={styles.emptyTitle}>No Classes Scheduled</Text>
      <Text style={styles.emptyText}>
        There are no classes scheduled for the selected date or child.
      </Text>
      <TouchableOpacity 
        style={styles.bookButton}
        onPress={() => navigation.navigate('BookClass')}
      >
        <Text style={styles.bookButtonText}>Book a Class</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.dateSelector}>
        <FlatList
          data={getDates()}
          renderItem={renderDateItem}
          keyExtractor={(item) => item.toISOString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dateSelectorContent}
        />
      </View>

      {renderChildSelector()}

      <View style={styles.scheduleContainer}>
        <View style={styles.scheduleHeader}>
          <Text style={styles.scheduleDate}>
            {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </Text>
          <TouchableOpacity 
            style={styles.calendarButton}
            onPress={() => navigation.navigate('Calendar')}
          >
            <Ionicons name="calendar-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        
        {filteredSchedule.length > 0 ? (
          <FlatList
            data={filteredSchedule}
            renderItem={renderScheduleItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.scheduleListContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          renderEmptySchedule()
        )}
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
    paddingVertical: SIZES.padding * 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.text,
  },
  dateSelector: {
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dateSelectorContent: {
    paddingHorizontal: SIZES.padding,
  },
  dateItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 70,
    borderRadius: SIZES.radius,
    marginHorizontal: 5,
    backgroundColor: COLORS.lightGray2,
  },
  selectedDateItem: {
    backgroundColor: COLORS.primary,
  },
  dateDay: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  dateNumber: {
    ...FONTS.h3,
    color: COLORS.text,
    marginTop: 5,
  },
  selectedDateText: {
    color: COLORS.white,
  },
  todayText: {
    color: COLORS.primary,
  },
  todayDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginTop: 4,
  },
  childSelectorContainer: {
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  childSelectorScroll: {
    paddingHorizontal: SIZES.padding * 2,
  },
  childItem: {
    paddingVertical: SIZES.padding / 2,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.radius,
    marginRight: SIZES.padding,
    backgroundColor: COLORS.lightGray2,
  },
  selectedChildItem: {
    backgroundColor: COLORS.primary,
  },
  childName: {
    ...FONTS.body3,
    color: COLORS.text,
  },
  selectedChildName: {
    color: COLORS.white,
  },
  scheduleContainer: {
    flex: 1,
    paddingHorizontal: SIZES.padding * 2,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.padding,
  },
  scheduleDate: {
    ...FONTS.h4,
    color: COLORS.text,
  },
  calendarButton: {
    padding: SIZES.padding,
  },
  scheduleListContent: {
    paddingBottom: SIZES.padding * 2,
  },
  scheduleCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    marginBottom: SIZES.padding,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  scheduleCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SIZES.padding,
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleTime: {
    ...FONTS.body3,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  scheduleChild: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginTop: 2,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: SIZES.radius,
  },
  statusText: {
    ...FONTS.body5,
    fontWeight: 'bold',
  },
  subjectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  subjectDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginRight: 8,
  },
  subjectName: {
    ...FONTS.body3,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  topicName: {
    ...FONTS.body4,
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  teacherRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  teacherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teacherLabel: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginRight: 4,
  },
  teacherName: {
    ...FONTS.body4,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: SIZES.radius,
    marginRight: 10,
  },
  joinButtonText: {
    ...FONTS.body4,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  detailsButton: {
    padding: 5,
  },
  notesContainer: {
    backgroundColor: COLORS.lightGray2,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginTop: 5,
  },
  notesLabel: {
    ...FONTS.body4,
    color: COLORS.text,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  notesText: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding * 2,
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
    marginBottom: SIZES.padding * 2,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    borderRadius: SIZES.radius,
  },
  bookButtonText: {
    ...FONTS.body3,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default Schedule; 