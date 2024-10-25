import { Box } from '@mui/material';
import './App.css';
import MessageDetail from './components/MessageDetail';
import MessageList from './components/MessageList';
import Header from './components/Header';

export default function Inbox() {
  return (
    <>
      <Header title="Slabmail" onClick={() => { }} />
      <Box display="flex" height="100vh">
        <Box
          sx={{
            width: '400px',
            borderRight: '1px solid #ccc',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <MessageList />
        </Box>
        <Box display="flex" >
          <MessageDetail />
        </Box>
      </Box>
    </>
  );
}
