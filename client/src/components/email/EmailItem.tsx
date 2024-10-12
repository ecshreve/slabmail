// /components/EmailItem.tsx
import { IconButton, ListItem, ListItemText, Stack } from '@mui/material';
import React from 'react';

import { Star, StarOutline } from '@mui/icons-material';
import theme from '../../styles/theme';
import { Email } from '../../types/Email';

interface EmailItemProps {
  email: Email; // Define your email type here
  onSelectEmail: (email: Email) => void; // Passed down from parent
  onToggleStar: (emailId: string, isStarred: boolean) => void;
}

const EmailItem: React.FC<EmailItemProps> = ({ email, onSelectEmail, onToggleStar }) => {
  const handleListItemClick = () => {
    onSelectEmail(email);
  };
  const handleToggleStar = () => {
    onToggleStar(email.id, email.isStarred);
  };
  return (
    <Stack spacing={0.5} direction="row" justifyContent="space-between">
      <ListItem onClick={handleListItemClick} sx={{ padding: '8px', borderRadius: '3px', borderBottom: '1px solid #e0e0e0', '&:hover': { backgroundColor: theme.palette.action.hover, cursor: 'pointer' } }}>
        <ListItemText primary={email.subject} secondary={`${email.sender} - ${new Date(parseInt(email.date)).toLocaleDateString()}`} sx={{ marginRight: '10px' }} />
        <IconButton size='large' onClick={handleToggleStar} sx={{ '&:hover': { backgroundColor: theme.palette.action.focus } }}>
          {email.isStarred ? <Star sx={{ color: '#fbc02d' }} /> : <StarOutline />}
        </IconButton>
      </ListItem>
    </Stack>
  );
};

export default EmailItem;
