// src/components/EmailList.tsx

import { Star, StarOutline } from '@mui/icons-material';
import { Box, IconButton, List, ListItemButton, ListItemText } from '@mui/material';
import React, { useContext, useState } from 'react';
import { EmailContext } from '../../contexts/EmailContext';
import theme from '../../styles/theme';
import { formatEmailAddress, stripSpaces } from '../../utils/helpers';

interface EmailListProps {
  onSelectEmail: (emailId: string) => void;
}

const EmailList: React.FC<EmailListProps> = ({ onSelectEmail }) => {
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const { emails, toggleStarred } = useContext(EmailContext);

  const handleSelectEmail = (emailId: string) => {
    setSelectedEmailId(emailId);
    onSelectEmail(emailId);
  };

  return (
    <List>
      {emails.map((email) => (
        <ListItemButton key={email.id}
          selected={selectedEmailId === email.id}
          onClick={() => handleSelectEmail(email.id)}
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
            '&:hover': { backgroundColor: theme.palette.action.hover },
            '&.Mui-selected': { borderLeft: `4px solid ${theme.palette.action.focus}` }
          }}>
          <Box display="flex" flexDirection="row" width="100%" justifyContent="space-between">
            <ListItemText primary={stripSpaces(email.subject)} secondary={`From: ${formatEmailAddress(email.sender)}`} />
            <IconButton
                  sx={{
                    width: '48px',
                    height: '48px',
                    '&:hover': {
                      backgroundColor: theme.palette.action.focus,
                    }
                  }}
                  edge="end"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents triggering the email selection
                    toggleStarred(email.id);
              }}
            >
              {email.starred ? <Star sx={{ color: '#fbc02d' }} /> : <StarOutline />}
            </IconButton>
          </Box>
          <Box display="flex" flexDirection="row" width="100%" textAlign="right">
            <ListItemText secondary={`${new Date(parseInt(email.date)).toLocaleString()}`} sx={{ fontSize: '14px' }} />
          </Box>
        </ListItemButton>
      ))}
    </List>
  );
};

export default EmailList;
