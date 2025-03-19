import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES, ICONS } from '../../constants';
import { AuthService } from '../../services/auth';
import { db } from '../../services/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

const RoleSelection = ({ navigation }: any) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    {
      id: 'student',
      title: 'Student',
      description: 'Learn from expert teachers, access resources, and track your progress.',
      icon: ICONS.student,
      destination: 'StudentTabs',
    },
    {
      id: 'teacher',
      title: 'Teacher',
      description: 'Share your knowledge, manage students, and grow your teaching practice.',
      icon: ICONS.teacher,
      destination: 'TeacherTabs',
    },
    {
      id: 'parent',
      title: 'Parent',
      description: 'Monitor your child\'s progress, communicate with teachers, and stay involved.',
      icon: ICONS.parent,
      destination: 'ParentTabs',
    },
  ];

  const handleContinue = async () => {
    if (!selectedRole) {
      Alert.alert('Error', 'Please select a role to continue');
      return;
    }

    setIsLoading(true);
    try {
      const currentUser = AuthService.getCurrentUser();
      if (!currentUser) {
        throw new Error('User not found');
      }

      // Update the user's role in Firestore
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, {
        userType: selectedRole,
        updatedAt: serverTimestamp(),
      });

      // Navigate to appropriate dashboard based on role
      const selectedRoleObj = roles.find(role => role.id === selectedRole);
      if (selectedRoleObj) {
        navigation.replace(selectedRoleObj.destination);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update role');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name={ICONS.back} size={24} color={COLORS.text} />
          </TouchableOpacity>
          <View style={styles.logoCircle}>
            <Ionicons name="book" size={30} color={COLORS.primary} />
          </View>
        </View>

        <Text style={styles.title}>Choose Your Role</Text>
        <Text style={styles.subtitle}>
          Select how you want to use Padho Likho. You can change this later in your profile settings.
        </Text>

        <View style={styles.rolesContainer}>
          {roles.map((role) => (
            <TouchableOpacity
              key={role.id}
              style={[
                styles.roleCard,
                selectedRole === role.id && styles.selectedRoleCard,
              ]}
              onPress={() => setSelectedRole(role.id)}
            >
              <View style={styles.roleHeader}>
                <View style={[styles.iconCircle, selectedRole === role.id && styles.selectedIconCircle]}>
                  <Ionicons 
                    name={role.icon} 
                    size={30} 
                    color={selectedRole === role.id ? COLORS.white : COLORS.primary} 
                  />
                </View>
                <View style={styles.roleTextContainer}>
                  <Text style={styles.roleTitle}>{role.title}</Text>
                  <Text style={styles.roleDescription}>{role.description}</Text>
                </View>
              </View>
              <View style={styles.radioContainer}>
                <View style={[
                  styles.radioOuter,
                  selectedRole === role.id && styles.selectedRadioOuter,
                ]}>
                  {selectedRole === role.id && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.button,
              (!selectedRole || isLoading) && styles.disabledButton,
            ]}
            onPress={handleContinue}
            disabled={!selectedRole || isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Processing...' : 'Continue'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signOutButton}
            onPress={async () => {
              await AuthService.signOut();
              navigation.replace('Login');
            }}
          >
            <Text style={styles.signOutText}>Sign out</Text>
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
    marginTop: SIZES.padding * 2,
    marginBottom: SIZES.padding * 3,
  },
  backButton: {
    padding: SIZES.padding,
  },
  logoCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.lightPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SIZES.padding * 2,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.text,
    marginBottom: SIZES.padding,
  },
  subtitle: {
    ...FONTS.body3,
    color: COLORS.gray,
    marginBottom: SIZES.padding * 3,
  },
  rolesContainer: {
    marginBottom: SIZES.padding * 3,
  },
  roleCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.padding * 2,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding * 1.5,
    backgroundColor: COLORS.white,
  },
  selectedRoleCard: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.lightPrimary,
  },
  roleHeader: {
    flexDirection: 'row',
    flex: 1,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.lightPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding * 1.5,
  },
  selectedIconCircle: {
    backgroundColor: COLORS.primary,
  },
  roleTextContainer: {
    flex: 1,
  },
  roleTitle: {
    ...FONTS.h3,
    color: COLORS.text,
    marginBottom: SIZES.padding / 2,
  },
  roleDescription: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  radioContainer: {
    marginLeft: SIZES.padding,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadioOuter: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  footer: {
    paddingHorizontal: SIZES.padding * 2,
    marginBottom: SIZES.padding * 3,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.padding,
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    ...FONTS.body3,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  signOutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.padding,
  },
  signOutText: {
    ...FONTS.body4,
    color: COLORS.primary,
  },
});

export default RoleSelection; 