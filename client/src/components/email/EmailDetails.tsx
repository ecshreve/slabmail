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
import { useLiveQuery } from 'dexie-react-hooks';
import { memo } from 'react';
import { Email } from '../../types/Email';
import { db } from '../../utils/dbdexie';
import { formatDate, formatEmailAddress } from '../../utils/helpers';

interface EmailDetailProps {
  emailId: string;
  onStarClick: (email: Email) => void;
}

const EmailDetail: React.FC<EmailDetailProps> = ({ emailId, onStarClick }) => {
  const selectedEmail = useLiveQuery(
    () => db.emails.get(emailId),
    [emailId]
  );

  return (
    <>
      {selectedEmail && (
        <Box flex={2} p={2} overflow="auto">
          {/* Email Header */}
          <EmailHeader
            subject={selectedEmail.subject}
            isStarred={selectedEmail.starred}
            onClick={() => onStarClick(selectedEmail)}
          />

          <EmailInfo sender={selectedEmail.sender} date={selectedEmail.date} />

          {/* Action Buttons */}
          <EmailActions onDelete={() => { }} />

          <Divider sx={{ my: 2 }} />

          {/* Email Body */}
          {selectedEmail.body && <EmailBody body={selectedEmail.body} />}
        </Box>
      )}
    </>
  );
};

// Email Header Component
const EmailHeader: React.FC<{ subject: string, isStarred: boolean, onClick: (e: React.MouseEvent<HTMLButtonElement>) => void }> = memo(({ subject, isStarred, onClick }) => {
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
}, (prevProps, nextProps) => {
  return prevProps.isStarred === nextProps.isStarred;
});

const EmailInfo: React.FC<{ sender: string, date: string }> = memo(({ sender, date }) => (
  <>
    <Typography variant="subtitle1" color="textSecondary">
      From: {formatEmailAddress(sender)}
    </Typography>
    <Typography variant="subtitle2" color="textSecondary">
      Date: {formatDate(date)}
    </Typography>
  </>
), (prevProps, nextProps) => {
  return prevProps.sender === nextProps.sender && prevProps.date === nextProps.date;
});

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
