// /components/Email/EmailDetails.tsx
import { Star, StarOutline } from '@mui/icons-material';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { fetchMessageById } from '../../services/emailService';
import theme from '../../styles/theme';
import { Message } from '../../types/Email';

interface EmailDetailsProps {
  messageId: string;
}

const EmailDetails: React.FC<EmailDetailsProps> = ({ messageId }) => {
  const [message, setMessage] = useState<Message | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedMessage = await fetchMessageById(messageId);
      setMessage(fetchedMessage);
    };
    fetchData();
  }, [messageId]);

  if (!message) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant="h5" gutterBottom>
            {message.subject}
          </Typography>
          <Box sx={{ gap: 0.5 }}>
            <IconButton size='large' onClick={() => {}} sx={{ '&:hover': { backgroundColor: theme.palette.action.focus } }}>
              {message.labelIds.includes('STARRED') ? <Star sx={{ color: '#fbc02d' }} /> : <StarOutline />}
            </IconButton>
          </Box>
        </Box>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {message.sender} - {new Date(parseInt(message.timestamp || '0')).toLocaleString()}
        </Typography>
        <Typography variant="body1">
          {message.body}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EmailDetails;
