import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Switch,
  Alert,
  ActivityIndicator,
  Modal,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../../constants';
import { AuthService } from '../../services/auth';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

interface ParentProfileType {
  id: string;
  name: string;
  email: string;
  phone: string;
  photoURL?: string;
  address?: string;
  occupation?: string;
  children: string[];
  notificationSettings: {
    messages: boolean;
    meetings: boolean;
    grades: boolean;
    schoolEvents: boolean;
    homework: boolean;
  };
}

const Profile = ({ navigation }: any) => {
  const [profile, setProfile] = useState<ParentProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Edit fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [occupation, setOccupation] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    messages: true,
    meetings: true,
    grades: true,
    schoolEvents: true,
    homework: true,
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const userId = AuthService.getCurrentUser()?.uid;
      if (!userId) return;

      // In a real app, this would fetch the profile from Firestore
      // For now, we'll simulate this with mock data
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockProfile: ParentProfileType = {
        id: userId,
        name: 'Rajat Sharma',
        email: 'rajat.sharma@example.com',
        phone: '+91 98765 43210',
        address: '123 Gandhi Road, Mumbai 400001',
        occupation: 'Software Engineer',
        photoURL: 'https://randomuser.me/api/portraits/men/75.jpg',
        children: ['child1', 'child2'], // IDs of children
        notificationSettings: {
          messages: true,
          meetings: true,
          grades: true,
          schoolEvents: true,
          homework: true,
        },
      };
      
      setProfile(mockProfile);
      
      // Initialize edit state with profile data
      setName(mockProfile.name);
      setPhone(mockProfile.phone);
      setAddress(mockProfile.address || '');
      setOccupation(mockProfile.occupation || '');
      setPhotoURL(mockProfile.photoURL || '');
      setNotificationSettings(mockProfile.notificationSettings);
    } catch (error) {
      console.error('Error fetching profile:', error);
      Alert.alert('Error', 'Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    
    if (!phone.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }
    
    setSavingProfile(true);
    
    try {
      // In a real app, this would update the profile in Firestore
      // For now, we'll just update our local state
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (profile) {
        const updatedProfile = {
          ...profile,
          name,
          phone,
          address,
          occupation,
          photoURL,
          notificationSettings,
        };
        
        setProfile(updatedProfile);
      }
      
      setEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleImagePicker = async () => {
    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });
      
      if (response.didCancel) {
        console.log('User cancelled image picker');
        return;
      }
      
      if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Error', 'Failed to select image');
        return;
      }
      
      if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        if (asset.uri) {
          uploadImage(asset.uri);
        }
      }
    } catch (error) {
      console.error('Error with image picker:', error);
      Alert.alert('Error', 'Failed to select image');
    }
  };

  const uploadImage = async (uri: string) => {
    try {
      setUploadingImage(true);
      
      // In a real app, this would upload to Firebase Storage
      // For now, we'll simulate this and just update the local state
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulating a successful upload
      setPhotoURL(uri);
      
      Alert.alert('Success', 'Profile photo updated successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await AuthService.signOut();
              // Navigation to auth screen would be handled by an auth state listener in App.tsx
            } catch (error) {
              console.error('Error signing out:', error);
              Alert.alert('Error', 'Failed to sign out');
            }
          },
        },
      ],
    );
  };

  const toggleNotificationSetting = (setting: keyof ParentProfileType['notificationSettings']) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        
        {!editing ? (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setEditing(true)}
          >
            <Ionicons name="create-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => {
              // Reset form to current profile values
              if (profile) {
                setName(profile.name);
                setPhone(profile.phone);
                setAddress(profile.address || '');
                setOccupation(profile.occupation || '');
                setPhotoURL(profile.photoURL || '');
                setNotificationSettings(profile.notificationSettings);
              }
              setEditing(false);
            }}
          >
            <Ionicons name="close-outline" size={24} color={COLORS.error} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Profile Photo */}
        <View style={styles.photoContainer}>
          {photoURL ? (
            <Image source={{ uri: photoURL }} style={styles.profilePhoto} />
          ) : (
            <View style={[styles.profilePhoto, styles.placeholderPhoto]}>
              <Text style={styles.placeholderPhotoText}>{name.charAt(0)}</Text>
            </View>
          )}
          
          {editing && (
            <TouchableOpacity
              style={styles.changePhotoButton}
              onPress={handleImagePicker}
              disabled={uploadingImage}
            >
              {uploadingImage ? (
                <ActivityIndicator size="small" color={COLORS.white} />
              ) : (
                <Ionicons name="camera" size={20} color={COLORS.white} />
              )}
            </TouchableOpacity>
          )}
        </View>

        {/* User Info */}
        <View style={styles.infoContainer}>
          {editing ? (
            /* Edit Mode */
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your name"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <Text style={styles.disabledInput}>{profile?.email}</Text>
                <Text style={styles.inputNote}>Email cannot be changed</Text>
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone</Text>
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Address</Text>
                <TextInput
                  style={styles.input}
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Enter your address"
                  multiline
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Occupation</Text>
                <TextInput
                  style={styles.input}
                  value={occupation}
                  onChangeText={setOccupation}
                  placeholder="Enter your occupation"
                />
              </View>
              
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={[styles.saveButton, savingProfile && styles.disabledButton]}
                  onPress={handleSaveProfile}
                  disabled={savingProfile}
                >
                  {savingProfile ? (
                    <ActivityIndicator size="small" color={COLORS.white} />
                  ) : (
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                  )}
                </TouchableOpacity>
              </View>
            </>
          ) : (
            /* View Mode */
            <>
              <View style={styles.infoItem}>
                <Ionicons name="person-outline" size={20} color={COLORS.gray} />
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Name</Text>
                  <Text style={styles.infoValue}>{profile?.name}</Text>
                </View>
              </View>
              
              <View style={styles.infoItem}>
                <Ionicons name="mail-outline" size={20} color={COLORS.gray} />
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoValue}>{profile?.email}</Text>
                </View>
              </View>
              
              <View style={styles.infoItem}>
                <Ionicons name="call-outline" size={20} color={COLORS.gray} />
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Phone</Text>
                  <Text style={styles.infoValue}>{profile?.phone}</Text>
                </View>
              </View>
              
              {profile?.address && (
                <View style={styles.infoItem}>
                  <Ionicons name="home-outline" size={20} color={COLORS.gray} />
                  <View style={styles.infoTextContainer}>
                    <Text style={styles.infoLabel}>Address</Text>
                    <Text style={styles.infoValue}>{profile.address}</Text>
                  </View>
                </View>
              )}
              
              {profile?.occupation && (
                <View style={styles.infoItem}>
                  <Ionicons name="briefcase-outline" size={20} color={COLORS.gray} />
                  <View style={styles.infoTextContainer}>
                    <Text style={styles.infoLabel}>Occupation</Text>
                    <Text style={styles.infoValue}>{profile.occupation}</Text>
                  </View>
                </View>
              )}
            </>
          )}
        </View>

        {/* Notification Settings */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Notification Preferences</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingLabel}>Messages</Text>
              <Text style={styles.settingDescription}>
                Receive notifications for new messages
              </Text>
            </View>
            <Switch
              value={notificationSettings.messages}
              onValueChange={() => toggleNotificationSetting('messages')}
              thumbColor={Platform.OS === 'android' ? COLORS.white : ''}
              trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
              disabled={!editing}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingLabel}>Meetings</Text>
              <Text style={styles.settingDescription}>
                Receive reminders for upcoming meetings
              </Text>
            </View>
            <Switch
              value={notificationSettings.meetings}
              onValueChange={() => toggleNotificationSetting('meetings')}
              thumbColor={Platform.OS === 'android' ? COLORS.white : ''}
              trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
              disabled={!editing}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingLabel}>Grades & Assessments</Text>
              <Text style={styles.settingDescription}>
                Get notified when new grades are posted
              </Text>
            </View>
            <Switch
              value={notificationSettings.grades}
              onValueChange={() => toggleNotificationSetting('grades')}
              thumbColor={Platform.OS === 'android' ? COLORS.white : ''}
              trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
              disabled={!editing}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingLabel}>School Events</Text>
              <Text style={styles.settingDescription}>
                Stay updated on school events and activities
              </Text>
            </View>
            <Switch
              value={notificationSettings.schoolEvents}
              onValueChange={() => toggleNotificationSetting('schoolEvents')}
              thumbColor={Platform.OS === 'android' ? COLORS.white : ''}
              trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
              disabled={!editing}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingLabel}>Homework</Text>
              <Text style={styles.settingDescription}>
                Get notified about homework assignments
              </Text>
            </View>
            <Switch
              value={notificationSettings.homework}
              onValueChange={() => toggleNotificationSetting('homework')}
              thumbColor={Platform.OS === 'android' ? COLORS.white : ''}
              trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
              disabled={!editing}
            />
          </View>
        </View>

        {/* Account Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('ChangePassword')}
          >
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.text} />
            <Text style={styles.actionButtonText}>Change Password</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Privacy')}
          >
            <Ionicons name="shield-outline" size={20} color={COLORS.text} />
            <Text style={styles.actionButtonText}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Support')}
          >
            <Ionicons name="help-circle-outline" size={20} color={COLORS.text} />
            <Text style={styles.actionButtonText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.signOutButton]}
            onPress={handleSignOut}
          >
            <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
            <Text style={[styles.actionButtonText, styles.signOutText]}>Sign Out</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.text,
  },
  headerButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoContainer: {
    alignItems: 'center',
    padding: SIZES.padding * 2,
    position: 'relative',
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  placeholderPhoto: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderPhotoText: {
    ...FONTS.h1,
    color: COLORS.white,
  },
  changePhotoButton: {
    position: 'absolute',
    bottom: SIZES.padding * 2,
    right: '35%',
    backgroundColor: COLORS.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  infoContainer: {
    padding: SIZES.padding * 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  infoTextContainer: {
    marginLeft: SIZES.padding,
    flex: 1,
  },
  infoLabel: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  infoValue: {
    ...FONTS.body3,
    color: COLORS.text,
  },
  inputGroup: {
    marginBottom: SIZES.padding,
  },
  inputLabel: {
    ...FONTS.body4,
    color: COLORS.text,
    marginBottom: 4,
  },
  input: {
    ...FONTS.body3,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius / 2,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
    color: COLORS.text,
  },
  disabledInput: {
    ...FONTS.body3,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius / 2,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
    color: COLORS.gray,
    backgroundColor: COLORS.lightGray,
  },
  inputNote: {
    ...FONTS.body5,
    color: COLORS.gray,
    marginTop: 4,
    fontStyle: 'italic',
  },
  buttonsContainer: {
    marginTop: SIZES.padding,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  saveButtonText: {
    ...FONTS.body3,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  sectionContainer: {
    padding: SIZES.padding * 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding,
  },
  settingTextContainer: {
    flex: 1,
    marginRight: SIZES.padding,
  },
  settingLabel: {
    ...FONTS.body3,
    color: COLORS.text,
    marginBottom: 2,
  },
  settingDescription: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  actionsContainer: {
    padding: SIZES.padding * 2,
    marginBottom: SIZES.padding * 2,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  actionButtonText: {
    ...FONTS.body3,
    color: COLORS.text,
    flex: 1,
    marginLeft: SIZES.padding,
  },
  signOutButton: {
    borderBottomWidth: 0,
    marginTop: SIZES.padding,
  },
  signOutText: {
    color: COLORS.error,
  },
});

export default Profile; 