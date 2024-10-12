import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useContext, useEffect } from 'react';
import EmailDetails from '../components/email/EmailDetails';
import EmailList from '../components/email/EmailList';
import LabelList from '../components/label/LabelList';
import ErrorComponent from '../components/shared/ErrorComponent';
import Header from '../components/shared/Header';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { EmailContext } from '../contexts/EmailContext';
import { LabelContext } from '../contexts/LabelContext';
import { fetchEmails, fetchLabels, updateStarredLabel } from '../services/emailService';
import { Email } from '../types/Email';
import { Label } from '../types/Label';

const Inbox: React.FC = () => {
  const { state: emailState, dispatch: emailDispatch } = useContext(EmailContext);
  const { state: labelState, dispatch: labelDispatch } = useContext(LabelContext);
  const { emails, loading: emailLoading, error: emailError, selectedEmail } = emailState;
  const { labels, loading: labelLoading, error: labelError, selectedLabel } = labelState;

  // Fetch emails when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      emailDispatch({ type: 'FETCH_EMAILS_START' });
      try {
        const fetchedEmails = await fetchEmails();
        emailDispatch({ type: 'FETCH_EMAILS_SUCCESS', payload: fetchedEmails });
      } catch (error) {
        emailDispatch({ type: 'FETCH_EMAILS_ERROR', payload: 'Failed to fetch emails' });
      }

      labelDispatch({ type: 'FETCH_LABELS_START' });
      try {
        const fetchedLabels = await fetchLabels();
        labelDispatch({ type: 'FETCH_LABELS_SUCCESS', payload: fetchedLabels });
      } catch (error) {
        labelDispatch({ type: 'FETCH_LABELS_ERROR', payload: 'Failed to fetch labels' });
      }
    };
    fetchData();
  }, [emailDispatch, labelDispatch]);

  // Handle toggling the star and updating the label count
  const handleToggleStar = async (emailId: string, newStarredValue: boolean) => {
    try {
      await updateStarredLabel(emailId, newStarredValue);
      const email = emails.find(e => e.id === emailId);
      if (!email) return;
      emailDispatch({ type: 'TOGGLE_STAR', payload: { ...email, labelIds: newStarredValue ? [...email.labelIds, 'STARRED'] : email.labelIds.filter(id => id !== 'STARRED')} });

      // Update the label count in the label reducer
      labelDispatch({
        type: 'UPDATE_LABEL_COUNT',
        payload: { labelName: 'STARRED', delta: newStarredValue ? 1 : -1 },
      });
    } catch (error) {
      console.error('Error toggling star status', error);
    }
  };

  const handleSelectLabel = (label: Label) => {
    labelDispatch({ type: 'SELECT_LABEL', payload: label });
  };

  const handleSelectEmail = (email: Email) => {
    emailDispatch({ type: 'SELECT_EMAIL', payload: email });
  };

  if (emailLoading || labelLoading) return <LoadingSpinner />;
  if (emailError || labelError) return <ErrorComponent message={emailError || labelError || ''} />;

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
          <Typography variant="h6" sx={{ padding: '16px' }}>{selectedLabel?.name || 'All Emails'}</Typography>
          <EmailList emails={emails} onToggleStar={(emailId, newStarredValue) => handleToggleStar(emailId, newStarredValue)} onSelectEmail={handleSelectEmail} />
        </Grid>
        {/* Right Column: Email Details */}
        <Grid size={7} sx={{ padding: '16px', height: '100vh', overflowY: 'auto' }}>
          {selectedEmail && (
            <EmailDetails email={selectedEmail} />
          ) || (
            <Box sx={{ padding: '16px' }}>
              <p>Select an email to view details</p>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Inbox;
