import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { COLORS, FONTS, SIZES } from '../constants';

const OnBoarding2 = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Image Placeholder */}
        <View style={styles.imageContainer}>
          <Fontisto name="date" size={150} color={COLORS.primary} />
        </View>

        <Text style={styles.title}>Schedule Classes</Text>
        <Text style={styles.description}>
          Book sessions with teachers at your convenience. Learn anytime, anywhere with our flexible scheduling system.
        </Text>

        <View style={styles.pagination}>
          <View style={styles.paginationDot} />
          <View style={[styles.paginationDot, styles.paginationDotActive]} />
          <View style={styles.paginationDot} />
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('OnBoarding3')}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={() => navigation.navigate('Auth', { screen: 'Login' })}
        >
          <Text style={styles.skipButtonText}>Skip</Text>
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
    marginBottom: SIZES.padding,
  },
  buttonText: {
    ...FONTS.body2,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  skipButton: {
    height: 60,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButtonText: {
    ...FONTS.body3,
    color: COLORS.gray,
  },
});

export default OnBoarding2; 