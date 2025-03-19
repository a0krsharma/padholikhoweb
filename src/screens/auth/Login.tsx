import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES, ICONS } from '../../constants';

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
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

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const handleLogin = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      // Check if user is a teacher, student, or parent
      // For demo purpose, navigate to role selection
      navigation.navigate('RoleSelection');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidView}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Ionicons name="book" size={60} color={COLORS.primary} />
            </View>
            <Text style={styles.appName}>Padho Likho</Text>
            <Text style={styles.tagline}>Learn Anytime, Anywhere</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Log in to your account</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <View style={[styles.inputContainer, emailError ? styles.inputError : null]}>
                <Ionicons name={ICONS.mail} size={20} color={COLORS.gray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor={COLORS.gray}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (emailError) validateEmail(text);
                  }}
                />
              </View>
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={[styles.inputContainer, passwordError ? styles.inputError : null]}>
                <Ionicons name={ICONS.lock} size={20} color={COLORS.gray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.gray}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (passwordError) validatePassword(text);
                  }}
                />
                <TouchableOpacity
                  style={styles.toggleButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={COLORS.gray}
                  />
                </TouchableOpacity>
              </View>
              {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>

            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>

            <View style={styles.separatorContainer}>
              <View style={styles.separator} />
              <Text style={styles.separatorText}>OR</Text>
              <View style={styles.separator} />
            </View>

            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name={ICONS.google} size={24} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name={ICONS.facebook} size={24} color="#4267B2" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name={ICONS.apple} size={24} color="#000000" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  keyboardAvoidView: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: SIZES.padding * 5,
    marginBottom: SIZES.padding * 3,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.lightPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  appName: {
    ...FONTS.h1,
    color: COLORS.primary,
    marginBottom: SIZES.padding / 2,
  },
  tagline: {
    ...FONTS.body3,
    color: COLORS.gray,
  },
  formContainer: {
    paddingHorizontal: SIZES.padding * 3,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.text,
    marginBottom: SIZES.padding / 2,
  },
  subtitle: {
    ...FONTS.body3,
    color: COLORS.gray,
    marginBottom: SIZES.padding * 2,
  },
  inputGroup: {
    marginBottom: SIZES.padding * 1.5,
  },
  inputLabel: {
    ...FONTS.body3,
    color: COLORS.text,
    marginBottom: SIZES.padding / 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: SIZES.inputRadius,
    paddingHorizontal: SIZES.padding,
    height: SIZES.inputHeight,
    backgroundColor: COLORS.white,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  inputIcon: {
    marginRight: SIZES.padding,
  },
  input: {
    flex: 1,
    ...FONTS.body3,
    color: COLORS.text,
    height: '100%',
  },
  toggleButton: {
    padding: SIZES.padding / 2,
  },
  errorText: {
    ...FONTS.body5,
    color: COLORS.error,
    marginTop: SIZES.padding / 2,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: SIZES.padding * 2,
  },
  forgotPasswordText: {
    ...FONTS.body4,
    color: COLORS.primary,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.buttonRadius,
    height: SIZES.buttonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding * 2,
  },
  loginButtonText: {
    ...FONTS.button,
    color: COLORS.white,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.padding * 2,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.lightGray,
  },
  separatorText: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginHorizontal: SIZES.padding,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SIZES.padding * 3,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SIZES.padding,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: SIZES.padding * 3,
  },
  signupText: {
    ...FONTS.body3,
    color: COLORS.text,
  },
  signupButtonText: {
    ...FONTS.body3,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginLeft: SIZES.padding / 2,
  },
});

export default Login; 