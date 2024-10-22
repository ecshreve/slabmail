// /components/Email/EmailList.tsx
import { List } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchEmailsByLabelId } from '../../services/emailService';
import { Email } from '../../types/Email';
import EmailItem from './EmailItem';
interface EmailListProps {
  labelId: string;
  onSelectEmail: (email: Email) => void;
  onToggleStar: (emailId: string, isStarred: boolean) => void;
}

const EmailList: React.FC<EmailListProps> = ({ labelId, onSelectEmail, onToggleStar }) => {
  const [ emails, setEmails ] = useState<Email[]>([]);
  const [ selectedEmail, setSelectedEmail ] = useState<Email | null>(null);

  useEffect(() => {
    const fetchEmails = async () => {
      const emails = await fetchEmailsByLabelId(labelId);
      setEmails(emails);
    };
    fetchEmails();
  }, [labelId]);

  return (
    <List sx={{ display: 'flex', flexDirection: 'column', padding: 0, borderRadius: '3px', gap: '10px', width: '100%' }} >
      {emails.map((email) => (
        <EmailItem 
          key={email.id} 
          email={email} 
          onSelectEmail={onSelectEmail}
          onToggleStar={onToggleStar}
          isSelected={selectedEmail?.id === email.id}
        />
      ))}
    </List>
  );
};

export default EmailList;
