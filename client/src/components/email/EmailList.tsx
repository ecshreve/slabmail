// src/components/EmailList.tsx

import { Box, List, ListItemButton, ListItemText } from '@mui/material';
import React, { useContext } from 'react';
import { EmailContext } from '../../contexts/EmailContext';
import theme from '../../styles/theme';
import { formatEmailAddress, stripSpaces } from '../../utils/helpers';

interface EmailListProps {
  onSelectEmail: (emailId: string) => void;
}

const EmailList: React.FC<EmailListProps> = ({ onSelectEmail }) => {
  const { emails } = useContext(EmailContext);

  return (
    <List>
      {emails.map((email) => (
        <ListItemButton key={email.id} onClick={() => onSelectEmail(email.id)} 
          sx={{ 
            padding: '8px 12px',
            margin: '4px 0',
            borderRadius: '3px',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'flex-start',
            textAlign: 'left',
            borderBottom: `1px solid ${theme.palette.divider}`,
            '&:hover': { backgroundColor: theme.palette.action.hover }
          }}>
          <ListItemText primary={stripSpaces(email.subject)} secondary={`From: ${formatEmailAddress(email.sender)}`} />
          <Box display="flex" flexDirection="row" width="100%" textAlign="right">
            <ListItemText secondary={`${new Date(parseInt(email.date)).toLocaleString()}`} sx={{ fontSize: '14px' }} />
          </Box>
        </ListItemButton>
      ))}
    </List>
  );
};

export default EmailList;
