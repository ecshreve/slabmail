// /components/Email/EmailItem.tsx

import { Star, StarOutline } from '@mui/icons-material';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import theme from '../../styles/theme';
import { Email } from '../../types/Email';


interface EmailItemProps {
  email: Email;
  onSelectEmail: (email: Email) => void;
  onToggleStar: (email: Email) => void;
}

const EmailItem: React.FC<EmailItemProps> = ({ email, onSelectEmail, onToggleStar }) => {

  return (
    <ListItem
      component="button"
      onClick={() => onSelectEmail(email)}
      sx={{
        padding: '12px 16px',
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
        '&:focus': {
          outline: `2px solid ${theme.palette.action.focus}`,
          backgroundColor: theme.palette.action.focus,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        '&.Mui-selected': {
          backgroundColor: theme.palette.action.selected,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      }}
    >
      <ListItemText
        primaryTypographyProps={{
          variant: 'h5', // Make subject more prominent
          noWrap: true,  // No wrapping to keep it in one line
        }}
        secondaryTypographyProps={{
          variant: 'body2', // Use lighter color for secondary text (sender, date)
        }}
        primary={email.subject}
        secondary={`${email.sender} - ${new Date(parseInt(email.date)).toLocaleString()}`}

      />
      <ListItemIcon sx={{ minWidth: 'auto' }} onClick={() => {
        onToggleStar(email);
      }}
      >
        {email.labelIds.includes('STARRED') ? <Star sx={{ '&:hover': { color: theme.palette.primary.main } }} /> : <StarOutline sx={{ '&:hover': { color: theme.palette.secondary.main } }} />}
      </ListItemIcon>
    </ListItem>
  );
};

export default EmailItem; 
