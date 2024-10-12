import Grid from '@mui/material/Grid2';
import React, { useEffect, useState } from 'react';
import EmailDetails from '../components/email/EmailDetails';
import EmailList from '../components/email/EmailList';
import LabelList from '../components/label/LabelList';
import ErrorComponent from '../components/shared/ErrorComponent';
import Header from '../components/shared/Header';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { fetchEmails, fetchLabels, updateStarredLabel } from '../services/emailService'; // API service
import { Email } from '../types/Email';
import { Label } from '../types/Label';

const Inbox: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null); // Track selected email

  useEffect(() => {
    const getLabelsAndEmails = async () => {
      try {
        const fetchedLabels = await fetchLabels(); // Fetch labels from the backend
        setLabels(fetchedLabels);

        const fetchedEmails = await fetchEmails(); // Fetch emails from the backend
        setEmails(fetchedEmails);
      } catch (err) {
        setError('Failed to fetch emails and labels.');
      } finally {
        setLoading(false);
      }
    };
    getLabelsAndEmails();
  }, []); // Run once on mount

  const handleEmailClick = (emailId: string) => {
    const email = emails.find((e) => e.id === emailId); // Find the selected email by ID
    if (email) {
      setSelectedEmail(email);
    }
  };

// Function to toggle the star status and update the backend
const handleToggleStar = async (emailId: string) => {
  try {
    const email = emails.find((e) => e.id === emailId);
    const isStarred = email?.labelIds.includes('STARRED');
    const updatedEmail = await updateStarredLabel(emailId, !isStarred); // API call to update the backend

    // Update the email list state to reflect the new star status
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === emailId ? { ...email, labelIds: updatedEmail.labelIds } : email
      )
    );

    setLabels((prevLabels) =>
      prevLabels.map((label) =>
        label.id === 'STARRED' ? { ...label, messagesTotal: label.messagesTotal + (isStarred ? -1 : 1) } : label
      )
    );
  } catch (error) {
    console.error('Failed to update star status:', error);
    // Optionally handle error (e.g., rollback the UI change or show a message)
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorComponent message={error} />;

  return (
    <>
      <Header />
      <Grid container display="flex" height="100vh" spacing={2}>
        {/* Left Column: Label List */}
        <Grid size={2} sx={{ borderRight: '1px solid #e0e0e0', height: '100vh', overflowY: 'auto', padding: '16px' }}>
          <LabelList labels={labels} />
        </Grid>

        {/* Left Column: Email List */}
        <Grid size={3} sx={{ borderRight: '1px solid #e0e0e0', height: '100vh', overflowY: 'auto' }}>
          <EmailList emails={emails} onEmailClick={handleEmailClick} onToggleStar={handleToggleStar} />
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
