// /styles/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue
    },
    secondary: {
      main: '#f50057', // Pink
    },
    background: {
      default: '#f5f5f5', // Light gray background
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h5: {
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
  },
  spacing: 8, // Default spacing unit is 8px
});

export default theme;
