import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import EmailDetails from '../components/email/EmailDetails';
import EmailList from '../components/email/EmailList';
import LabelList from '../components/label/LabelList';
import ErrorComponent from '../components/shared/ErrorComponent';
import Header from '../components/shared/Header';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { EmailContext } from '../contexts/EmailContext';
import { fetchDefaultLabels, fetchEmails, updateEmailStarred } from '../services/emailService';
import { Email } from '../types/Email';
import { Label } from '../types/Label';

const Inbox: React.FC = () => {
  const { state, dispatch } = useContext(EmailContext);
  const { emails, loading, error } = state;

  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [selectedLabelId, setSelectedLabelId] = useState<string | null>('INBOX');
  const [labels, setLabels] = useState<Label[]>([]);
  
  // Fetch emails when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_EMAILS_START' });
      try {
        const fetchedEmails = await fetchEmails();
        dispatch({ type: 'FETCH_EMAILS_SUCCESS', payload: fetchedEmails });
      } catch (error) {
        dispatch({ type: 'FETCH_EMAILS_ERROR', payload: 'Failed to fetch emails' });
      }
    };
    fetchData();
  }, [dispatch]);


  useEffect(() => {
    const fetchLabels = async () => {
      const fetchedLabels = await fetchDefaultLabels();
      setLabels(fetchedLabels);
    };
    fetchLabels();
  }, []);

  // Handle toggling the star and updating the label count
  const handleToggleStar = async (emailId: string, isStarred: boolean) => {
    try {
      await updateEmailStarred(emailId, isStarred);
      dispatch({ type: 'TOGGLE_STAR', payload: { emailId, isStarred } });
    } catch (error) {
      console.error('Error toggling star status', error);
    }
  };

  const handleEmailSelect = (email: Email) => {
    setSelectedEmail(email); // Update the selected email state
  };

  const handleLabelSelect = useCallback((labelId: string) => {
    setSelectedLabelId(labelId);
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorComponent message={error || ''} />;

  return (
    <>
      <Header />  
      <Grid container display="flex" height="100vh" spacing={2}>
        {/* Left Column: Label List */}
        <Grid size={3} sx={{ borderRight: '1px solid #e0e0e0', height: '100vh', overflowY: 'auto', padding: '16px' }}>
          <LabelList 
            labels={labels}
            onSelectLabel={(labelId) => handleLabelSelect(labelId)} 
          />
        </Grid>
        {/* Left Column: Email List */}
        <Grid size={3} sx={{ borderRight: '1px solid #e0e0e0', height: '100vh', overflowY: 'auto' }}>
          <Typography variant="h6" sx={{ padding: '16px' }}>{selectedLabelId}</Typography>
          <EmailList 
            emails={emails.filter(email => selectedLabelId ? email.labelIds.includes(selectedLabelId) : true)} 
            selectedEmail={selectedEmail}
            onSelectEmail={handleEmailSelect} 
            onToggleStar={handleToggleStar} 
          />
        </Grid>
        {/* Right Column: Email Details */}
        <Grid size={6} sx={{ padding: '16px', height: '100vh', overflowY: 'auto' }}>
          {selectedEmail && (
            <EmailDetails 
              email={selectedEmail} 
              onToggleStar={handleToggleStar} 
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Inbox;
