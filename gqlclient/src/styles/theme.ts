// /styles/theme.ts

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#263E3F',
      dark: '#172526',
    },
    secondary: {
      main: '#EBc4E7', // Accent color (red) for actions like Delete or Archive
      light: '#EBd4E7',

    },
    text: {
      primary: '#333', // Darker text color for main content
      secondary: '#757575', // Lighter text color for secondary content
    },
    background: {
      default: '#f4f4f4', // Light background for a cleaner look
    },
    action: {
      selected: '#EBF4E7',
      hover: '#9F9F9F',
      focus: '#172526',
    },
    divider: '#E0E0E0',
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h5: {
      fontWeight: 600, // Stronger weight for subjects
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 500, // Label names
      fontSize: '1.1rem',
    },
    body1: {
      fontSize: '1rem', // Default body text (email body)
    },
    body2: {
      fontSize: '0.875rem', // Secondary text like date or sender
      color: '#757575', // Lighter text color for secondary details
    },
    button: {
      fontWeight: 500, // Button text
    },
  },
});

export default theme;
