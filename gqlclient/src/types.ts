export type Message = {
  messageId: string;
  subject: string;
  labels: string[];
  receivedAt: string;
  sender: string;
  snippet?: string;
  body?: string;
};
