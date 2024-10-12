// /components/Email/EmailItem.tsx

import { ListItem, ListItemText } from '@mui/material';
import React from 'react';
import theme from '../../styles/theme';
import { Email } from '../../types/Email';

interface EmailItemProps {
  email: Email;
  onClick: () => void;
}

const EmailItem: React.FC<EmailItemProps> = ({ email, onClick }) => (
  <ListItem
    component="button"
    onClick={onClick}
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
  </ListItem>
);

export default EmailItem;
