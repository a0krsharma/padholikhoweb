import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  SafeAreaView,
  TextInput,
  Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants';

// Date and time picker components would typically be imported here
// import DateTimePicker from '@react-native-community/datetimepicker';

const BookSession = ({ navigation, route }: any) => {
  const { teacher } = route.params;
  
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('60');
  const [topic, setTopic] = useState('');
  const [notes, setNotes] = useState('');

  const durations = ['30', '45', '60', '90', '120'];

  const handleBooking = () => {
    // Validate inputs
    if (!date || !time || !duration || !topic) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    // Mock booking confirmation
    Alert.alert(
      'Booking Confirmed',
      `Your session with ${teacher.name} has been booked for ${date} at ${time}.`,
      [
        { 
          text: 'View Sessions', 
          onPress: () => navigation.navigate('Main')
        },
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
          style: 'cancel'
        }
      ]
    );
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
        <Text style={styles.headerTitle}>Book a Session</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.teacherInfo}>
          <View style={styles.teacherImagePlaceholder}>
            <Ionicons name="person" size={40} color={COLORS.white} />
          </View>
          <View>
            <Text style={styles.teacherName}>{teacher.name}</Text>
            <Text style={styles.teacherSubject}>{teacher.subject}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color={COLORS.yellow} />
              <Text style={styles.rating}>{teacher.rating}</Text>
            </View>
          </View>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Session Details</Text>
          
          {/* Date Selection */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Date</Text>
            <TouchableOpacity style={styles.datePickerButton}>
              <TextInput
                style={styles.input}
                placeholder="Select date"
                placeholderTextColor={COLORS.placeholder}
                value={date}
                onChangeText={setDate}
              />
              <Ionicons name="calendar" size={24} color={COLORS.primary} style={styles.inputIcon} />
            </TouchableOpacity>
          </View>

          {/* Time Selection */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Time</Text>
            <TouchableOpacity style={styles.datePickerButton}>
              <TextInput
                style={styles.input}
                placeholder="Select time"
                placeholderTextColor={COLORS.placeholder}
                value={time}
                onChangeText={setTime}
              />
              <Ionicons name="time" size={24} color={COLORS.primary} style={styles.inputIcon} />
            </TouchableOpacity>
          </View>

          {/* Duration Selection */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Duration (minutes)</Text>
            <View style={styles.durationContainer}>
              {durations.map((item) => (
                <TouchableOpacity 
                  key={item}
                  style={[
                    styles.durationButton,
                    duration === item && styles.durationButtonActive
                  ]}
                  onPress={() => setDuration(item)}
                >
                  <Text 
                    style={[
                      styles.durationText,
                      duration === item && styles.durationTextActive
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Topic */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Topic</Text>
            <TextInput
              style={styles.input}
              placeholder="What would you like to learn?"
              placeholderTextColor={COLORS.placeholder}
              value={topic}
              onChangeText={setTopic}
            />
          </View>

          {/* Notes */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Additional Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Any specific questions or areas you'd like to focus on?"
              placeholderTextColor={COLORS.placeholder}
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Session Fee</Text>
            <Text style={styles.paymentValue}>₹500</Text>
          </View>
          
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Platform Fee</Text>
            <Text style={styles.paymentValue}>₹50</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.paymentRow}>
            <Text style={[styles.paymentLabel, styles.totalLabel]}>Total</Text>
            <Text style={[styles.paymentValue, styles.totalValue]}>₹550</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.bookButton}
          onPress={handleBooking}
        >
          <Text style={styles.bookButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    marginRight: SIZES.padding,
  },
  headerTitle: {
    ...FONTS.h3,
    color: COLORS.text,
  },
  content: {
    flex: 1,
  },
  teacherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding * 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  teacherImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding * 2,
  },
  teacherName: {
    ...FONTS.h4,
    color: COLORS.text,
  },
  teacherSubject: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    ...FONTS.body4,
    color: COLORS.text,
    marginLeft: 4,
    fontWeight: 'bold',
  },
  formSection: {
    padding: SIZES.padding * 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.text,
    marginBottom: SIZES.padding * 2,
  },
  inputContainer: {
    marginBottom: SIZES.padding * 2,
  },
  inputLabel: {
    ...FONTS.body4,
    color: COLORS.text,
    marginBottom: SIZES.padding / 2,
  },
  input: {
    height: 50,
    backgroundColor: COLORS.input,
    borderRadius: SIZES.radius / 2,
    paddingHorizontal: SIZES.padding,
    ...FONTS.body3,
    color: COLORS.text,
  },
  textArea: {
    height: 100,
    paddingTop: SIZES.padding,
  },
  datePickerButton: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    right: SIZES.padding,
    top: 13,
  },
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  durationButton: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 1.5,
    backgroundColor: COLORS.input,
    borderRadius: SIZES.radius / 2,
    alignItems: 'center',
  },
  durationButtonActive: {
    backgroundColor: COLORS.primary,
  },
  durationText: {
    ...FONTS.body4,
    color: COLORS.text,
  },
  durationTextActive: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  paymentSection: {
    padding: SIZES.padding * 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding,
  },
  paymentLabel: {
    ...FONTS.body3,
    color: COLORS.text,
  },
  paymentValue: {
    ...FONTS.body3,
    color: COLORS.text,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SIZES.padding,
  },
  totalLabel: {
    ...FONTS.h4,
  },
  totalValue: {
    ...FONTS.h4,
    color: COLORS.primary,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    margin: SIZES.padding * 2,
    height: 50,
    borderRadius: SIZES.radius / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookButtonText: {
    ...FONTS.body3,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default BookSession; 