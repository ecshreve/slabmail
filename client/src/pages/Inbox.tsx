import Grid from '@mui/material/Grid2';
import React, { useEffect } from 'react';
import EmailDetails from '../components/email/EmailDetails';
import EmailList from '../components/email/EmailList';
import LabelList from '../components/label/LabelList';
import ErrorComponent from '../components/shared/ErrorComponent';
import Header from '../components/shared/Header';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { useEmailContext } from '../contexts/EmailContext';
import { fetchEmails, fetchLabels, updateStarredLabel } from '../services/emailService';
import { Email } from '../types/Email';
import { Label } from '../types/Label';

const Inbox: React.FC = () => {
  const { state, dispatch } = useEmailContext();
  const { emails, labels, selectedEmail, selectedLabel } = state;
  
  useEffect(() => {
    const getLabelsAndEmails = async () => {
      try {
        const fetchedLabels = await fetchLabels(); // Fetch labels from the backend
        dispatch({ type: 'SET_LABELS', payload: fetchedLabels });

        const fetchedEmails = await fetchEmails(); // Fetch emails from the backend
        dispatch({ type: 'SET_EMAILS', payload: fetchedEmails });
      } catch (err) {
        console.error('Failed to fetch emails and labels:', err);
      } 
    };
    getLabelsAndEmails();
  }, [dispatch]);

  const handleToggleStar = async (email: Email) => {
    await updateStarredLabel(email.id, !email.labelIds.includes('STARRED'));
    dispatch({ type: 'TOGGLE_STAR', payload: email });
  };

  const handleSelectEmail = (email: Email) => {
    dispatch({ type: 'SET_SELECTED_EMAIL', payload: email });
  };

  const handleSelectLabel = (label: Label) => {
    dispatch({ type: 'SET_SELECTED_LABEL', payload: label });
  };

  if (!emails.length) return <LoadingSpinner />;
  if (!labels.length) return <ErrorComponent message="Failed to load labels." />;

  return (
    <>
      <Header />
      <Grid container display="flex" height="100vh" spacing={2}>
        {/* Left Column: Label List */}
        <Grid size={2} sx={{ borderRight: '1px solid #e0e0e0', height: '100vh', overflowY: 'auto', padding: '16px' }}>
          <LabelList labels={labels} onSelectLabel={handleSelectLabel} />
        </Grid>

        {/* Left Column: Email List */}
        <Grid size={3} sx={{ borderRight: '1px solid #e0e0e0', height: '100vh', overflowY: 'auto' }}>
          <EmailList emails={emails} onSelectEmail={handleSelectEmail} onToggleStar={handleToggleStar} />
        </Grid>

        {/* Right Column: Email Details */}
        <Grid size={7} sx={{ padding: '16px', height: '100vh', overflowY: 'auto' }}>
          {selectedEmail ? (  
            <EmailDetails email={selectedEmail} />
          ) : (
            <Grid display="flex" justifyContent="center" alignItems="center" height="100%">
              <p>Select an email to view details</p>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Inbox;
