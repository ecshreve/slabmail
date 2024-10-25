import { useQuery } from '@apollo/client';
import { Box, List } from '@mui/material';
import { useState } from 'react';
import { GET_MESSAGE_LIST } from '../queries';
import LoadingSpinner from './LoadingSpinner';
import MessageListControls from './MessageListControls';
import MessageListItem from './MessageListItem';

interface MessageListProps {
  onMessageSelect: (messageId: string) => void;
}

export const MessageList = ({ onMessageSelect }: MessageListProps) => {
  const { loading, error, data } = useQuery(GET_MESSAGE_LIST);
  const [filterStarred, setFilterStarred] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedMessageIndex, setSelectedMessageIndex] = useState<number>(0);
  const PAGE_SIZE = 5;

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error : {error.message}</p>;
  if (!data || !data.messages) return <p>No data</p>;

  const totalPages = Math.ceil((data.messages.length ?? 0) / PAGE_SIZE);
  const filteredMessages = filterStarred ? data.messages.filter((message) => message?.labels?.includes('STARRED')) : data.messages;

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

  return (
    <>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" p={1}>
        <MessageListControls
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onStarredFilterChange={handleStarredFilterChange}
          currentFilter={filterStarred ? ['STARRED'] : []}
        />

      </Box>
      <List>
        {filteredMessages.map((message, index) => (
          message && (
            <MessageListItem
              key={message.messageId}
              messageId={message.messageId}
              selected={selectedMessageIndex === index}
              onSelect={() => handleMessageSelect(message.messageId)}
              onStarClick={() => onStarClick(message.messageId)}
            />
          )
        ))}
      </List>
    </>
  );
};
