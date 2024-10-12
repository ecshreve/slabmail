// /components/Email/EmailDetails.tsx
import { Star, StarOutline } from '@mui/icons-material';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import React from 'react';
import theme from '../../styles/theme';
import { Email } from '../../types/Email';

interface EmailDetailsProps {
  email: Email;
  onToggleStar: (emailId: string, isStarred: boolean) => void;
}

const EmailDetails: React.FC<EmailDetailsProps> = ({ email, onToggleStar }) => {
  const handleToggleStar = () => {
    onToggleStar(email.id, email.isStarred);
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant="h5" gutterBottom>
            {email.subject}
          </Typography>
          <Box sx={{ gap: 0.5 }}>
            <IconButton size='large' onClick={handleToggleStar} sx={{ '&:hover': { backgroundColor: theme.palette.action.focus } }}>
              {email.isStarred ? <Star sx={{ color: '#fbc02d' }} /> : <StarOutline />}
            </IconButton>
          </Box>
        </Box>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {email.sender} - {new Date(parseInt(email.date)).toLocaleString()}
        </Typography>
        <Typography variant="body1">
          {email.body}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EmailDetails;
