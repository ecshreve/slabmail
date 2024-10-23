// src/components/EmailDetail.tsx

import { Star, StarOutline } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { EmailContext } from '../../contexts/EmailContext';
import { Email } from '../../types/Email';
import { formatDate, formatEmailAddress } from '../../utils/helpers';

interface EmailDetailProps {
  emailId: string | null;
}

const EmailDetail: React.FC<EmailDetailProps> = ({ emailId }) => {
  const { emails, toggleStarred } = useContext(EmailContext);
  const [email, setEmail] = useState<Email | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  const handleDelete = () => {
    if (email) {
      setEmail(null);
    }
  };

  if (isLoading) {
    return (
      <Box flex={2} p={2} display="flex" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!email) {
    return (
      <Box flex={2} p={2}>
        <Typography variant="h6" color="textSecondary">
          Select an email to view its details.
        </Typography>
      </Box>
    );
  }

  return (
    <Box flex={2} p={2} overflow="auto">
      <Box display="flex" flexDirection="row" width="100%" justifyContent="space-between">
        <Typography variant="h5" gutterBottom>
          {email.subject}
        </Typography>
        <IconButton
                  edge="end"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering the email selection
                    toggleStarred(email.id);
                  }}
                >
                  {email.starred ? <Star sx={{ color: '#fbc02d' }} /> : <StarOutline />}
                </IconButton>
      </Box>
      <Typography variant="subtitle1" color="textSecondary">
        From: {formatEmailAddress(email.sender)}
      </Typography>
      <Typography variant="subtitle2" color="textSecondary">
        Date: {formatDate(email.date)}
      </Typography>

      <Box mt={3} display="flex" gap={2}>
        <Button variant="contained" color="primary" onClick={() => {/* Implement Reply */}}>
          Reply
        </Button>
        <Button variant="outlined" color="primary" onClick={() => {/* Implement Forward */}}>
          Forward
        </Button>
        <Button variant="text" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Paper elevation={1} sx={{ p: 2, overflow: 'auto' }}>  
        <Box>
          <Typography variant="body1" component="div">
            {email.body.split('\n').map((line, index) => (
              <Typography key={index} component="div">
                {line}
              </Typography>
            ))}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default EmailDetail;
