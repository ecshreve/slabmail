import { useQuery } from '@apollo/client';
import { Star, StarOutline } from '@mui/icons-material';
import { Box, IconButton, List, Paper, Tooltip } from '@mui/material';
import { useState } from 'react';
import { GET_MESSAGE_LIST } from '../queries';
import { Message } from '../types';
import MessageListItem from './MessageListItem';

export const MessageList = () => {
  const { loading, error, data } = useQuery(GET_MESSAGE_LIST);
  const [filterStarred, setFilterStarred] = useState(false);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const onStarClick = (email: Message) => {
    console.log('Star clicked for email:', email);
  };

  return (
    <>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" p={1}>
        
        {/* Starred Emails Filter */}
        <Paper elevation={1} sx={{ padding: '0px' }} >
          <Box display="flex" alignItems="center">
            <Tooltip title={filterStarred ? 'Show All Emails' : 'Show Starred Emails'}>
              <IconButton onClick={() => setFilterStarred(!filterStarred)}>
                {filterStarred ? <Star sx={{ color: '#fbc02d' }} /> : <StarOutline />}
              </IconButton>
            </Tooltip>
          </Box>
        </Paper>
      </Box>
      <List>
        {data.messages.map((email: Message) => (
          <MessageListItem
            key={email.messageId}
            email={email}
            selected={selectedEmailId === email.messageId}
            onSelect={() => setSelectedEmailId(email.messageId)}
            onStarClick={() => onStarClick(email)}
          />
        ))}
      </List>
    </>
  );
};
