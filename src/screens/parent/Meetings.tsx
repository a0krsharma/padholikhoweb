import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../../constants';
import { AuthService } from '../../services/auth';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';

interface MeetingType {
  id: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  date: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  childId?: string;
  childName?: string;
}

interface TeacherType {
  id: string;
  name: string;
  photoURL?: string;
  subjects: string[];
}

const statusColors = {
  pending: COLORS.warning,
  confirmed: COLORS.success,
  completed: COLORS.gray,
  cancelled: COLORS.error,
};

const Meetings = ({ navigation }: any) => {
  const [meetings, setMeetings] = useState<MeetingType[]>([]);
  const [loading, setLoading] = useState(true);
  const [children, setChildren] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<TeacherType[]>([]);
  
  // Schedule meeting modal state
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherType | null>(null);
  const [selectedChild, setSelectedChild] = useState<any | null>(null);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [meetingDate, setMeetingDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [meetingNotes, setMeetingNotes] = useState('');
  const [isScheduling, setIsScheduling] = useState(false);

  useEffect(() => {
    fetchMeetings();
    fetchChildren();
    fetchTeachers();
    
    // Set up a listener for when we come back to this screen
    const unsubscribe = navigation.addListener('focus', () => {
      fetchMeetings();
    });
    
    return unsubscribe;
  }, [navigation]);

  const fetchMeetings = async () => {
    try {
      setLoading(true);
      const userId = AuthService.getCurrentUser()?.uid;
      if (!userId) return;

      // In a real app, this would fetch the meetings from Firestore
      // For now, we'll simulate this with mock data
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockMeetings: MeetingType[] = [
        {
          id: '1',
          teacherId: 'teacher1',
          teacherName: 'Amit Kumar',
          subject: 'Mathematics',
          date: new Date(2023, 5, 15, 14, 30),
          status: 'confirmed',
          childId: 'child1',
          childName: 'Rahul Sharma',
          notes: 'Discuss recent test performance and homework habits.',
        },
        {
          id: '2',
          teacherId: 'teacher2',
          teacherName: 'Priya Singh',
          subject: 'Science',
          date: new Date(2023, 5, 20, 16, 0),
          status: 'pending',
          childId: 'child1',
          childName: 'Rahul Sharma',
          notes: 'Mid-term review and project planning.',
        },
        {
          id: '3',
          teacherId: 'teacher3',
          teacherName: 'Rajesh Verma',
          subject: 'English',
          date: new Date(2023, 5, 10, 13, 15),
          status: 'completed',
          childId: 'child2',
          childName: 'Anjali Sharma',
          notes: 'Reading progress review.',
        },
        {
          id: '4',
          teacherId: 'teacher4',
          teacherName: 'Deepa Gupta',
          subject: 'History',
          date: new Date(2023, 5, 8, 15, 45),
          status: 'cancelled',
          childId: 'child2',
          childName: 'Anjali Sharma',
        },
      ];
      
      setMeetings(mockMeetings);
    } catch (error) {
      console.error('Error fetching meetings:', error);
      Alert.alert('Error', 'Failed to load meetings');
    } finally {
      setLoading(false);
    }
  };

  const fetchChildren = async () => {
    try {
      const userId = AuthService.getCurrentUser()?.uid;
      if (!userId) return;
      
      // In a real app, this would fetch children from Firestore
      // For now, we'll simulate this with mock data
      const mockChildren = [
        { id: 'child1', name: 'Rahul Sharma', grade: '7th Grade' },
        { id: 'child2', name: 'Anjali Sharma', grade: '5th Grade' },
      ];
      
      setChildren(mockChildren);
    } catch (error) {
      console.error('Error fetching children:', error);
      Alert.alert('Error', 'Failed to load children data');
    }
  };

  const fetchTeachers = async () => {
    try {
      // In a real app, this would fetch teachers from Firestore
      // For now, we'll simulate this with mock data
      const mockTeachers: TeacherType[] = [
        { id: 'teacher1', name: 'Amit Kumar', subjects: ['Mathematics', 'Physics'] },
        { id: 'teacher2', name: 'Priya Singh', subjects: ['Science', 'Biology'] },
        { id: 'teacher3', name: 'Rajesh Verma', subjects: ['English', 'Hindi'] },
        { id: 'teacher4', name: 'Deepa Gupta', subjects: ['History', 'Geography'] },
        { id: 'teacher5', name: 'Sanjay Patel', subjects: ['Computer Science', 'Mathematics'] },
      ];
      
      setTeachers(mockTeachers);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      Alert.alert('Error', 'Failed to load teachers data');
    }
  };

  const handleScheduleMeeting = () => {
    if (!selectedTeacher) {
      Alert.alert('Error', 'Please select a teacher');
      return;
    }
    
    if (!selectedChild) {
      Alert.alert('Error', 'Please select a child');
      return;
    }
    
    if (!selectedSubject) {
      Alert.alert('Error', 'Please select a subject');
      return;
    }

    setIsScheduling(true);
    
    // Simulate API call
    setTimeout(() => {
      const newMeeting: MeetingType = {
        id: Math.random().toString(36).substring(7),
        teacherId: selectedTeacher.id,
        teacherName: selectedTeacher.name,
        subject: selectedSubject,
        date: meetingDate,
        status: 'pending',
        childId: selectedChild.id,
        childName: selectedChild.name,
        notes: meetingNotes,
      };
      
      setMeetings([newMeeting, ...meetings]);
      setIsScheduling(false);
      setShowScheduleModal(false);
      
      // Reset form
      setSelectedTeacher(null);
      setSelectedChild(null);
      setSelectedSubject('');
      setMeetingDate(new Date());
      setMeetingNotes('');
      
      Alert.alert('Success', 'Meeting scheduled successfully');
    }, 1500);
  };

  const handleCancelMeeting = (meetingId: string) => {
    Alert.alert(
      'Cancel Meeting',
      'Are you sure you want to cancel this meeting?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            // Update meeting status in state
            setMeetings(meetings.map(meeting => 
              meeting.id === meetingId 
                ? { ...meeting, status: 'cancelled' } 
                : meeting
            ));
            
            // In a real app, we would also update the status in Firestore
            Alert.alert('Success', 'Meeting cancelled successfully');
          },
        },
      ]
    );
  };

  const formatMeetingTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatMeetingDate = (date: Date) => {
    return date.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const renderMeetingItem = ({ item }: { item: MeetingType }) => {
    const isPast = item.date < new Date();
    const isActive = item.status === 'confirmed' || item.status === 'pending';
    
    return (
      <View style={styles.meetingCard}>
        <View style={styles.meetingHeader}>
          <View style={styles.meetingHeaderLeft}>
            <Text style={styles.teacherName}>{item.teacherName}</Text>
            <Text style={styles.subject}>{item.subject}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusColors[item.status] }]}>
            <Text style={styles.statusText}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Text>
          </View>
        </View>
        
        <View style={styles.meetingBody}>
          <View style={styles.meetingDetail}>
            <Ionicons name="calendar-outline" size={16} color={COLORS.gray} />
            <Text style={styles.meetingDetailText}>{formatMeetingDate(item.date)}</Text>
          </View>
          <View style={styles.meetingDetail}>
            <Ionicons name="time-outline" size={16} color={COLORS.gray} />
            <Text style={styles.meetingDetailText}>{formatMeetingTime(item.date)}</Text>
          </View>
          {item.childName && (
            <View style={styles.meetingDetail}>
              <Ionicons name="person-outline" size={16} color={COLORS.gray} />
              <Text style={styles.meetingDetailText}>For: {item.childName}</Text>
            </View>
          )}
          {item.notes && (
            <View style={styles.meetingDetail}>
              <Ionicons name="document-text-outline" size={16} color={COLORS.gray} />
              <Text style={styles.meetingDetailText}>{item.notes}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.meetingFooter}>
          {isActive && !isPast && (
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => handleCancelMeeting(item.id)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={styles.viewDetailsButton}
            onPress={() => navigation.navigate('MeetingDetails', { meetingId: item.id })}
          >
            <Text style={styles.viewDetailsButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderScheduleMeetingModal = () => (
    <Modal
      visible={showScheduleModal}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Schedule Meeting</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowScheduleModal(false)}
            >
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalBody}>
            {/* Child Selection */}
            <Text style={styles.inputLabel}>Select Child</Text>
            <View style={styles.selectionContainer}>
              {children.map(child => (
                <TouchableOpacity
                  key={child.id}
                  style={[
                    styles.selectionItem,
                    selectedChild?.id === child.id && styles.selectedItem,
                  ]}
                  onPress={() => setSelectedChild(child)}
                >
                  <Text 
                    style={[
                      styles.selectionText,
                      selectedChild?.id === child.id && styles.selectedText,
                    ]}
                  >
                    {child.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Teacher Selection */}
            <Text style={styles.inputLabel}>Select Teacher</Text>
            <View style={styles.selectionContainer}>
              {teachers.map(teacher => (
                <TouchableOpacity
                  key={teacher.id}
                  style={[
                    styles.selectionItem,
                    selectedTeacher?.id === teacher.id && styles.selectedItem,
                  ]}
                  onPress={() => {
                    setSelectedTeacher(teacher);
                    setSelectedSubject(''); // Reset subject when teacher changes
                  }}
                >
                  <Text 
                    style={[
                      styles.selectionText,
                      selectedTeacher?.id === teacher.id && styles.selectedText,
                    ]}
                  >
                    {teacher.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Subject Selection */}
            {selectedTeacher && (
              <>
                <Text style={styles.inputLabel}>Select Subject</Text>
                <View style={styles.selectionContainer}>
                  {selectedTeacher.subjects.map(subject => (
                    <TouchableOpacity
                      key={subject}
                      style={[
                        styles.selectionItem,
                        selectedSubject === subject && styles.selectedItem,
                      ]}
                      onPress={() => setSelectedSubject(subject)}
                    >
                      <Text 
                        style={[
                          styles.selectionText,
                          selectedSubject === subject && styles.selectedText,
                        ]}
                      >
                        {subject}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
            
            {/* Date & Time Selection */}
            <Text style={styles.inputLabel}>Select Date & Time</Text>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="calendar-outline" size={20} color={COLORS.primary} />
              <Text style={styles.datePickerButtonText}>
                {meetingDate.toLocaleString([], {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </TouchableOpacity>
            
            {showDatePicker && (
              <DateTimePicker
                value={meetingDate}
                mode="datetime"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setMeetingDate(selectedDate);
                  }
                }}
              />
            )}
            
            {/* Meeting Notes */}
            <Text style={styles.inputLabel}>Notes (Optional)</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Add notes about the meeting"
              value={meetingNotes}
              onChangeText={setMeetingNotes}
              multiline
              textAlignVertical="top"
            />
          </ScrollView>
          
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[styles.scheduleButton, isScheduling && styles.disabledButton]}
              onPress={handleScheduleMeeting}
              disabled={isScheduling || !selectedTeacher || !selectedChild || !selectedSubject}
            >
              {isScheduling ? (
                <ActivityIndicator color={COLORS.white} size="small" />
              ) : (
                <Text style={styles.scheduleButtonText}>Schedule Meeting</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

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
        <Text style={styles.headerTitle}>Parent-Teacher Meetings</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <>
          <FlatList
            data={meetings}
            renderItem={renderMeetingItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.meetingsList}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="calendar-outline" size={80} color={COLORS.lightGray} />
                <Text style={styles.emptyTitle}>No Meetings</Text>
                <Text style={styles.emptyText}>
                  You don't have any scheduled meetings with teachers. Click the button below to schedule a new meeting.
                </Text>
              </View>
            }
          />
          
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => setShowScheduleModal(true)}
          >
            <Ionicons name="add" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </>
      )}

      {/* Schedule Meeting Modal */}
      {renderScheduleMeetingModal()}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  meetingsList: {
    padding: SIZES.padding * 2,
    paddingBottom: SIZES.padding * 4,
  },
  meetingCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  meetingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: SIZES.padding,
  },
  meetingHeaderLeft: {
    flex: 1,
  },
  teacherName: {
    ...FONTS.h3,
    color: COLORS.text,
    marginBottom: 4,
  },
  subject: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  statusBadge: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: 4,
    borderRadius: SIZES.radius / 2,
  },
  statusText: {
    ...FONTS.body5,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  meetingBody: {
    marginBottom: SIZES.padding,
  },
  meetingDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  meetingDetailText: {
    ...FONTS.body4,
    color: COLORS.text,
    marginLeft: 8,
  },
  meetingFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SIZES.padding,
  },
  cancelButton: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
    borderRadius: SIZES.radius / 2,
    borderWidth: 1,
    borderColor: COLORS.error,
    marginRight: 8,
  },
  cancelButtonText: {
    ...FONTS.body4,
    color: COLORS.error,
  },
  viewDetailsButton: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
    borderRadius: SIZES.radius / 2,
    backgroundColor: COLORS.primary,
  },
  viewDetailsButtonText: {
    ...FONTS.body4,
    color: COLORS.white,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.padding * 4,
  },
  emptyTitle: {
    ...FONTS.h3,
    color: COLORS.text,
    marginTop: SIZES.padding * 2,
    marginBottom: SIZES.padding,
  },
  emptyText: {
    ...FONTS.body4,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: SIZES.padding * 2,
    paddingHorizontal: SIZES.padding * 2,
  },
  floatingButton: {
    position: 'absolute',
    bottom: SIZES.padding * 2,
    right: SIZES.padding * 2,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    height: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.padding * 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    ...FONTS.h2,
    color: COLORS.text,
  },
  closeButton: {
    padding: 8,
  },
  modalBody: {
    padding: SIZES.padding * 2,
    maxHeight: '70%',
  },
  inputLabel: {
    ...FONTS.body3,
    color: COLORS.text,
    marginBottom: SIZES.padding,
    marginTop: SIZES.padding,
  },
  selectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectionItem: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
    borderRadius: SIZES.radius / 2,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedItem: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  selectionText: {
    ...FONTS.body4,
    color: COLORS.text,
  },
  selectedText: {
    color: COLORS.white,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius / 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  datePickerButtonText: {
    ...FONTS.body4,
    color: COLORS.text,
    marginLeft: 8,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius / 2,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    height: 100,
    ...FONTS.body4,
  },
  modalFooter: {
    padding: SIZES.padding * 2,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  scheduleButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  scheduleButtonText: {
    ...FONTS.body3,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default Meetings; 