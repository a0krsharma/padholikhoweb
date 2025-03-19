import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FONTS, SIZES } from '../../constants';
import { AuthService } from '../../services/auth';

const SignUp = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | 'parent' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const roles = [
    { id: 'student', title: 'Student', icon: 'school-outline', description: 'Learn from expert teachers' },
    { id: 'teacher', title: 'Teacher', icon: 'book-outline', description: 'Teach and earn' },
    { id: 'parent', title: 'Parent', icon: 'people-outline', description: 'Monitor your child\'s progress' },
  ];

  const isFormValid = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return false;
    }
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return false;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    if (!selectedRole) {
      Alert.alert('Error', 'Please select a role');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!isFormValid()) return;

    setIsLoading(true);
    try {
      const userCredential = await AuthService.signUpWithEmail(email, password, selectedRole);
      // Update user profile with name
      await AuthService.updateProfile({ displayName: name });
      
      Alert.alert(
        'Success', 
        'Account created successfully!',
        [
          { 
            text: 'OK', 
            onPress: () => {
              // Navigate to appropriate dashboard based on role
              if (selectedRole === 'teacher') {
                navigation.replace('TeacherTabs');
              } else if (selectedRole === 'student') {
                navigation.replace('StudentTabs');
              } else {
                navigation.replace('ParentTabs');
              }
            }
          }
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true);
      await AuthService.signInWithGoogle();
      // Note: After Google sign-in, we would need to set the user role
      navigation.replace('RoleSelection');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Account</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={COLORS.gray}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons
                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color={COLORS.gray}
              />
            </TouchableOpacity>
          </View>

          {/* Role Selection */}
          <Text style={styles.sectionTitle}>Select your role</Text>
          <View style={styles.roleContainer}>
            {roles.map((role) => (
              <TouchableOpacity
                key={role.id}
                style={[
                  styles.roleCard,
                  selectedRole === role.id && styles.selectedRoleCard,
                ]}
                onPress={() => setSelectedRole(role.id as 'student' | 'teacher' | 'parent')}
              >
                <Ionicons
                  name={role.icon as any}
                  size={32}
                  color={selectedRole === role.id ? COLORS.white : COLORS.primary}
                />
                <Text
                  style={[
                    styles.roleTitle,
                    selectedRole === role.id && styles.selectedRoleText,
                  ]}
                >
                  {role.title}
                </Text>
                <Text
                  style={[
                    styles.roleDescription,
                    selectedRole === role.id && styles.selectedRoleText,
                  ]}
                >
                  {role.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.disabledButton]}
            onPress={handleSignUp}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Sign Up */}
          <TouchableOpacity
            style={styles.socialButton}
            onPress={handleGoogleSignUp}
            disabled={isLoading}
          >
            <MaterialIcons
              name="g-translate"
              size={24}
              color="#4285F4"
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Already have an account */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
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
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.text,
  },
  form: {
    paddingHorizontal: SIZES.padding * 2,
    paddingBottom: SIZES.padding * 3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.input,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding,
    paddingHorizontal: SIZES.padding,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    ...FONTS.body3,
    color: COLORS.text,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.text,
    marginTop: SIZES.padding,
    marginBottom: SIZES.padding,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding * 2,
  },
  roleCard: {
    width: '31%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.padding,
    backgroundColor: COLORS.input,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedRoleCard: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  roleTitle: {
    ...FONTS.h4,
    color: COLORS.text,
    marginTop: SIZES.padding / 2,
    marginBottom: 4,
    textAlign: 'center',
  },
  roleDescription: {
    ...FONTS.body5,
    color: COLORS.gray,
    textAlign: 'center',
    height: 30,
  },
  selectedRoleText: {
    color: COLORS.white,
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
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.padding,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    ...FONTS.body4,
    color: COLORS.gray,
    paddingHorizontal: SIZES.padding,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SIZES.padding,
  },
  socialIcon: {
    marginRight: 10,
  },
  socialButtonText: {
    ...FONTS.body3,
    color: COLORS.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SIZES.padding,
  },
  footerText: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  footerLink: {
    ...FONTS.body4,
    color: COLORS.primary,
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

export default SignUp; 