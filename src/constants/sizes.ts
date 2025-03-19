import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const SIZES = {
  // Global sizes
  base: 8,
  font: 14,
  radius: 8,
  padding: 10,
  margin: 10,
  
  // Font sizes
  largeTitle: 40,
  h1: 30,
  h2: 24,
  h3: 20,
  h4: 18,
  h5: 16,
  body1: 16,
  body2: 14,
  body3: 14,
  body4: 12,
  body5: 10,
  
  // Button sizes
  buttonHeight: 48,
  buttonRadius: 8,
  
  // Input sizes
  inputHeight: 48,
  inputRadius: 8,
  
  // Card sizes
  cardRadius: 16,
  cardPadding: 16,
  
  // Screen dimensions
  width,
  height,
  
  // Screen design sizes
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
};

export default SIZES; 