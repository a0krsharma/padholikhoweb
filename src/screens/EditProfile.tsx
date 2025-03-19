import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants';

const EditProfile = ({ navigation, route }: any) => {
  // Initial data would come from route params in a real app
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+1 234 567 8900');
  const [bio, setBio] = useState('Passionate about learning new things. Student at University of Education.');
  const [location, setLocation] = useState('New York, USA');
  const [language, setLanguage] = useState('English');
  const [education, setEducation] = useState('Bachelor of Science');
  
  // Form validation state
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Validate name
  const validateName = (name: string) => {
    if (!name.trim()) {
      setNameError('Name is required');
      return false;
    } else if (name.length < 3) {
      setNameError('Name must be at least 3 characters');
      return false;
    } else {
      setNameError('');
      return true;
    }
  };

  // Validate email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError('Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  // Validate phone
  const validatePhone = (phone: string) => {
    if (phone && phone.trim().length < 10) {
      setPhoneError('Please enter a valid phone number');
      return false;
    } else {
      setPhoneError('');
      return true;
    }
  };

  // Handle save profile
  const handleSaveProfile = () => {
    const isNameValid = validateName(fullName);
    const isEmailValid = validateEmail(email);
    const isPhoneValid = validatePhone(phone);

    if (isNameValid && isEmailValid && isPhoneValid) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        Alert.alert(
          'Profile Updated',
          'Your profile has been updated successfully!',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack()
            }
          ]
        );
      }, 1500);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSaveProfile}
            disabled={isLoading}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>

        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        )}

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Profile Image */}
          <View style={styles.profileImageSection}>
            <View style={styles.profileImageContainer}>
              <Ionicons name="person-circle" size={120} color={COLORS.primary} />
              <TouchableOpacity 
                style={styles.editImageButton}
                onPress={() => Alert.alert('Coming Soon', 'Profile picture upload will be available soon!')}
              >
                <Ionicons name="camera" size={20} color={COLORS.white} />
              </TouchableOpacity>
            </View>
            <Text style={styles.changePhotoText}>Tap to change profile photo</Text>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Full Name <Text style={styles.requiredStar}>*</Text></Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Your full name"
                  placeholderTextColor={COLORS.placeholder}
                  value={fullName}
                  onChangeText={(text) => {
                    setFullName(text);
                    validateName(text);
                  }}
                  onBlur={() => validateName(fullName)}
                  accessibilityLabel="Full name input field"
                />
              </View>
              {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email <Text style={styles.requiredStar}>*</Text></Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Your email address"
                  placeholderTextColor={COLORS.placeholder}
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    validateEmail(text);
                  }}
                  onBlur={() => validateEmail(email)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  accessibilityLabel="Email input field"
                />
              </View>
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="call-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Your phone number"
                  placeholderTextColor={COLORS.placeholder}
                  value={phone}
                  onChangeText={(text) => {
                    setPhone(text);
                    validatePhone(text);
                  }}
                  onBlur={() => validatePhone(phone)}
                  keyboardType="phone-pad"
                  accessibilityLabel="Phone number input field"
                />
              </View>
              {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Bio</Text>
              <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Tell us about yourself"
                  placeholderTextColor={COLORS.placeholder}
                  value={bio}
                  onChangeText={setBio}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  accessibilityLabel="Bio input field"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Location</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="location-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Your location"
                  placeholderTextColor={COLORS.placeholder}
                  value={location}
                  onChangeText={setLocation}
                  accessibilityLabel="Location input field"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Preferred Language</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="language-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Your preferred language"
                  placeholderTextColor={COLORS.placeholder}
                  value={language}
                  onChangeText={setLanguage}
                  accessibilityLabel="Language input field"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Education</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="school-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Your educational background"
                  placeholderTextColor={COLORS.placeholder}
                  value={education}
                  onChangeText={setEducation}
                  accessibilityLabel="Education input field"
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.saveProfileButton}
            onPress={handleSaveProfile}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} size="small" />
            ) : (
              <Text style={styles.saveProfileButtonText}>Save Profile</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    ...FONTS.h3,
    color: COLORS.text,
  },
  saveButton: {
    padding: 8,
  },
  saveButtonText: {
    ...FONTS.body3,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  profileImageSection: {
    alignItems: 'center',
    paddingVertical: SIZES.padding * 2,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: SIZES.padding,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePhotoText: {
    ...FONTS.body4,
    color: COLORS.primary,
  },
  formContainer: {
    paddingHorizontal: SIZES.padding * 2,
    paddingBottom: SIZES.padding * 10, // Extra padding for keyboard
  },
  inputContainer: {
    marginBottom: SIZES.padding * 1.5,
  },
  inputLabel: {
    ...FONTS.body4,
    color: COLORS.text,
    marginBottom: SIZES.padding / 2,
    fontWeight: '500',
  },
  requiredStar: {
    color: COLORS.error,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: COLORS.input,
    borderRadius: SIZES.radius / 2,
    paddingHorizontal: SIZES.padding,
  },
  textAreaWrapper: {
    height: 120,
    alignItems: 'flex-start',
  },
  inputIcon: {
    marginRight: SIZES.padding / 2,
  },
  input: {
    flex: 1,
    ...FONTS.body3,
    color: COLORS.text,
  },
  textArea: {
    height: 100,
    paddingTop: SIZES.padding,
  },
  errorText: {
    ...FONTS.body5,
    color: COLORS.error,
    marginTop: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.padding * 2,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  saveProfileButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: SIZES.radius / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveProfileButtonText: {
    ...FONTS.body3,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  loadingOverlay: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditProfile; 