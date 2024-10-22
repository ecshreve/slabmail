// /components/EmailItem.tsx
import { IconButton, ListItemButton, ListItemText } from '@mui/material';
import React, { memo } from 'react';

import { Star, StarOutline } from '@mui/icons-material';
import theme from '../../styles/theme';
import { Message } from '../../types/Email';

interface EmailItemProps {
  email: Message;
  selected: boolean;
  onSelect: (messageId: string) => void; // Passed down from parent
}

const EmailItem: React.FC<EmailItemProps> = memo(({ email, selected, onSelect }) => {
  const handleListItemClick = () => {
    onSelect(email.id);
  };

  return (
    <ListItemButton selected={selected} onClick={handleListItemClick}>
      <ListItemText primary={email.subject} secondary={`${email.sender} - ${new Date(parseInt(email.timestamp || '0')).toLocaleDateString()}`} sx={{ marginRight: '10px' }} />
      <IconButton size='large' onClick={() => { }} sx={{ '&:hover': { backgroundColor: theme.palette.action.focus } }}>
        {email.labelIds.includes('STARRED') ? <Star sx={{ color: '#fbc02d' }} /> : <StarOutline />}
      </IconButton>
    </ListItemButton>
  );
}, (prevProps, nextProps) => {
  return prevProps.email.id === nextProps.email.id && prevProps.selected === nextProps.selected;
});

export default EmailItem;
