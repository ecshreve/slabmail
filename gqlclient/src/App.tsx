import { Box } from '@mui/material';
import { useCallback, useState } from 'react';
import './App.css';
import Header from './components/Header';
import MessageDetail from './components/MessageDetail';
import { MessageList } from './components/MessageList';
import { Message } from './types';
export default function App() {
  const [selectedMessageId, setSelectedMessageId] = useState<string>('');

  const handleStarClick = (message: Message) => {
    console.log('Star clicked for message:', message);
  };

  const handleMessageSelect = useCallback((messageId: string) => {
    setSelectedMessageId(messageId);
  }, []);

  return (
    <>
      <Header title="Slabmail" onClick={() => {}} />
      <Box display="flex" height="100vh">
        <Box
          sx={{
            width: '400px',
            borderRight: '1px solid #ccc',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <MessageList onMessageSelect={handleMessageSelect} />
        </Box>
        <Box display="flex" >
          <MessageDetail messageId={selectedMessageId} onStarClick={handleStarClick} />
        </Box>
      </Box>
    </>
  );
}
