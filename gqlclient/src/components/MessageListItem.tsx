import { Star, StarOutline } from '@mui/icons-material';
import { Box, IconButton, ListItemButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { memo } from 'react';
import { useInboxDispatch, useInboxState } from '../contexts/InboxContext';
import { formatDate } from '../helpers';
import { Message } from '../types';

type MessageListItemProps = {
  message: Message
}

const MessageListItem: React.FC<MessageListItemProps> = ({ message }) => {
  const theme = useTheme();
  const dispatch = useInboxDispatch();
  const state = useInboxState();

  const isStarred = state.starredMessages.some((m) => m.id === message.id);

  return (
    <ListItemButton
      selected={state.selectedMessage?.id === message.id}
      onClick={() => dispatch({ type: 'SET_SELECTED_MESSAGE', payload: message })}
      sx={{
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
      }}
    >
      <Box display="flex" justifyContent="space-between" width="100%">
        <Typography variant="body1" fontWeight="bold">
          {message.subject}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {message.sender}
        </Typography>
        <IconButton
          sx={{ width: '48px', height: '48px', '&:hover': { backgroundColor: theme.palette.action.focus } }}
          edge="end"
          onClick={() => dispatch({ type: 'TOGGLE_STARRED_MESSAGE', payload: message })}
        >
          {isStarred ? <Star sx={{ color: '#fbc02d' }} /> : <StarOutline />}
        </IconButton>
      </Box>
      <Box display="flex" width="100%" justifyContent="flex-end">
        <Typography variant="body2" color="text.secondary">
          {formatDate(message.receivedAt)}
        </Typography>
      </Box>
    </ListItemButton>
  );
};

export default memo(MessageListItem);
