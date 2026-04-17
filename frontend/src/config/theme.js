// Theme colors configuration
export const colors = {
  primary: {
    main: '#7b5caa',
    light: '#9b7cc4',
    lighter: '#bb9cde',
    dark: '#5b3c8a',
    darker: '#3b1c6a',
  },
  base: {
    light: '#faf7f5', // Light mode base
    dark: '#1a1a1c',  // Dark mode base
  },
  text: {
    light: '#faf7f5', // Light mode text (same as base light for contrast)
    dark: '#2a2a2d',  // Dark mode text
  },
  border: '#252629',
  surface: {
    light: '#ffffff',
    dark: '#1f1f22',
  },
  background: {
    light: '#f5f6f0',
    dark: '#0f0f11',
  },
  secondary: {
    light: '#565e64',
    dark: '#989ea4',
  },
  navborder:{
    dark: '#e0e0e0',
    light: '#333333',
  },
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
};



export const lightTheme = {
  mode: 'light',
  colors: {
    primary: colors.primary.main,
    primaryLight: colors.primary.light,
    primaryDark: colors.primary.dark,
    background: colors.background.light,
    surface: colors.surface.light,
    text: colors.text.dark,
    border: colors.border,
    secondary: colors.secondary.light,
    navborder: colors.navborder.light,
  },
};

export const darkTheme = {
  mode: 'dark',
  colors: {
    primary: colors.primary.main,
    primaryLight: colors.primary.light,
    primaryDark: colors.primary.dark,
    background: colors.background.dark,
    surface: colors.surface.dark,
    text: colors.text.light,
    border: colors.border,
    secondary: colors.secondary.dark,
    navborder: colors.navborder.dark, 
  },
};
