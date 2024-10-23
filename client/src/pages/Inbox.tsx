import Grid from '@mui/material/Grid2';
import React, { useState } from 'react';
import EmailDetails from '../components/email/EmailDetails';
import EmailList from '../components/email/EmailList';
import Header from '../components/shared/Header';


const Inbox: React.FC = () => {
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [selectedEmailPage, setSelectedEmailPage] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleHeaderClick = () => {
    setCurrentPage(1);
  };

  const handleEmailClick = (id: string) => {
    setSelectedEmailId(id);
    setSelectedEmailPage(currentPage);
  };

  return (
    <>
      <Header title="slabmail" onClick={handleHeaderClick} />  
      <Grid container display="flex" height="100vh" spacing={2}>
        {/* Left Column: Email List */}
        <Grid size={4} sx={{ borderRight: '1px solid #e0e0e0', height: '100vh', overflowY: 'auto' }}>
          <EmailList
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onSelectEmail={handleEmailClick}
            selectedEmailPage={selectedEmailPage}
          />
        </Grid>
        {/* Right Column: Email Details */}
        <Grid size={8} sx={{ padding: '16px', height: '100vh', overflowY: 'auto' }}>
          {selectedEmailId && (
            <EmailDetails 
              emailId={selectedEmailId} 
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Inbox;
