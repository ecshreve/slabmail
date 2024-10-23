// src/components/EmailList.tsx

import { List } from '@mui/material';
import React, { useContext, useState } from 'react';
import { EmailContext } from '../../contexts/EmailContext';
import EmailListItem from './EmailListItem';

interface EmailListProps {
  onSelectEmail: (emailId: string) => void;
}

const EmailList: React.FC<EmailListProps> = ({ onSelectEmail }) => {
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const { emails, toggleStarred } = useContext(EmailContext);

  const handleSelectEmail = (emailId: string) => {
    setSelectedEmailId(emailId);
    onSelectEmail(emailId);
  };

  return (
    <List>
      {emails.map((email) => (
        <EmailListItem
          key={email.id}
          email={email}
          selectedEmailId={selectedEmailId}
          handleSelectEmail={handleSelectEmail}
          toggleStarred={toggleStarred}
        />
      ))}
    </List>
  );
};

export default EmailList;
