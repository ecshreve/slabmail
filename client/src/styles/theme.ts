// /styles/theme.ts

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007bff', // Light blue
    },
    secondary: {
      main: '#f50057', // Accent color (red) for actions like Delete or Archive
    },
    text: {
      primary: '#333', // Darker text color for main content
      secondary: '#757575', // Lighter text color for secondary content
    },
    background: {
      default: '#f4f4f4', // Light background for a cleaner look
    },
    action: {
      selected: '#e8f0fe', // Light blue selected effect on emails
      focus: '#fff0fe', // Mid blue focus effect on emails
      hover: '#a2e3fc', // Darker blue hover effect on emails or buttons
    },
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
