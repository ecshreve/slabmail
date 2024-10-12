// /components/Email/EmailList.tsx
import { List } from '@mui/material';
import React from 'react';
import { Email } from '../../types/Email';
import EmailItem from './EmailItem';

interface EmailListProps {
  emails: Email[];
  onSelectEmail: (email: Email) => void;
  onToggleStar: (emailId: string, isStarred: boolean) => void;
}

const EmailList: React.FC<EmailListProps> = ({ emails, onSelectEmail, onToggleStar }) => {  
  return (
    <List sx={{ display: 'flex', flexDirection: 'column', padding: 0, borderRadius: '3px', gap: '10px', width: '100%' }} >
      {emails.map((email) => (
        <EmailItem 
          key={email.id} 
          email={email} 
          onSelectEmail={onSelectEmail}
          onToggleStar={onToggleStar}
        />
      ))}
    </List>
  );
};

export default EmailList;
