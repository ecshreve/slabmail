import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useCallback, useState } from 'react';
import EmailDetails from '../components/email/EmailDetails';
import EmailList from '../components/email/EmailList';
import LabelList from '../components/label/LabelList';
import Header from '../components/shared/Header';

const Inbox: React.FC = () => {
  const [selectedMessageId, setSelectedMessageId] = useState<string>('');
  const [selectedLabelId, setSelectedLabelId] = useState<string>('INBOX');

  const handleEmailSelect = useCallback((messageId: string) => {
    setSelectedMessageId(messageId); // Update the selected email state
  }, []);

  const handleLabelSelect = useCallback((labelId: string) => {
    setSelectedLabelId(labelId);
  }, []);

  return (
    <>
      <Header />
      <Grid container display="flex" height="100vh" spacing={2}>
        {/* Left Column: Label List */}
        <Grid size={3} sx={{ borderRight: '1px solid #e0e0e0', height: '100vh', overflowY: 'auto', padding: '16px' }}>
          <LabelList
            onSelectLabel={handleLabelSelect}
          />
        </Grid>
        {/* Left Column: Email List */}
        <Grid size={3} sx={{ borderRight: '1px solid #e0e0e0', height: '100vh', overflowY: 'auto' }}>
          <Typography variant="h6" sx={{ padding: '16px' }}>{selectedLabelId}</Typography>
          <EmailList
            labelId={selectedLabelId}
            onSelect={handleEmailSelect}
            onToggleStar={() => { }}
          />
        </Grid>
        {/* Right Column: Email Details */}
        <Grid size={6} sx={{ padding: '16px', height: '100vh', overflowY: 'auto' }}>
          {selectedMessageId && (
            <EmailDetails
              messageId={selectedMessageId}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Inbox;
