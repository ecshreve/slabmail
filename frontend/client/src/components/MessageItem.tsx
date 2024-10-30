// src/components/MessageItem.tsx

import { Star, StarBorder } from "@mui/icons-material";
import {
    IconButton,
    ListItem,
    ListItemText,
    Tooltip,
    Typography
} from "@mui/material";
import React from "react";
import { Message } from "../generated/gql";

interface MessageItemProps {
  message: Message;
  onToggleStar: (messageId: string) => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, onToggleStar }) => {
  const handleStarClick = () => {
    onToggleStar(message.id);
  };

  return (
    <ListItem
      divider
      secondaryAction={
        <Tooltip title={message.isStarred ? "Unstar" : "Star"}>
          <IconButton edge="end" onClick={handleStarClick} aria-label="star">
            {message.isStarred ? <Star color="primary" /> : <StarBorder />}
          </IconButton>
        </Tooltip>
      }
      data-testid={`message-item-${message.id}`}
    >
      <ListItemText
        primary={
          <Typography variant="subtitle1" fontWeight="bold">
            {message.subject}
          </Typography>
        }
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              color="textSecondary"
              display="block"
            >
              From: {message.sender}
            </Typography>
            <Typography
              component="span"
              variant="body2"
              color="textSecondary"
              display="block"
            >
              {message.body.substring(0, 100)}...
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default MessageItem;
