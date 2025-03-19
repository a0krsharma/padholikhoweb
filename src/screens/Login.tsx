import React, { useState } from 'react';
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
  Modal
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, FONTS, SIZES } from '../constants';

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showGmailModal, setShowGmailModal] = useState(false);
  const [gmailEmail, setGmailEmail] = useState('');

  // Email validation
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

  // Password validation
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

  // Handle regular login
  const handleLogin = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      setLoading(true);
      
      // Simulate API call with better error handling
      setTimeout(() => {
        try {
          // In real app, this would be a try/catch around an API call
          setLoading(false);
          // Successful login - navigate to Main tab
          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          });
        } catch (error) {
          setLoading(false);
          Alert.alert(
            'Login Failed',
            'Unable to login. Please check your credentials and try again.',
            [{ text: 'OK' }]
          );
        }
      }, 1500);
    }
  };

  // Handle Gmail login
  const handleGmailLogin = () => {
    setShowGmailModal(true);
  };

  // Handle Gmail authentication confirmation
  const handleGmailConfirm = () => {
    if (!validateEmail(gmailEmail)) {
      return;
    }
    
    setLoading(true);
    setShowGmailModal(false);
    
    // Simulate Gmail auth API call with error handling
    setTimeout(() => {
      try {
        // Here would be the actual Gmail authentication logic
        setLoading(false);
        // Success - navigate to main app and reset navigation stack
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      } catch (error) {
        setLoading(false);
        Alert.alert(
          'Authentication Failed',
          'Unable to authenticate with Gmail. Please try again later.',
          [{ text: 'OK' }]
        );
      }
    }, 1500);
  };

  // Handle Facebook login
  const handleFacebookLogin = () => {
    Alert.alert(
      'Facebook Login',
      'Facebook login functionality will be implemented here.',
      [{ text: 'OK' }]
    );
  };

  // Handle Apple login
  const handleAppleLogin = () => {
    Alert.alert(
      'Apple Login',
      'Apple login functionality will be implemented here.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <MaterialCommunityIcons name="book-education" size={80} color={COLORS.primary} />
              <Text style={styles.logoText}>Padho Likho</Text>
            </View>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Log in to continue your learning journey</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor={COLORS.placeholder}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    validateEmail(text);
                  }}
                  onBlur={() => validateEmail(email)}
                  accessibilityLabel="Email input field"
                  autoComplete="email"
                  textContentType="emailAddress"
                />
              </View>
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.placeholder}
                  secureTextEntry={!passwordVisible}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    validatePassword(text);
                  }}
                  onBlur={() => validatePassword(password)}
                  accessibilityLabel="Password input field"
                  autoComplete="password"
                  textContentType="password"
                />
                <TouchableOpacity 
                  style={styles.visibilityIcon}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  <Ionicons 
                    name={passwordVisible ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color={COLORS.gray} 
                  />
                </TouchableOpacity>
              </View>
              {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>

            <TouchableOpacity 
              style={styles.forgotPasswordButton}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.loginButton, (loading || !email || !password) && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={loading || !email || !password}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} size="small" />
              ) : (
                <Text style={styles.loginButtonText}>Log In</Text>
              )}
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity 
                style={[styles.socialButton, styles.googleButton]}
                onPress={handleGmailLogin}
              >
                <Ionicons name="logo-google" size={20} color="#FFFFFF" />
                <Text style={styles.socialButtonText}>Gmail</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.socialButton, styles.facebookButton]}
                onPress={handleFacebookLogin}
              >
                <Ionicons name="logo-facebook" size={20} color="#FFFFFF" />
                <Text style={styles.socialButtonText}>Facebook</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.socialButton, styles.appleButton]}
                onPress={handleAppleLogin}
              >
                <Ionicons name="logo-apple" size={20} color="#FFFFFF" />
                <Text style={styles.socialButtonText}>Apple</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Gmail Login Modal */}
      <Modal
        visible={showGmailModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowGmailModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Gmail Login</Text>
              <TouchableOpacity onPress={() => setShowGmailModal(false)}>
                <Ionicons name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.gmailModalIcon}>
              <Ionicons name="logo-google" size={50} color="#DB4437" />
            </View>
            
            <Text style={styles.modalSubtitle}>
              Enter your Gmail address to login or create an account
            </Text>
            
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your Gmail address"
                  placeholderTextColor={COLORS.placeholder}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={gmailEmail}
                  onChangeText={(text) => {
                    setGmailEmail(text);
                    validateEmail(text);
                  }}
                  onBlur={() => validateEmail(gmailEmail)}
                  accessibilityLabel="Gmail input field"
                  autoComplete="email"
                  textContentType="emailAddress"
                  returnKeyType="done"
                  onSubmitEditing={handleGmailConfirm}
                />
              </View>
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>

            <TouchableOpacity 
              style={[styles.loginButton, (!gmailEmail) && styles.loginButtonDisabled]}
              onPress={handleGmailConfirm}
              disabled={!gmailEmail}
            >
              <Text style={styles.loginButtonText}>Continue with Gmail</Text>
            </TouchableOpacity>
            
            <Text style={styles.privacyText}>
              By continuing, you agree to our Terms of Service and Privacy Policy
            </Text>
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
    alignItems: 'center',
    paddingTop: SIZES.padding * 3,
    paddingHorizontal: SIZES.padding * 2,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SIZES.padding * 2,
  },
  logoText: {
    ...FONTS.h1,
    color: COLORS.primary,
    marginTop: SIZES.padding,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.text,
    marginBottom: SIZES.padding / 2,
  },
  subtitle: {
    ...FONTS.body3,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: SIZES.padding * 2,
  },
  formContainer: {
    paddingHorizontal: SIZES.padding * 2,
    flex: 1,
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: COLORS.input,
    borderRadius: SIZES.radius / 2,
    paddingHorizontal: SIZES.padding,
  },
  inputIcon: {
    marginRight: SIZES.padding / 2,
  },
  input: {
    flex: 1,
    ...FONTS.body3,
    color: COLORS.text,
  },
  visibilityIcon: {
    padding: SIZES.padding / 2,
  },
  errorText: {
    ...FONTS.body5,
    color: COLORS.error,
    marginTop: 4,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: SIZES.padding * 2,
  },
  forgotPasswordText: {
    ...FONTS.body4,
    color: COLORS.primary,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: SIZES.radius / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding * 2,
  },
  loginButtonDisabled: {
    backgroundColor: COLORS.primary + '80', // Add opacity
  },
  loginButtonText: {
    ...FONTS.body3,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.padding * 2,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginHorizontal: SIZES.padding,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding * 2,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.padding,
    borderRadius: SIZES.radius / 2,
    width: '30%',
  },
  googleButton: {
    backgroundColor: '#DB4437', // Google red
  },
  facebookButton: {
    backgroundColor: '#4267B2', // Facebook blue
  },
  appleButton: {
    backgroundColor: '#000000', // Apple black
  },
  socialButtonText: {
    ...FONTS.body4,
    color: COLORS.white,
    marginLeft: SIZES.padding / 2,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding * 3,
  },
  footerText: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  signUpText: {
    ...FONTS.body4,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
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
  modalSubtitle: {
    ...FONTS.body3,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: SIZES.padding * 2,
  },
  gmailModalIcon: {
    alignSelf: 'center',
    marginBottom: SIZES.padding * 2,
  },
  privacyText: {
    ...FONTS.body5,
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: SIZES.padding,
  },
});

export default Login; 