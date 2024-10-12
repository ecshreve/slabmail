// /components/Email/EmailList.tsx
import { List } from '@mui/material';
import React from 'react';
import { Email } from '../../types/Email';
import EmailItem from './EmailItem';

interface EmailListProps {
  emails: Email[];
  onSelectEmail: (email: Email) => void;
  onToggleStar: (email: Email) => void;
}

const EmailList: React.FC<EmailListProps> = ({ emails, onSelectEmail, onToggleStar }) => {  
  return (
    <List>
      {emails.map((email) => (
        <EmailItem key={email.id} email={email} onSelectEmail={onSelectEmail} onToggleStar={onToggleStar} />
      ))}
    </List>
  );
};

export default EmailList;
