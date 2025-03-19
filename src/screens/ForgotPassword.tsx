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
  Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants';

const ForgotPassword = ({ navigation }: any) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    
    // Mock password reset action
    Alert.alert(
      'Password Reset Email Sent',
      `We've sent a password reset link to ${email}. Please check your inbox.`,
      [
        { 
          text: 'OK', 
          onPress: () => navigation.navigate('Auth', { screen: 'Login' }) 
        }
      ]
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
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>Enter your email address to reset your password</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={COLORS.placeholder}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <TouchableOpacity 
              style={styles.resetButton}
              onPress={handleResetPassword}
            >
              <Text style={styles.resetButtonText}>Reset Password</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.navigate('Auth', { screen: 'Login' })}>
              <Text style={styles.rememberPasswordText}>Remember password? Login</Text>
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
  header: {
    paddingTop: SIZES.padding * 3,
    paddingHorizontal: SIZES.padding * 2,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: SIZES.padding * 3,
    left: SIZES.padding * 2,
    zIndex: 1,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SIZES.padding / 2,
    marginTop: SIZES.padding,
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
    marginBottom: SIZES.padding * 2,
  },
  inputLabel: {
    ...FONTS.body4,
    color: COLORS.text,
    marginBottom: SIZES.padding / 2,
  },
  input: {
    height: 50,
    backgroundColor: COLORS.input,
    borderRadius: SIZES.radius / 2,
    paddingHorizontal: SIZES.padding,
    ...FONTS.body3,
    color: COLORS.text,
  },
  resetButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: SIZES.radius / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding * 2,
  },
  resetButtonText: {
    ...FONTS.body3,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding * 3,
  },
  rememberPasswordText: {
    ...FONTS.body4,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default ForgotPassword; 