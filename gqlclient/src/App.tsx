import './App.css';
import Inbox from './Inbox';
import { InboxProvider } from './contexts/InboxContext';
export default function App() {

  return (
    <>
      <InboxProvider>
        <Inbox />
      </InboxProvider>
    </>
  );
}