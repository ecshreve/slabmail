// /components/Email/EmailList.tsx
import { List } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { fetchMessagesByLabelId } from '../../services/emailService';
import { Message } from '../../types/Email';
import EmailItem from './EmailItem';

interface EmailListProps {
  labelId: string;
  onSelect: (messageId: string) => void;
  onToggleStar: (emailId: string, isStarred: boolean) => void;
}

const EmailList: React.FC<EmailListProps> = ({ labelId, onSelect, onToggleStar }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const msgs = await fetchMessagesByLabelId(labelId);
      setMessages(msgs);
    };
    fetchData();
  }, [labelId]);

  const handleListItemClick = useCallback(
    (item: Message, index: number) => {
      setSelectedIndex(index);
      onSelect(item.id);
    },
    [onSelect]
  );

  return (
    <List sx={{ display: 'flex', flexDirection: 'column', padding: 0, borderRadius: '3px', gap: '10px', width: '100%' }} >
      {messages.map((msg, index) => (
        <EmailItem 
          key={msg.id} 
          email={msg} 
          onSelect={() => handleListItemClick(msg, index)}
          selected={selectedIndex === index}
        />
      ))}
    </List>
  );
};

export default EmailList;
