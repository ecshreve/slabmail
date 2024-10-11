// /components/Email/EmailActions.tsx
import { Archive, MarkEmailRead } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';

interface EmailActionsProps {
  onArchive: () => void;
  onMarkAsRead: () => void;
}

const EmailActions: React.FC<EmailActionsProps> = ({ onArchive, onMarkAsRead }) => (
  <div>
    <IconButton onClick={onArchive}>
      <Archive />
    </IconButton>
    <IconButton onClick={onMarkAsRead}>
      <MarkEmailRead />
    </IconButton>
  </div>
);

export default EmailActions;
