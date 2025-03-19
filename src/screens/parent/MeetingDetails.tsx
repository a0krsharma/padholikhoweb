import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../../constants';
import firestore from '@react-native-firebase/firestore';
import { AuthService } from '../../services/auth';

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
  location?: string;
  duration?: number; // in minutes
  feedback?: string;
  teacherNotes?: string;
}

const statusColors = {
  pending: COLORS.warning,
  confirmed: COLORS.success,
  completed: COLORS.gray,
  cancelled: COLORS.error,
};

const MeetingDetails = ({ route, navigation }: any) => {
  const { meetingId } = route.params;
  const [meeting, setMeeting] = useState<MeetingType | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleReason, setRescheduleReason] = useState('');
  const [submittingReschedule, setSubmittingReschedule] = useState(false);

  useEffect(() => {
    fetchMeetingDetails();
  }, [meetingId]);

  const fetchMeetingDetails = async () => {
    try {
      setLoading(true);
      const userId = AuthService.getCurrentUser()?.uid;
      if (!userId) return;

      // In a real app, this would fetch the meeting details from Firestore
      // For now, we'll simulate this with mock data
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // This would be a Firestore query in a real app
      const mockMeeting: MeetingType = {
        id: meetingId,
        teacherId: 'teacher1',
        teacherName: 'Amit Kumar',
        subject: 'Mathematics',
        date: new Date(2023, 5, 15, 14, 30),
        status: 'confirmed',
        childId: 'child1',
        childName: 'Rahul Sharma',
        notes: 'Discuss recent test performance and homework habits.',
        location: 'Online (Google Meet)',
        duration: 30,
        teacherNotes: 'Will review performance in the recent algebra test and discuss strategies for improvement.',
      };
      
      setMeeting(mockMeeting);
    } catch (error) {
      console.error('Error fetching meeting details:', error);
      Alert.alert('Error', 'Failed to load meeting details');
    } finally {
      setLoading(false);
    }
  };

  const formatMeetingTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatMeetingDate = (date: Date) => {
    return date.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleJoinMeeting = () => {
    // In a real app, this would open the meeting platform (Zoom, Google Meet, etc.)
    Alert.alert(
      'Join Meeting',
      'Launching meeting room...',
      [{ text: 'OK' }]
    );
  };

  const handleSubmitFeedback = () => {
    if (!feedback.trim()) {
      Alert.alert('Error', 'Please enter your feedback');
      return;
    }

    setSubmittingFeedback(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would update the meeting document in Firestore
      if (meeting) {
        const updatedMeeting = { ...meeting, feedback };
        setMeeting(updatedMeeting);
      }
      
      setSubmittingFeedback(false);
      setShowFeedbackModal(false);
      setFeedback('');
      
      Alert.alert('Success', 'Feedback submitted successfully');
    }, 1000);
  };

  const handleRequestReschedule = () => {
    if (!rescheduleReason.trim()) {
      Alert.alert('Error', 'Please provide a reason for rescheduling');
      return;
    }

    setSubmittingReschedule(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would create a reschedule request in Firestore
      setSubmittingReschedule(false);
      setShowRescheduleModal(false);
      setRescheduleReason('');
      
      Alert.alert(
        'Request Sent',
        'Your reschedule request has been sent to the teacher. You will be notified once they respond.',
        [{ text: 'OK' }]
      );
    }, 1000);
  };

  const renderFeedbackModal = () => (
    <Modal
      visible={showFeedbackModal}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Submit Feedback</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowFeedbackModal(false)}
            >
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalBody}>
            <Text style={styles.modalText}>
              Please provide your feedback about the meeting with {meeting?.teacherName}:
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your feedback here..."
              value={feedback}
              onChangeText={setFeedback}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>
          
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[styles.modalButton, submittingFeedback && styles.disabledButton]}
              onPress={handleSubmitFeedback}
              disabled={submittingFeedback}
            >
              {submittingFeedback ? (
                <ActivityIndicator color={COLORS.white} size="small" />
              ) : (
                <Text style={styles.modalButtonText}>Submit Feedback</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderRescheduleModal = () => (
    <Modal
      visible={showRescheduleModal}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Request Reschedule</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowRescheduleModal(false)}
            >
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalBody}>
            <Text style={styles.modalText}>
              Please provide a reason for rescheduling the meeting with {meeting?.teacherName}:
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter reason for reschedule..."
              value={rescheduleReason}
              onChangeText={setRescheduleReason}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
          
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[styles.modalButton, submittingReschedule && styles.disabledButton]}
              onPress={handleRequestReschedule}
              disabled={submittingReschedule}
            >
              {submittingReschedule ? (
                <ActivityIndicator color={COLORS.white} size="small" />
              ) : (
                <Text style={styles.modalButtonText}>Request Reschedule</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Meeting Details</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (!meeting) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Meeting Details</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={80} color={COLORS.error} />
          <Text style={styles.errorTitle}>Meeting Not Found</Text>
          <Text style={styles.errorText}>
            The meeting you are looking for does not exist or has been deleted.
          </Text>
          <TouchableOpacity
            style={styles.goBackButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.goBackButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const isPast = meeting.date < new Date();
  const isActive = meeting.status === 'confirmed' || meeting.status === 'pending';
  const canJoin = meeting.status === 'confirmed' && 
    Math.abs(new Date().getTime() - meeting.date.getTime()) < 30 * 60 * 1000; // Can join within 30 minutes of scheduled time

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meeting Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Status Badge */}
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, { backgroundColor: statusColors[meeting.status] }]}>
            <Text style={styles.statusText}>
              {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
            </Text>
          </View>
        </View>

        {/* Meeting Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Meeting with {meeting.teacherName}</Text>
          <Text style={styles.subjectText}>{meeting.subject}</Text>
          
          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Ionicons name="calendar-outline" size={20} color={COLORS.primary} />
              <Text style={styles.detailText}>{formatMeetingDate(meeting.date)}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="time-outline" size={20} color={COLORS.primary} />
              <Text style={styles.detailText}>{formatMeetingTime(meeting.date)}</Text>
            </View>
          </View>
          
          {meeting.duration && (
            <View style={styles.detailRow}>
              <Ionicons name="hourglass-outline" size={20} color={COLORS.gray} />
              <Text style={styles.detailText}>Duration: {meeting.duration} minutes</Text>
            </View>
          )}
          
          {meeting.location && (
            <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={20} color={COLORS.gray} />
              <Text style={styles.detailText}>Location: {meeting.location}</Text>
            </View>
          )}
          
          {meeting.childName && (
            <View style={styles.detailRow}>
              <Ionicons name="person-outline" size={20} color={COLORS.gray} />
              <Text style={styles.detailText}>For: {meeting.childName}</Text>
            </View>
          )}
        </View>

        {/* Meeting Notes */}
        {meeting.notes && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Meeting Notes</Text>
            <Text style={styles.notesText}>{meeting.notes}</Text>
          </View>
        )}

        {/* Teacher's Notes */}
        {meeting.teacherNotes && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Teacher's Notes</Text>
            <Text style={styles.notesText}>{meeting.teacherNotes}</Text>
          </View>
        )}

        {/* Feedback */}
        {meeting.feedback ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Your Feedback</Text>
            <Text style={styles.notesText}>{meeting.feedback}</Text>
          </View>
        ) : meeting.status === 'completed' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Feedback</Text>
            <Text style={styles.promptText}>
              Please share your feedback about this meeting.
            </Text>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setShowFeedbackModal(true)}
            >
              <Text style={styles.actionButtonText}>Submit Feedback</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          {canJoin && (
            <TouchableOpacity
              style={[styles.mainActionButton, styles.joinButton]}
              onPress={handleJoinMeeting}
            >
              <Ionicons name="videocam" size={20} color={COLORS.white} />
              <Text style={styles.mainActionButtonText}>Join Meeting</Text>
            </TouchableOpacity>
          )}
          
          {isActive && !isPast && (
            <>
              <TouchableOpacity
                style={[styles.actionButton, styles.rescheduleButton]}
                onPress={() => setShowRescheduleModal(true)}
              >
                <Ionicons name="calendar" size={18} color={COLORS.warning} />
                <Text style={[styles.actionButtonText, { color: COLORS.warning }]}>
                  Request Reschedule
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.actionButton, styles.cancelButton]}
                onPress={() => Alert.alert(
                  'Cancel Meeting',
                  'Are you sure you want to cancel this meeting?',
                  [
                    { text: 'No', style: 'cancel' },
                    { 
                      text: 'Yes', 
                      style: 'destructive',
                      onPress: () => {
                        // In a real app, this would update the meeting status in Firestore
                        setMeeting({ ...meeting, status: 'cancelled' });
                        Alert.alert('Success', 'Meeting cancelled successfully');
                      }
                    },
                  ]
                )}
              >
                <Ionicons name="close-circle" size={18} color={COLORS.error} />
                <Text style={[styles.actionButtonText, { color: COLORS.error }]}>
                  Cancel Meeting
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      {/* Modals */}
      {renderFeedbackModal()}
      {renderRescheduleModal()}
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
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.padding * 2,
  },
  errorTitle: {
    ...FONTS.h2,
    color: COLORS.text,
    marginTop: SIZES.padding * 2,
    marginBottom: SIZES.padding,
  },
  errorText: {
    ...FONTS.body3,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: SIZES.padding * 2,
  },
  goBackButton: {
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
  },
  goBackButtonText: {
    ...FONTS.body3,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  statusContainer: {
    alignItems: 'center',
    paddingVertical: SIZES.padding,
  },
  statusBadge: {
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding / 2,
    borderRadius: SIZES.radius,
  },
  statusText: {
    ...FONTS.h4,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 2,
    marginHorizontal: SIZES.padding * 2,
    marginBottom: SIZES.padding,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    ...FONTS.h3,
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  subjectText: {
    ...FONTS.body3,
    color: COLORS.gray,
    marginBottom: SIZES.padding,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.padding / 2,
  },
  detailText: {
    ...FONTS.body3,
    color: COLORS.text,
    marginLeft: 8,
  },
  notesText: {
    ...FONTS.body3,
    color: COLORS.text,
    lineHeight: 22,
  },
  promptText: {
    ...FONTS.body3,
    color: COLORS.gray,
    marginBottom: SIZES.padding,
  },
  actionContainer: {
    padding: SIZES.padding * 2,
  },
  mainActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding,
  },
  joinButton: {
    backgroundColor: COLORS.success,
  },
  mainActionButtonText: {
    ...FONTS.body3,
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding,
    backgroundColor: COLORS.lightGray,
  },
  rescheduleButton: {
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
  },
  cancelButton: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
  },
  actionButtonText: {
    ...FONTS.body3,
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: SIZES.padding * 2,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
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
    ...FONTS.h3,
    color: COLORS.text,
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: SIZES.padding * 2,
  },
  modalText: {
    ...FONTS.body3,
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius / 2,
    padding: SIZES.padding,
    ...FONTS.body3,
    minHeight: 120,
  },
  modalFooter: {
    padding: SIZES.padding * 2,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  modalButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  modalButtonText: {
    ...FONTS.body3,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default MeetingDetails; 