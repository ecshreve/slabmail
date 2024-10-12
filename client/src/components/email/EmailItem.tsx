// /components/EmailItem.tsx
import { Box, ListItem, ListItemText } from '@mui/material';
import React, { useState } from 'react';

import theme from '../../styles/theme';
import { Email } from '../../types/Email';
import EmailActions from './EmailAction';

interface EmailItemProps {
  email: Email; // Define your email type here
  onSelectEmail: (email: Email) => void; // Passed down from parent
  onClickStar: (emailId: string, newStarredValue: boolean) => void; // Passed down from parent
}

const EmailItem: React.FC<EmailItemProps> = ({ email, onSelectEmail, onClickStar }) => {
  const [isStarred, setIsStarred] = useState(email.labelIds.includes('STARRED')); // Local state for instant feedback

  const handleStarClick = () => {
    const newStarredValue = !isStarred;
    setIsStarred(newStarredValue); // Provide immediate feedback locally
    onClickStar(email.id, newStarredValue); // Dispatch star update to parent
  };

  return (
    <ListItem onClick={() => onSelectEmail(email)} sx={{ padding: '8px 12px', borderRadius: '3px', borderBottom: '1px solid #e0e0e0', '&:hover': { backgroundColor: theme.palette.action.hover, cursor: 'pointer' } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <ListItemText primary={email.subject} secondary={`${email.sender} - ${new Date(parseInt(email.date)).toLocaleDateString()}`} />
      </Box>
      <EmailActions starred={isStarred} onStar={handleStarClick} onArchive={() => {}} onMarkAsRead={() => {}} />
    </ListItem>
  );
};

export default EmailItem;
