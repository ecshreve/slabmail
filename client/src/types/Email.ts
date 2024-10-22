export interface Email {
  id: string;
  subject: string;
  body: string;
  sender: string;
  date: string;
  labelIds: string[];
  isStarred: boolean;
}

export interface Message {
  id: string;
  messageId: string;
  threadId: string;
  labelIds: string[];
  timestamp?: string;
  sender?: string;
  subject?: string;
  body?: string;
}