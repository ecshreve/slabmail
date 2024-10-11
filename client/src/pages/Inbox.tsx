import Grid from '@mui/material/Grid2';
import React, { useEffect, useState } from 'react';
import EmailDetails from '../components/email/EmailDetails';
import EmailList from '../components/email/EmailList';
import LabelList from '../components/label/LabelList';
import ErrorComponent from '../components/shared/ErrorComponent';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { fetchEmails, fetchLabels } from '../services/emailService'; // API service
import { Email } from '../types/Email';
import { Label } from '../types/Label';

const Inbox: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null); // Track selected email
  const [selectedLabel, setSelectedLabel] = useState<Label | null>(null); // Track selected label
  
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

  // Handle label click (when the user selects a label)
  const handleLabelClick = (labelId: string) => {
    const label = labels.find((l) => l.id === labelId); // Find the selected label by ID
    if (label) {
      setSelectedLabel(label); // Update the selected label
    }
  };

  const handleEmailClick = (emailId: string) => {
    const email = emails.find((e) => e.id === emailId); // Find the selected email by ID
    if (email) {
      setSelectedEmail(email);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorComponent message={error} />;

  return (
    <Grid container display="flex" height="100vh">
      {/* Left Column: Label List */}
      <Grid size={2} sx={{ borderRight: '1px solid #e0e0e0', height: '100vh', overflowY: 'auto' }}>
        <LabelList labels={labels} onLabelClick={handleLabelClick} />
      </Grid>

      {/* Left Column: Email List */}
      <Grid size={3} sx={{ borderRight: '1px solid #e0e0e0', height: '100vh', overflowY: 'auto' }}>
        <EmailList emails={emails} onEmailClick={handleEmailClick} />
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
  );
};

export default Inbox;
