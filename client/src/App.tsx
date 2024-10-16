// /App.tsx
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { EmailProvider } from './contexts/EmailContext';
import Inbox from './pages/Inbox';
import theme from './styles/theme';

const App: React.FC = () => {
  return (
    <EmailProvider>
      <ThemeProvider theme={theme}>
        <Router>
            <Routes>
              <Route path="/" element={<Inbox />} />
            </Routes>
          </Router>
      </ThemeProvider>
    </EmailProvider>
  );
};

export default App;
