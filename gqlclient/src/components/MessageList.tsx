import { useQuery } from '@apollo/client';
import { Box, List } from '@mui/material';
import { useState } from 'react';
import { GET_MESSAGES_CONNECTION } from '../queries';
import LoadingSpinner from './LoadingSpinner';
import MessageListControls from './MessageListControls';
import MessageListItem from './MessageListItem';

interface MessageListProps {
  onMessageSelect: (messageId: string) => void;
}

export const MessageList = ({ onMessageSelect }: MessageListProps) => {
  const { loading, error, data } = useQuery(GET_MESSAGES_CONNECTION, { variables: { first: 5 } });
  const [filterStarred, setFilterStarred] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error : {error.message}</p>;
  if (!data || !data.messages) return <p>No data</p>;

  const totalPages = Math.ceil((data.messages.totalCount ?? 0) / 5);
  const filteredMessages = filterStarred ? data.messages.nodes.filter((message) => message?.labels?.includes('STARRED')) : data.messages.nodes;
  
  if (filteredMessages.length === 0) {
    return <p>No messages found</p>;
  }

  const onStarClick = (messageId: string) => {
    console.log('Star clicked for email:', messageId);
  };

  const handleStarredFilterChange = () => {
    setFilterStarred(!filterStarred);
  };

  const handleMessageSelect = (messageId: string) => {
    onMessageSelect(messageId);
  };

  const handlePageChange = (page: number) => {
    if (page > currentPage ) {
    setCurrentPage(page);
  };

  return (
    <>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" p={1}>
        <MessageListControls
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onStarredFilterChange={handleStarredFilterChange}
          currentFilter={filterStarred ? ['STARRED'] : []}
        />

      </Box>
      <List>
        {filteredMessages.map((message, index) => (
          message && (
            <MessageListItem
              key={message.id}
              messageId={message.id}
              selected={selectedMessageIndex === index}
              onSelect={() => handleMessageSelect(message.id)}
              onStarClick={() => onStarClick(message.id)}
            />
          )
        ))}
      </List>
    </>
  );
};
