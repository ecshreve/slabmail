// /App.tsx
import { ThemeProvider } from '@mui/material/styles';
import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { EmailProvider } from './contexts/EmailContext';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import Inbox from './pages/Inbox';
import theme from './styles/theme';
import { syncEmails } from './utils/sync';

const App: React.FC = () => {
  const online = useOnlineStatus();

  useEffect(() => {
    if (online) {
      syncEmails();
    }
  }, [online]);
  
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
