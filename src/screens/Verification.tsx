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
  ScrollView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants';

const Verification = ({ navigation }: any) => {
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < 3) {
      const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
      if (nextInput) {
        (nextInput as HTMLElement).focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`input[name=otp-${index - 1}]`);
      if (prevInput) {
        (prevInput as HTMLElement).focus();
      }
    }
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
            <Text style={styles.title}>Verification</Text>
            <Text style={styles.subtitle}>Enter the verification code sent to your email</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  name={`otp-${index}`}
                  style={styles.otpInput}
                  maxLength={1}
                  keyboardType="number-pad"
                  value={digit}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  contextMenuHidden
                />
              ))}
            </View>

            <TouchableOpacity 
              style={styles.verifyButton}
              onPress={() => navigation.navigate('Main')}
            >
              <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>

            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>Didn't receive the code? </Text>
              <TouchableOpacity>
                <Text style={styles.resendButton}>Resend</Text>
              </TouchableOpacity>
            </View>
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
    alignItems: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: SIZES.padding * 3,
  },
  otpInput: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.input,
    borderRadius: SIZES.radius / 2,
    textAlign: 'center',
    ...FONTS.h2,
    color: COLORS.text,
  },
  verifyButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: SIZES.radius / 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: SIZES.padding * 2,
  },
  verifyButtonText: {
    ...FONTS.body3,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resendText: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  resendButton: {
    ...FONTS.body4,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default Verification; 