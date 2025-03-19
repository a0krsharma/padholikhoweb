import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../../constants';
import { AuthService } from '../../services/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'react-native-image-picker';

const AddEditChild = ({ route, navigation }: any) => {
  const { mode, childData } = route.params || { mode: 'add' };
  const isEditMode = mode === 'edit';

  const [name, setName] = useState(isEditMode ? childData.name : '');
  const [age, setAge] = useState(isEditMode ? childData.age.toString() : '');
  const [grade, setGrade] = useState(isEditMode ? childData.grade : '');
  const [school, setSchool] = useState(isEditMode ? childData.school : '');
  const [photoURL, setPhotoURL] = useState(isEditMode ? childData.photoURL : '');
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const isFormValid = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter child\'s name');
      return false;
    }
    
    if (!age.trim() || isNaN(Number(age))) {
      Alert.alert('Error', 'Please enter a valid age');
      return false;
    }
    
    if (!grade.trim()) {
      Alert.alert('Error', 'Please enter child\'s grade');
      return false;
    }
    
    if (!school.trim()) {
      Alert.alert('Error', 'Please enter school name');
      return false;
    }
    
    return true;
  };

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.8,
    };
    
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Error', 'Failed to pick image');
      } else if (response.assets && response.assets.length > 0) {
        uploadImage(response.assets[0].uri);
      }
    });
  };

  const uploadImage = async (uri: string | undefined) => {
    if (!uri) return;
    
    try {
      setImageUploading(true);
      
      const userId = AuthService.getCurrentUser()?.uid;
      if (!userId) throw new Error('User not authenticated');
      
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const storageRef = storage().ref(`users/${userId}/children/${filename}`);
      
      await storageRef.putFile(uri);
      const downloadURL = await storageRef.getDownloadURL();
      
      setPhotoURL(downloadURL);
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image');
    } finally {
      setImageUploading(false);
    }
  };

  const handleSave = async () => {
    if (!isFormValid()) return;
    
    setIsLoading(true);
    
    try {
      const userId = AuthService.getCurrentUser()?.uid;
      if (!userId) throw new Error('User not authenticated');
      
      const childData = {
        name,
        age: Number(age),
        grade,
        school,
        photoURL,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      };
      
      if (isEditMode) {
        await firestore()
          .collection('users')
          .doc(userId)
          .collection('children')
          .doc(route.params.childData.id)
          .update(childData);
          
        Alert.alert('Success', 'Child profile updated successfully');
      } else {
        childData.createdAt = firestore.FieldValue.serverTimestamp();
        
        await firestore()
          .collection('users')
          .doc(userId)
          .collection('children')
          .add(childData);
          
        Alert.alert('Success', 'Child profile added successfully');
      }
      
      navigation.goBack();
    } catch (error) {
      console.error('Error saving child profile:', error);
      Alert.alert('Error', 'Failed to save child profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {isEditMode ? 'Edit Child Profile' : 'Add Child'}
          </Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Photo Upload */}
        <View style={styles.photoSection}>
          <TouchableOpacity 
            style={styles.photoContainer}
            onPress={handleImagePicker}
            disabled={imageUploading}
          >
            {photoURL ? (
              <Image 
                source={{ uri: photoURL }} 
                style={styles.photo} 
              />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Ionicons 
                  name="person-outline" 
                  size={50} 
                  color={COLORS.gray} 
                />
              </View>
            )}
            {imageUploading ? (
              <View style={styles.uploadingOverlay}>
                <ActivityIndicator color={COLORS.white} />
              </View>
            ) : (
              <View style={styles.editIconContainer}>
                <Ionicons 
                  name="camera" 
                  size={18} 
                  color={COLORS.white} 
                />
              </View>
            )}
          </TouchableOpacity>
          <Text style={styles.photoHint}>Tap to change photo</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Child's Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter full name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter age"
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Grade/Class</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter grade or class"
              value={grade}
              onChangeText={setGrade}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>School</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter school name"
              value={school}
              onChangeText={setSchool}
            />
          </View>

          <TouchableOpacity
            style={[styles.saveButton, isLoading && styles.disabledButton]}
            onPress={handleSave}
            disabled={isLoading}
          >
            <Text style={styles.saveButtonText}>
              {isLoading ? 'Saving...' : 'Save'}
            </Text>
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
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: SIZES.padding * 4,
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
  photoSection: {
    alignItems: 'center',
    marginVertical: SIZES.padding * 2,
  },
  photoContainer: {
    position: 'relative',
    marginBottom: SIZES.padding,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.input,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  editIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  uploadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoHint: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  form: {
    paddingHorizontal: SIZES.padding * 2,
  },
  inputContainer: {
    marginBottom: SIZES.padding * 1.5,
  },
  inputLabel: {
    ...FONTS.body3,
    color: COLORS.text,
    marginBottom: SIZES.padding / 2,
  },
  input: {
    backgroundColor: COLORS.input,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    ...FONTS.body3,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.padding,
    alignItems: 'center',
    marginTop: SIZES.padding,
  },
  disabledButton: {
    opacity: 0.7,
  },
  saveButtonText: {
    ...FONTS.body3,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default AddEditChild; 