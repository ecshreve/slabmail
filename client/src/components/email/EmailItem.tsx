// /components/Email/EmailItem.tsx
import { ListItem, ListItemText } from '@mui/material';
import React from 'react';
import { Email } from '../../types/Email';

interface EmailItemProps {
  email: Email;
  onClick: () => void;
}

const EmailItem: React.FC<EmailItemProps> = ({ email, onClick }) => (
  <ListItem component="button" onClick={onClick}>
    <ListItemText 
      primary={email.subject} 
      secondary={`${email.sender} - ${new Date(parseInt(email.date)).toLocaleString()}`} 
    />
  </ListItem>
);

export default EmailItem;
