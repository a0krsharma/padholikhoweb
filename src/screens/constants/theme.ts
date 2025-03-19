import { COLORS } from './colors';

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,
  margin: 20,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,
  small: 10,
};

export const FONTS = {
  largeTitle: { 
    fontFamily: 'Roboto',
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: { 
    fontFamily: 'Roboto',
    fontSize: SIZES.h1,
    lineHeight: 36,
    fontWeight: 'bold',
  },
  h2: { 
    fontFamily: 'Roboto',
    fontSize: SIZES.h2,
    lineHeight: 30,
    fontWeight: 'bold',
  },
  h3: { 
    fontFamily: 'Roboto',
    fontSize: SIZES.h3,
    lineHeight: 22,
    fontWeight: 'bold',
  },
  h4: { 
    fontFamily: 'Roboto',
    fontSize: SIZES.h4,
    lineHeight: 22,
    fontWeight: 'bold',
  },
  body1: { 
    fontFamily: 'Roboto',
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: { 
    fontFamily: 'Roboto',
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: { 
    fontFamily: 'Roboto',
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: { 
    fontFamily: 'Roboto',
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: { 
    fontFamily: 'Roboto',
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme; 