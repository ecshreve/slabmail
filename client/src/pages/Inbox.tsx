import { Box } from '@mui/material';
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
      <Box display="flex" height="100vh">
        {/* Left Column: Email List */}
          <EmailList
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onSelectEmail={handleEmailClick}
            selectedEmailPage={selectedEmailPage}
          />
        {/* Right Column: Email Details */}
        <EmailDetails 
          emailId={selectedEmailId} 
        />
      </Box>
    </>
  );
};

export default Inbox;
