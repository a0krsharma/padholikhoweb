import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS, SIZES } from '../constants';

const OnBoarding3 = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Image Placeholder */}
        <View style={styles.imageContainer}>
          <Ionicons name="school" size={150} color={COLORS.primary} />
        </View>

        <Text style={styles.title}>Learn & Grow</Text>
        <Text style={styles.description}>
          Enhance your knowledge and skills with our expert teachers. Track your progress and achieve your academic goals.
        </Text>

        <View style={styles.pagination}>
          <View style={styles.paginationDot} />
          <View style={styles.paginationDot} />
          <View style={[styles.paginationDot, styles.paginationDotActive]} />
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Auth', { screen: 'Login' })}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding * 2,
  },
  imageContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: 150,
    marginBottom: SIZES.padding * 3,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.text,
    marginBottom: SIZES.padding,
    textAlign: 'center',
  },
  description: {
    ...FONTS.body3,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: SIZES.padding * 3,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.lightGray,
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: COLORS.primary,
    width: 20,
  },
  footer: {
    padding: SIZES.padding * 2,
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 60,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    ...FONTS.body2,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default OnBoarding3; 