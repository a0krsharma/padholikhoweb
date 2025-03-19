import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Dimensions,
  FlatList,
  Image,
  Animated,
  TextInput,
  Modal,
  Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FONTS, SIZES } from '../constants';

const { width } = Dimensions.get('window');

const Home = ({ navigation }: any) => {
  const featuredTeachers = [
    { id: 1, name: 'Sarah Johnson', subject: 'Mathematics', rating: 4.8 },
    { id: 2, name: 'Michael Chen', subject: 'Physics', rating: 4.9 },
    { id: 3, name: 'Emma Wilson', subject: 'Chemistry', rating: 4.7 },
  ];

  const categories = [
    { id: 1, name: 'Mathematics', icon: 'calculate' },
    { id: 2, name: 'Physics', icon: 'science' },
    { id: 3, name: 'Chemistry', icon: 'biotech' },
    { id: 4, name: 'Biology', icon: 'psychology' },
  ];

  const recentSessions = [
    { id: 1, subject: 'Mathematics', teacher: 'Sarah Johnson', date: 'Today, 2:00 PM', status: 'Upcoming' },
    { id: 2, subject: 'Physics', teacher: 'Michael Chen', date: 'Tomorrow, 3:30 PM', status: 'Scheduled' },
  ];

  // Hero banner data
  const banners = [
    {
      id: '1',
      title: 'Learn with Expert Teachers',
      description: 'Connect with the best teachers in your favorite subjects',
      icon: 'school-outline',
      backgroundColor: COLORS.primary,
    },
    {
      id: '2',
      title: 'Study Anytime, Anywhere',
      description: 'Access your sessions from any device at your convenience',
      icon: 'time-outline',
      backgroundColor: COLORS.secondary,
    },
    {
      id: '3',
      title: 'Interactive Learning',
      description: 'Engage in live interactive sessions with your teachers',
      icon: 'videocam-outline',
      backgroundColor: '#5D3FD3', // Purple
    },
    {
      id: '4',
      title: 'Track Your Progress',
      description: 'Monitor your learning journey with detailed insights',
      icon: 'analytics-outline',
      backgroundColor: '#FF6B6B', // Coral
    },
  ];

  // Auto scroll state and refs
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto scroll effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex < banners.length - 1) {
        flatListRef.current?.scrollToIndex({
          index: currentIndex + 1,
          animated: true,
        });
        setCurrentIndex(currentIndex + 1);
      } else {
        flatListRef.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
        setCurrentIndex(0);
      }
    }, 3000); // Change banner every 3 seconds

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  // Handle scroll
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  // Banner item render function
  const renderBannerItem = ({ item }: any) => {
    return (
      <View 
        style={[
          styles.bannerItem, 
          { backgroundColor: item.backgroundColor }
        ]}
      >
        <View style={styles.bannerIconContainer}>
          <Ionicons 
            name={item.icon} 
            size={50} 
            color={COLORS.white} 
            style={styles.bannerIcon} 
          />
        </View>
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>{item.title}</Text>
          <Text style={styles.bannerDescription}>{item.description}</Text>
          <TouchableOpacity style={styles.learnMoreButton}>
            <Text style={styles.learnMoreText}>Learn More</Text>
            <Ionicons name="arrow-forward" size={16} color={COLORS.white} style={{ marginLeft: 5 }} />
          </TouchableOpacity>
        </View>
        {/* Decorative circles */}
        <View style={styles.decorCircle1} />
        <View style={styles.decorCircle2} />
      </View>
    );
  };

  // Pagination dots
  const renderPaginationDots = () => {
    return (
      <View style={styles.paginationContainer}>
        {banners.map((_, i) => {
          const inputRange = [
            (i - 1) * (width - (SIZES.padding * 2)),
            i * (width - (SIZES.padding * 2)),
            (i + 1) * (width - (SIZES.padding * 2)),
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={i.toString()}
              style={[
                styles.dot,
                { width: dotWidth, opacity },
                i === currentIndex && styles.activeDot,
              ]}
            />
          );
        })}
      </View>
    );
  };

  // New state for Book a Teacher modal
  const [showBookTeacherModal, setShowBookTeacherModal] = useState(false);
  const [preferredLanguage, setPreferredLanguage] = useState('English');
  const [preferredGender, setPreferredGender] = useState('Any');
  const [preferredTiming, setPreferredTiming] = useState('');
  const [bookName, setBookName] = useState('');
  const [topic, setTopic] = useState('');
  const [helpType, setHelpType] = useState('Homework');
  
  // Languages options
  const languages = ['English', 'Hindi', 'Spanish', 'French', 'German', 'Chinese'];
  
  // Gender options
  const genders = ['Any', 'Male', 'Female'];
  
  // Help type options
  const helpTypes = ['Homework', 'Assignment', 'Project', 'Exam Prep', 'Concepts'];
  
  // Time slots
  const timeSlots = [
    '08:00 AM - 09:00 AM',
    '09:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 01:00 PM',
    '01:00 PM - 02:00 PM',
    '02:00 PM - 03:00 PM',
    '03:00 PM - 04:00 PM',
    '04:00 PM - 05:00 PM',
    '05:00 PM - 06:00 PM',
    '06:00 PM - 07:00 PM',
    '07:00 PM - 08:00 PM',
  ];

  // Function to handle booking submission
  const handleBookTeacher = () => {
    // Validate inputs
    if (!preferredTiming || !topic) {
      Alert.alert('Missing Information', 'Please select a time slot and enter a topic.');
      return;
    }
    
    // Log the booking details
    console.log({
      language: preferredLanguage,
      gender: preferredGender,
      timing: preferredTiming,
      book: bookName,
      topic,
      helpType
    });
    
    // Show success message
    Alert.alert(
      'Booking Successful',
      'We are finding the best teacher for you. You will be notified once a teacher is assigned.',
      [
        {
          text: 'OK',
          onPress: () => {
            // Reset form and close modal
            setPreferredLanguage('English');
            setPreferredGender('Any');
            setPreferredTiming('');
            setBookName('');
            setTopic('');
            setHelpType('Homework');
            setShowBookTeacherModal(false);
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Student!</Text>
            <Text style={styles.subtitle}>Let's continue learning</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle" size={40} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Hero Banner Section */}
        <View style={styles.heroSection}>
          <FlatList
            ref={flatListRef}
            data={banners}
            renderItem={renderBannerItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            contentContainerStyle={{ paddingHorizontal: 0 }}
            snapToInterval={width - (SIZES.padding * 2)}
            snapToAlignment="center"
            decelerationRate="fast"
            onMomentumScrollEnd={(event) => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / (width - (SIZES.padding * 2))
              );
              setCurrentIndex(index);
            }}
          />
          {renderPaginationDots()}
        </View>

        {/* Book a Teacher Card */}
        <TouchableOpacity 
          style={styles.bookTeacherCard}
          onPress={() => setShowBookTeacherModal(true)}
        >
          <View style={styles.bookTeacherContent}>
            <Text style={styles.bookTeacherTitle}>Need Help?</Text>
            <Text style={styles.bookTeacherSubtitle}>
              Book a teacher for personalized help with homework, assignments, or projects
            </Text>
            <View style={styles.bookNowButton}>
              <Text style={styles.bookNowText}>Book Now</Text>
              <Ionicons name="arrow-forward" size={16} color={COLORS.white} />
            </View>
          </View>
          <View style={styles.bookTeacherImageContainer}>
            <Ionicons name="school" size={60} color={COLORS.white} />
          </View>
          {/* Decorative element */}
          <View style={styles.bookTeacherDecorCircle} />
        </TouchableOpacity>

        {/* Featured Teachers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Teachers</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredContainer}
          >
            {featuredTeachers.map((teacher) => (
              <TouchableOpacity 
                key={teacher.id} 
                style={styles.teacherCard}
                onPress={() => navigation.navigate('TeacherProfile', { teacher })}
              >
                <View style={styles.teacherImagePlaceholder}>
                  <Ionicons name="person" size={50} color={COLORS.white} />
                </View>
                <View style={styles.teacherInfo}>
                  <Text style={styles.teacherName}>{teacher.name}</Text>
                  <Text style={styles.teacherSubject}>{teacher.subject}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color={COLORS.yellow} />
                    <Text style={styles.rating}>{teacher.rating}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <TouchableOpacity 
                key={category.id} 
                style={styles.categoryCard}
                onPress={() => navigation.navigate('Category', { category })}
              >
                <MaterialIcons name={category.icon} size={40} color={COLORS.primary} />
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Sessions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Sessions</Text>
          {recentSessions.map((session) => (
            <TouchableOpacity 
              key={session.id} 
              style={styles.sessionCard}
              onPress={() => navigation.navigate('Session', { 
                session: {
                  ...session,
                  id: session.id,
                  subject: session.subject,
                  teacher: session.teacher,
                  date: session.date,
                  status: session.status
                } 
              })}
            >
              <View style={styles.sessionInfo}>
                <Text style={styles.sessionSubject}>{session.subject}</Text>
                <Text style={styles.sessionTeacher}>{session.teacher}</Text>
                <Text style={styles.sessionDate}>{session.date}</Text>
              </View>
              <View style={[
                styles.statusBadge,
                { backgroundColor: session.status === 'Upcoming' ? COLORS.primary : COLORS.secondary }
              ]}>
                <Text style={styles.statusText}>{session.status}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Book a Teacher Modal */}
        <Modal
          visible={showBookTeacherModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowBookTeacherModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Book a Teacher</Text>
                <TouchableOpacity onPress={() => setShowBookTeacherModal(false)}>
                  <Ionicons name="close" size={24} color={COLORS.text} />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Preferred Language */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Preferred Language</Text>
                  <View style={styles.optionsContainer}>
                    {languages.map((language) => (
                      <TouchableOpacity
                        key={language}
                        style={[
                          styles.optionButton,
                          preferredLanguage === language && styles.optionButtonSelected
                        ]}
                        onPress={() => setPreferredLanguage(language)}
                      >
                        <Text
                          style={[
                            styles.optionText,
                            preferredLanguage === language && styles.optionTextSelected
                          ]}
                        >
                          {language}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Preferred Gender */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Preferred Gender</Text>
                  <View style={styles.genderOptionsContainer}>
                    {genders.map((gender) => (
                      <TouchableOpacity
                        key={gender}
                        style={[
                          styles.genderOption,
                          preferredGender === gender && styles.genderOptionSelected
                        ]}
                        onPress={() => setPreferredGender(gender)}
                      >
                        <Ionicons
                          name={
                            gender === 'Male'
                              ? 'male'
                              : gender === 'Female'
                              ? 'female'
                              : 'people'
                          }
                          size={24}
                          color={
                            preferredGender === gender
                              ? COLORS.white
                              : COLORS.primary
                          }
                        />
                        <Text
                          style={[
                            styles.genderOptionText,
                            preferredGender === gender && styles.genderOptionTextSelected
                          ]}
                        >
                          {gender}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Help Type */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>I Need Help With</Text>
                  <View style={styles.optionsContainer}>
                    {helpTypes.map((type) => (
                      <TouchableOpacity
                        key={type}
                        style={[
                          styles.optionButton,
                          helpType === type && styles.optionButtonSelected
                        ]}
                        onPress={() => setHelpType(type)}
                      >
                        <Text
                          style={[
                            styles.optionText,
                            helpType === type && styles.optionTextSelected
                          ]}
                        >
                          {type}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Book Name */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Book Name (Optional)</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter book name if applicable"
                    placeholderTextColor={COLORS.placeholder}
                    value={bookName}
                    onChangeText={setBookName}
                  />
                </View>

                {/* Topic */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Topic *</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter the topic you need help with"
                    placeholderTextColor={COLORS.placeholder}
                    value={topic}
                    onChangeText={setTopic}
                  />
                </View>

                {/* Preferred Timing */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Preferred Timing *</Text>
                  <View style={styles.timeSlotGrid}>
                    {timeSlots.map((slot) => (
                      <TouchableOpacity
                        key={slot}
                        style={[
                          styles.timeSlot,
                          preferredTiming === slot && styles.timeSlotSelected
                        ]}
                        onPress={() => setPreferredTiming(slot)}
                      >
                        <Text
                          style={[
                            styles.timeSlotText,
                            preferredTiming === slot && styles.timeSlotTextSelected
                          ]}
                        >
                          {slot}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                  style={styles.bookButton}
                  onPress={handleBookTeacher}
                >
                  <Text style={styles.bookButtonText}>Find My Teacher</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>
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
    marginBottom: SIZES.padding * 2,
  },
  greeting: {
    ...FONTS.h2,
    color: COLORS.text,
  },
  subtitle: {
    ...FONTS.body3,
    color: COLORS.gray,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    paddingHorizontal: SIZES.padding * 2,
    marginBottom: SIZES.padding * 2,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  featuredContainer: {
    paddingRight: SIZES.padding * 2,
  },
  teacherCard: {
    width: 200,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginRight: SIZES.padding,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  teacherImagePlaceholder: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teacherInfo: {
    padding: SIZES.padding,
  },
  teacherName: {
    ...FONTS.h4,
    color: COLORS.text,
    marginBottom: 4,
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
    color: COLORS.primary,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
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
  categoryName: {
    ...FONTS.body4,
    color: COLORS.text,
    textAlign: 'center',
    marginTop: SIZES.padding / 2,
  },
  sessionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    elevation: 3,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionSubject: {
    ...FONTS.h4,
    color: COLORS.text,
    marginBottom: 4,
  },
  sessionTeacher: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginBottom: 4,
  },
  sessionDate: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  statusBadge: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
    borderRadius: SIZES.radius / 2,
  },
  statusText: {
    ...FONTS.body5,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  heroSection: {
    height: 200,
    marginBottom: SIZES.padding * 2,
    marginHorizontal: SIZES.padding,
  },
  bannerItem: {
    width: width - (SIZES.padding * 2),
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 2,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  bannerIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding * 2,
  },
  bannerIcon: {
    // No additional styles needed here
  },
  bannerContent: {
    flex: 1,
    justifyContent: 'center',
  },
  bannerTitle: {
    ...FONTS.h2,
    color: COLORS.white,
    marginBottom: SIZES.padding,
  },
  bannerDescription: {
    ...FONTS.body3,
    color: COLORS.white,
    opacity: 0.9,
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.padding,
  },
  learnMoreText: {
    ...FONTS.body4,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  decorCircle1: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  decorCircle2: {
    position: 'absolute',
    bottom: -20,
    right: 40,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.white,
    marginHorizontal: 4,
    opacity: 0.5,
  },
  activeDot: {
    backgroundColor: COLORS.white,
    opacity: 1,
  },
  // Book a Teacher Card Styles
  bookTeacherCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    margin: SIZES.padding * 2,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  bookTeacherContent: {
    flex: 3,
    paddingRight: SIZES.padding,
  },
  bookTeacherTitle: {
    ...FONTS.h2,
    color: COLORS.white,
    marginBottom: SIZES.padding / 2,
  },
  bookTeacherSubtitle: {
    ...FONTS.body4,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: SIZES.padding,
  },
  bookNowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'flex-start',
    paddingVertical: SIZES.padding / 2,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.radius / 2,
  },
  bookNowText: {
    ...FONTS.body4,
    color: COLORS.white,
    fontWeight: 'bold',
    marginRight: 5,
  },
  bookTeacherImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookTeacherDecorCircle: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    bottom: -40,
    right: -20,
  },
  
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.radius * 2,
    borderTopRightRadius: SIZES.radius * 2,
    padding: SIZES.padding * 2,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding * 2,
  },
  modalTitle: {
    ...FONTS.h2,
    color: COLORS.text,
  },
  formGroup: {
    marginBottom: SIZES.padding * 2,
  },
  formLabel: {
    ...FONTS.body3,
    color: COLORS.text,
    fontWeight: 'bold',
    marginBottom: SIZES.padding,
  },
  textInput: {
    backgroundColor: COLORS.input,
    borderRadius: SIZES.radius / 2,
    padding: SIZES.padding,
    ...FONTS.body3,
    color: COLORS.text,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SIZES.padding / 2,
  },
  optionButton: {
    backgroundColor: COLORS.input,
    paddingVertical: SIZES.padding / 2,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.radius / 2,
    margin: SIZES.padding / 2,
  },
  optionButtonSelected: {
    backgroundColor: COLORS.primary,
  },
  optionText: {
    ...FONTS.body4,
    color: COLORS.text,
  },
  optionTextSelected: {
    color: COLORS.white,
  },
  genderOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderOption: {
    flex: 1,
    backgroundColor: COLORS.input,
    padding: SIZES.padding,
    borderRadius: SIZES.radius / 2,
    marginHorizontal: SIZES.padding / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderOptionSelected: {
    backgroundColor: COLORS.primary,
  },
  genderOptionText: {
    ...FONTS.body4,
    color: COLORS.text,
    marginLeft: SIZES.padding / 2,
  },
  genderOptionTextSelected: {
    color: COLORS.white,
  },
  timeSlotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SIZES.padding / 4,
  },
  timeSlot: {
    width: '48%',
    backgroundColor: COLORS.input,
    padding: SIZES.padding / 2,
    borderRadius: SIZES.radius / 2,
    margin: SIZES.padding / 4,
    alignItems: 'center',
  },
  timeSlotSelected: {
    backgroundColor: COLORS.primary,
  },
  timeSlotText: {
    ...FONTS.body4,
    color: COLORS.text,
  },
  timeSlotTextSelected: {
    color: COLORS.white,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    marginTop: SIZES.padding,
    marginBottom: SIZES.padding * 3,
  },
  bookButtonText: {
    ...FONTS.body3,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default Home; 