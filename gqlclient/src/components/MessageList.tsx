import { useQuery } from '@apollo/client';
import { Box, Button, List } from '@mui/material';
import { useMemo, useState } from 'react';
import { useInboxState } from '../contexts/InboxContext';
import { GET_MESSAGES_CONNECTION } from '../queries';
import LoadingSpinner from './LoadingSpinner';
import MessageListControls from './MessageListControls';
import MessageListItem from './MessageListItem';
import { Message } from '../types';

const MessageList = () => {
  const [nextPageCursor, setNextPageCursor] = useState('');
  const { loading, error, data, fetchMore } = useQuery(GET_MESSAGES_CONNECTION, { variables: { first: 5 } });
  
  const handleFetchMore = () => {
    const res = await fetchMore({ variables: { after: nextPageCursor, first: 5 } });
    
    
  };


  return (
    <>
      {loading && <LoadingSpinner />}
      {error && <p>Error : {error.message}</p>}
      {data && (
        <>
          <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" p={1}>
        <MessageListControls
          totalMessages={data?.messages?.totalCount!}
        />

      </Box>
      <List>
        {messages.map((message) => (
          <MessageListItem
            key={message.id}
            message={message as Message}
          />
        ))}
          </List>
        </>
      )}
    </>
  );
};

export default MessageList;
