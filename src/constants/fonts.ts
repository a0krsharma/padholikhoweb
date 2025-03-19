import { Platform } from 'react-native';

const fontFamily = Platform.OS === 'ios' ? 'System' : 'Roboto';

// Define fontWeight type to match React Native's allowed values
type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

const FONTS = {
  // Headings
  h1: {
    fontFamily,
    fontSize: 30,
    fontWeight: 'bold' as FontWeight,
    lineHeight: 36,
  },
  h2: {
    fontFamily,
    fontSize: 24,
    fontWeight: 'bold' as FontWeight,
    lineHeight: 30,
  },
  h3: {
    fontFamily,
    fontSize: 20,
    fontWeight: 'bold' as FontWeight,
    lineHeight: 26,
  },
  h4: {
    fontFamily,
    fontSize: 18,
    fontWeight: 'bold' as FontWeight,
    lineHeight: 22,
  },
  h5: {
    fontFamily,
    fontSize: 16,
    fontWeight: 'bold' as FontWeight,
    lineHeight: 20,
  },
  
  // Body text
  body1: {
    fontFamily,
    fontSize: 16,
    lineHeight: 24,
  },
  body2: {
    fontFamily,
    fontSize: 14,
    lineHeight: 20,
  },
  body3: {
    fontFamily,
    fontSize: 14,
    lineHeight: 20,
  },
  body4: {
    fontFamily,
    fontSize: 12,
    lineHeight: 18,
  },
  body5: {
    fontFamily,
    fontSize: 10,
    lineHeight: 14,
  },
  
  // Button text
  button: {
    fontFamily,
    fontSize: 16,
    fontWeight: 'bold' as FontWeight,
  },
  buttonSmall: {
    fontFamily,
    fontSize: 14,
    fontWeight: 'bold' as FontWeight,
  },
  
  // Caption & overline
  caption: {
    fontFamily,
    fontSize: 12,
    lineHeight: 16,
  },
  overline: {
    fontFamily,
    fontSize: 10,
    lineHeight: 14,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
};

export default FONTS; 