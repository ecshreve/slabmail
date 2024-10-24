// /App.tsx
import { ThemeProvider } from '@mui/material/styles';
import React, { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Inbox from './pages/Inbox';
import theme from './styles/theme';
import tracer from './utils/otel';

const App: React.FC = () => {
  // useEffect(() => {
  //   refreshEmails()
  // }, [])

  useEffect(() => {
    const span = tracer.startSpan("App");

    const handleUnload = () => {
      span.end();
    };

    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("unload", handleUnload);
      span.end(); // Ensure the span is ended when the component unmounts
    };
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
