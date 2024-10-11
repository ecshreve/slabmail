// /components/Email/EmailList.tsx
import { List } from '@mui/material';
import React from 'react';
import { Email } from '../../types/Email';
import EmailItem from './EmailItem';

interface EmailListProps {
  emails: Email[];
  onEmailClick: (id: string) => void;
  selectedEmailId: string | null;
}

const EmailList: React.FC<EmailListProps> = ({ emails, onEmailClick, selectedEmailId }) => {
  return (
    <List>
      {emails.map((email) => (
        <EmailItem key={email.id} email={email} onClick={() => onEmailClick(email.id)} selected={selectedEmailId === email.id} />
      ))}
    </List>
  );
};

export default EmailList;
