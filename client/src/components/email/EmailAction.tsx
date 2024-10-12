// /components/Email/EmailActions.tsx
import { Archive, MarkEmailRead, Star, StarOutline } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';

interface EmailActionsProps {
  starred: boolean;
  onStar: () => void;
  onArchive: () => void;
  onMarkAsRead: () => void;
}

const EmailActions: React.FC<EmailActionsProps> = ({ starred, onStar, onArchive, onMarkAsRead }) => {

  return (
    <div>
      <IconButton onClick={onStar}>
        {starred ? <Star sx={{ color: '#fbc02d' }} /> : <StarOutline />}
      </IconButton>
      <IconButton onClick={onArchive}>
        <Archive />
      </IconButton>
      <IconButton onClick={onMarkAsRead}>
        <MarkEmailRead />
      </IconButton>
    </div>
  );
};

export default EmailActions;
