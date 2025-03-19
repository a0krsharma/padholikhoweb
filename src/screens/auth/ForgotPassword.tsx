import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../../constants';
import { AuthService } from '../../services/auth';

const ForgotPassword = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const isFormValid = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return false;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleResetPassword = async () => {
    if (!isFormValid()) return;

    setIsLoading(true);
    try {
      await AuthService.resetPassword(email);
      setResetSent(true);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to send reset password email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Forgot Password</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Form */}
        <View style={styles.form}>
          {!resetSent ? (
            <>
              <Text style={styles.subtitle}>
                Please enter your email address. We will send you a link to reset your password.
              </Text>

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

              <TouchableOpacity
                style={[styles.button, isLoading && styles.disabledButton]}
                onPress={handleResetPassword}
                disabled={isLoading}
              >
                <Text style={styles.buttonText}>
                  {isLoading ? 'Sending...' : 'Reset Password'}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.successContainer}>
              <Ionicons name="checkmark-circle" size={80} color={COLORS.success} />
              <Text style={styles.successTitle}>Email Sent</Text>
              <Text style={styles.successMessage}>
                We have sent a password reset link to {email}. Please check your email and follow the instructions to reset your password.
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.buttonText}>Back to Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Back to Login */}
        {!resetSent && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>Remember your password?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: SIZES.padding * 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    flex: 1,
    marginTop: SIZES.padding * 2,
  },
  subtitle: {
    ...FONTS.body3,
    color: COLORS.gray,
    marginBottom: SIZES.padding * 2,
    textAlign: 'center',
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
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZES.padding,
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    ...FONTS.body3,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.padding * 2,
  },
  successTitle: {
    ...FONTS.h2,
    color: COLORS.text,
    marginTop: SIZES.padding * 2,
    marginBottom: SIZES.padding,
  },
  successMessage: {
    ...FONTS.body3,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: SIZES.padding * 3,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SIZES.padding * 3,
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

export default ForgotPassword; 