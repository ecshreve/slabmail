import Grid from '@mui/material/Grid2';
import React, { useEffect, useState } from 'react';
import EmailDetails from '../components/email/EmailDetails';
import EmailList from '../components/email/EmailList';
import ErrorComponent from '../components/shared/ErrorComponent';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { fetchEmails } from '../services/emailService'; // API service
import { Email } from '../types/Email';
const Inbox: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<any | null>(null); // Track selected email

  useEffect(() => {
    const getEmails = async () => {
      try {
        const fetchedEmails = await fetchEmails(); // Fetch emails from the backend
        setEmails(fetchedEmails);
      } catch (err) {
        setError('Failed to fetch emails.');
      } finally {
        setLoading(false);
      }
    };

    getEmails();
  }, []); // Run once on mount

  const handleEmailClick = (emailId: string) => {
    const email = emails.find((e) => e.id === emailId); // Find the selected email by ID
    setSelectedEmail(email);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorComponent message={error} />;

  return (

    <Grid container display="flex" height="100vh">
      {/* Left Column: Email List */}
      <Grid size={4} sx={{ borderRight: '1px solid #e0e0e0', height: '100vh', overflowY: 'auto' }}>
        <EmailList emails={emails} onEmailClick={handleEmailClick} selectedEmailId={selectedEmail?.id || null} />
      </Grid>   

      {/* Right Column: Email Details */}
      <Grid size={8} sx={{ padding: '16px', height: '100vh', overflowY: 'auto' }}>
        {selectedEmail ? (
          <EmailDetails email={selectedEmail} />
        ) : (
          <Grid display="flex" justifyContent="center" alignItems="center" height="100%">
            <p>Select an email to view details</p>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Inbox;
