import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import EmailDetails from '../components/email/EmailDetails';
import EmailList from '../components/email/EmailList';
import Header from '../components/header/Header';
import { Email } from '../types/Email';
import { starEmail } from '../utils/dbdexie';
import tracer from '../utils/otel';
import { pushStarred } from '../utils/sync';

const Inbox: React.FC = () => {
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);


  useEffect(() => {
    tracer.startActiveSpan("Inbox", async (span) => {
      window.addEventListener("onunload", () => {
        span.end();
      });
    });
  }, []);

  const handleSelect = (id: string) => {
    tracer.startActiveSpan("handleSelect", async (span) => {
      setSelectedEmailId(id);
      span.end();
    });
  };

  const handleStarClick = async (email: Email) => {
    tracer.startActiveSpan("handleStarClick", async (span) => {
      await Promise.all([
        starEmail(email),
        pushStarred(email),
      ]);
      span.end();
    });
  };

  return (
    <>
      <Header title="slabmail" onClick={() => { }} />
      <Box display="flex" height="100vh">
        <Box
          sx={{
            width: '400px',
            borderRight: '1px solid #ccc',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <EmailList
            selectedEmailId={selectedEmailId}
            onSelect={handleSelect}
            onStarClick={handleStarClick}
          />
        </Box>
        <EmailDetails
          emailId={selectedEmailId ?? ''}
          onStarClick={handleStarClick}
        />
      </Box>
    </>
  );
};

export default Inbox;
