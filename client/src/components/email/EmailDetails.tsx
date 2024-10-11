// /components/Email/EmailDetails.tsx
import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import { Email } from '../../types/Email';

interface EmailDetailsProps {
    email: Email;
}

const EmailDetails: React.FC<EmailDetailsProps> = ({ email }) => (
  <Card>
    <CardContent> 
      <Typography variant="h5" gutterBottom>
        {email.subject}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        {email.sender} - {new Date(parseInt(email.date)).toLocaleString()}
      </Typography>
      <Typography variant="body1">
        {email.body}
      </Typography>
    </CardContent>
  </Card>
);

export default EmailDetails;
