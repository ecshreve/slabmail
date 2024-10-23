import Grid from '@mui/material/Grid2';
import React, { useState } from 'react';
import EmailDetails from '../components/email/EmailDetails';
import EmailList from '../components/email/EmailList';
import Header from '../components/shared/Header';
import { Email } from '../types/Email';

const Inbox: React.FC = () => {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  return (
    <>
      <Header />  
      <Grid container display="flex" height="100vh" spacing={2}>
        {/* Left Column: Email List */}
        <Grid size={4} sx={{ borderRight: '1px solid #e0e0e0', height: '100vh', overflowY: 'auto' }}>
          <EmailList />
        </Grid>
        {/* Right Column: Email Details */}
        <Grid size={8} sx={{ padding: '16px', height: '100vh', overflowY: 'auto' }}>
          {selectedEmail && (
            <EmailDetails 
              email={selectedEmail} 
              onToggleStar={() => {}} 
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Inbox;
