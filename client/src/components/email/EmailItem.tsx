// /components/Email/EmailItem.tsx
import { ListItem, ListItemText } from '@mui/material';
import React from 'react';

import { Email } from '../../types/Email';

interface EmailItemProps {
  email: Email;
  onClick: () => void;
  selected: boolean;
}

const EmailItem: React.FC<EmailItemProps> = ({ email, onClick, selected }) => (
  <ListItem
    component="button"
    onClick={onClick}
    style={{ backgroundColor: selected ? '#f0f0f0' : 'inherit' }}
  >
    <ListItemText
      primary={email.subject}
      secondary={`${email.sender} - ${new Date(email.date).toLocaleString()}`}
    />
  </ListItem>
);

export default EmailItem;
