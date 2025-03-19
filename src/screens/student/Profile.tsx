import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES, ICONS } from '../../constants';

interface ProfileInfo {
  name: string;
  email: string;
  phone: string;
  grade: string;
  board: string;
  dob: string;
  address: string;
  parentName: string;
  parentPhone: string;
  profilePicture: string | null;
  bio: string;
}

const StudentProfile = ({ navigation }: any) => {
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
    name: 'Aryan Sharma',
    email: 'aryan.sharma@example.com',
    phone: '+91 9876543210',
    grade: '10th',
    board: 'CBSE',
    dob: '15-06-2006',
    address: '123 Main Street, New Delhi, India',
    parentName: 'Rajesh Sharma',
    parentPhone: '+91 9876543211',
    profilePicture: null,
    bio: 'Hi, I\'m Aryan. I love Mathematics and Science. I aspire to become an engineer in the future.',
  });

  const [editMode, setEditMode] = useState(false);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (field: keyof ProfileInfo) => {
    setEditField(field);
    setEditValue(profileInfo[field] as string);
    setShowModal(true);
  };

  const saveChanges = () => {
    if (editField && editValue.trim()) {
      setProfileInfo(prev => ({
        ...prev,
        [editField]: editValue.trim()
      }));
      setShowModal(false);
      Alert.alert('Success', 'Profile updated successfully');
    } else {
      Alert.alert('Error', 'Please enter a valid value');
    }
  };

  const renderInfoItem = (label: string, value: string, field: keyof ProfileInfo, editable: boolean = true) => (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>
      <View style={styles.infoValueContainer}>
        <Text style={styles.infoValue}>{value}</Text>
        {editable && editMode && (
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => handleEdit(field)}
          >
            <Ionicons name={ICONS.edit} size={18} color={COLORS.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderSection = (title: string, children: React.ReactNode) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name={ICONS.back} size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity 
          style={styles.editModeButton}
          onPress={() => setEditMode(!editMode)}
        >
          <Text style={styles.editModeText}>{editMode ? 'Done' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            {profileInfo.profilePicture ? (
              <Image 
                source={{ uri: profileInfo.profilePicture }} 
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.defaultProfileImage}>
                <Text style={styles.profileInitials}>
                  {profileInfo.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
            )}
            {editMode && (
              <TouchableOpacity 
                style={styles.changePhotoButton}
                onPress={() => Alert.alert('Coming Soon', 'This feature will be available soon!')}
              >
                <Ionicons name={ICONS.camera} size={18} color={COLORS.white} />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.profileName}>{profileInfo.name}</Text>
          <Text style={styles.profileGrade}>{profileInfo.grade} Grade • {profileInfo.board}</Text>
          
          <View style={styles.bioContainer}>
            <Text style={styles.bioText}>{profileInfo.bio}</Text>
            {editMode && (
              <TouchableOpacity 
                style={styles.editBioButton}
                onPress={() => handleEdit('bio')}
              >
                <Ionicons name={ICONS.edit} size={18} color={COLORS.primary} />
                <Text style={styles.editBioText}>Edit Bio</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {renderSection('Personal Information', (
          <>
            {renderInfoItem('Full Name', profileInfo.name, 'name')}
            {renderInfoItem('Email', profileInfo.email, 'email')}
            {renderInfoItem('Phone', profileInfo.phone, 'phone')}
            {renderInfoItem('Date of Birth', profileInfo.dob, 'dob')}
            {renderInfoItem('Address', profileInfo.address, 'address')}
          </>
        ))}

        {renderSection('Academic Information', (
          <>
            {renderInfoItem('Grade', profileInfo.grade, 'grade')}
            {renderInfoItem('Board', profileInfo.board, 'board')}
          </>
        ))}

        {renderSection('Parent/Guardian Information', (
          <>
            {renderInfoItem('Parent Name', profileInfo.parentName, 'parentName')}
            {renderInfoItem('Parent Phone', profileInfo.parentPhone, 'parentPhone')}
          </>
        ))}

        <TouchableOpacity 
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name={ICONS.settings} size={20} color={COLORS.primary} />
          <Text style={styles.settingsText}>App Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => {
            Alert.alert(
              'Logout',
              'Are you sure you want to logout?',
              [
                { text: 'Cancel', style: 'cancel' },
                { 
                  text: 'Logout', 
                  style: 'destructive',
                  onPress: () => navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                  })
                },
              ]
            );
          }}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit {editField.replace(/([A-Z])/g, ' $1').trim()}</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Ionicons name={ICONS.close} size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.modalInput}
              value={editValue}
              onChangeText={setEditValue}
              placeholder={`Enter your ${editField}`}
              multiline={editField === 'bio' || editField === 'address'}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={saveChanges}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  backButton: {
    padding: SIZES.padding / 2,
  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.text,
  },
  editModeButton: {
    padding: SIZES.padding / 2,
  },
  editModeText: {
    ...FONTS.h4,
    color: COLORS.primary,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: SIZES.padding * 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: SIZES.padding,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  defaultProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.lightPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    ...FONTS.h1,
    color: COLORS.primary,
  },
  changePhotoButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    ...FONTS.h2,
    color: COLORS.text,
    marginBottom: SIZES.padding / 2,
  },
  profileGrade: {
    ...FONTS.body3,
    color: COLORS.gray,
    marginBottom: SIZES.padding,
  },
  bioContainer: {
    width: '80%',
    alignItems: 'center',
  },
  bioText: {
    ...FONTS.body3,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SIZES.padding / 2,
  },
  editBioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editBioText: {
    ...FONTS.body4,
    color: COLORS.primary,
    marginLeft: 4,
  },
  section: {
    paddingHorizontal: SIZES.padding * 2,
    paddingTop: SIZES.padding * 2,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.gray,
    marginBottom: SIZES.padding,
  },
  sectionContent: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoLabel: {
    ...FONTS.body3,
    color: COLORS.text,
    flex: 1,
  },
  infoValueContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  infoValue: {
    ...FONTS.body3,
    color: COLORS.gray,
    textAlign: 'right',
  },
  editButton: {
    marginLeft: SIZES.padding,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZES.padding * 3,
    marginHorizontal: SIZES.padding * 2,
    padding: SIZES.padding,
    backgroundColor: COLORS.lightPrimary,
    borderRadius: SIZES.radius,
  },
  settingsText: {
    ...FONTS.body3,
    color: COLORS.primary,
    marginLeft: SIZES.padding / 2,
  },
  logoutButton: {
    marginHorizontal: SIZES.padding * 2,
    marginTop: SIZES.padding,
    marginBottom: SIZES.padding * 4,
    padding: SIZES.padding,
    backgroundColor: COLORS.error,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  logoutText: {
    ...FONTS.button,
    color: COLORS.white,
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
    padding: SIZES.padding * 2,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding * 2,
  },
  modalTitle: {
    ...FONTS.h3,
    color: COLORS.text,
  },
  modalInput: {
    ...FONTS.body3,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    minHeight: 50,
    marginBottom: SIZES.padding * 2,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    marginLeft: SIZES.padding,
  },
  saveButtonText: {
    ...FONTS.button,
    color: COLORS.white,
  },
  cancelButton: {
    backgroundColor: COLORS.lightGray,
    marginRight: SIZES.padding,
  },
  cancelButtonText: {
    ...FONTS.button,
    color: COLORS.text,
  },
});

export default StudentProfile; 