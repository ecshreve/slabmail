// src/components/EmailDetail.tsx

import { Star, StarOutline } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Typography
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { EmailContext } from '../../contexts/EmailContext';
import { Email } from '../../types/Email';
import { formatDate, formatEmailAddress } from '../../utils/helpers';
import LoadingSpinner from '../shared/LoadingSpinner';

interface EmailDetailProps {
  emailId: string | null;
}

const EmailDetail: React.FC<EmailDetailProps> = ({ emailId }) => {
  // Context & State
  const { emails, toggleStarred } = useContext(EmailContext);
  const [email, setEmail] = useState<Email | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Effect: Load email based on emailId
  useEffect(() => {
    if (emailId) {
      setIsLoading(true);
      const selectedEmail = emails.find((e) => e.id === emailId) || null;
      setEmail(selectedEmail);
      setIsLoading(false);
    } else {
      setEmail(null);
      setIsLoading(false);
    }
  }, [emailId, emails]);

  // Handlers
  const onDeleteEmail = () => setEmail(null);

  // Loading state
  if (isLoading) {
    return (
      <Box flex={2} p={2} display="flex" alignItems="center" justifyContent="center">
        <LoadingSpinner />
      </Box>
    );
  }

  // No email selected
  if (!email) {
    return (
      <Box flex={2} p={2}>
        <Typography variant="h6" color="textSecondary">
          Select an email to view its details.
        </Typography>
      </Box>
    );
  }

  const handleStarClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleStarred(email.id);
};

  return (
    <Box flex={2} p={2} overflow="auto">
      {/* Email Header */}
      <EmailHeader 
        subject={email.subject} 
        isStarred={email.starred} 
        onClick={handleStarClick}
      />

      <Typography variant="subtitle1" color="textSecondary">
        From: {formatEmailAddress(email.sender)}
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">
        Date: {formatDate(email.date)}
      </Typography>

      {/* Action Buttons */}
      <EmailActions onDelete={onDeleteEmail} />

      <Divider sx={{ my: 2 }} />

      {/* Email Body */}
      <EmailBody body={email.body} />
    </Box>
  );
};

// Email Header Component
const EmailHeader: React.FC<{ subject: string, isStarred: boolean, onClick: (e: React.MouseEvent<HTMLButtonElement>) => void }> = ({ subject, isStarred, onClick }) => {
  return (
    <Box display="flex" justifyContent="space-between" width="100%">
      <Typography variant="h5" gutterBottom>
      {subject}
    </Typography>
    <IconButton edge="end" onClick={onClick}>
      {isStarred ? <Star sx={{ color: '#fbc02d' }} /> : <StarOutline />}
    </IconButton>
    </Box>
  );
};

// Email Action Buttons Component
const EmailActions: React.FC<{ onDelete: () => void }> = ({ onDelete }) => (
  <Box mt={3} display="flex" gap={2}>
    <Button variant="contained" color="primary" onClick={() => { /* Implement Reply */ }}>
      Reply
    </Button>
    <Button variant="outlined" color="primary" onClick={() => { /* Implement Forward */ }}>
      Forward
    </Button>
    <Button variant="text" color="error" onClick={onDelete}>
      Delete
    </Button>
  </Box>
);

// Email Body Component
const EmailBody: React.FC<{ body: string }> = ({ body }) => (
  <Paper elevation={1} sx={{ p: 2, overflow: 'auto' }}>
    <Typography variant="body1" component="div">
      {body.split('\n').map((line, index) => (
        <Typography key={index} component="div">
          {line}
        </Typography>
      ))}
    </Typography>
  </Paper>
);

export default EmailDetail;
