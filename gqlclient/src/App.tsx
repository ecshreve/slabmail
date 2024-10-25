import { Box } from '@mui/material';
import { useState } from 'react';
import './App.css';
import MessageDetail from './components/MessageDetail';
import { MessageList } from './components/MessageList';

export default function App() {
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);

  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <Box display="flex" width="100%" height="100%" flexDirection="row">
        <MessageList onMessageSelect={setSelectedMessageId} />
        <MessageDetail messageId={selectedMessageId ?? ''} onStarClick={() => {}} />
      </Box>
    </div>
  );
}
