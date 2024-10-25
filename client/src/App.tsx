// /App.tsx
import { ThemeProvider } from '@mui/material/styles';
import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Inbox from './pages/Inbox';
import theme from './styles/theme';
import tracer from './utils/otel';
import { refreshEmails } from './utils/sync';

const App: React.FC = () => {
  useEffect(() => {
    tracer.startActiveSpan("App", async (span) => {
      await refreshEmails();
      window.addEventListener("unload", () => {
        span.end();
      });
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Inbox />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
