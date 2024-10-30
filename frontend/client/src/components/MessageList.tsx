// src/components/MessageList.tsx

import { CircularProgress, List, Typography } from "@mui/material";
import React from "react";
import { Message } from "../generated/gql";
import MessageItem from "./MessageItem";

interface MessageListProps {
  messages: Message[];
  loading: boolean;
  error?: string;
  onToggleStar: (messageId: string) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  loading,
  error,
  onToggleStar,
}) => {
  if (loading) {
    return <CircularProgress data-testid="loading-indicator" />;
  }

  if (error) {
    return (
      <Typography color="error" data-testid="error-message">
        {error}
      </Typography>
    );
  }

  if (messages.length === 0) {
    return (
      <Typography variant="body1" data-testid="no-messages">
        No messages found.
      </Typography>
    );
  }

  return (
    <List>
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          onToggleStar={onToggleStar}
        />
      ))}
    </List>
  );
};

export default MessageList;
