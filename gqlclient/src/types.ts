export type Message = {
  id: string;
  body?: string;
  labels: string[];
  receivedAt: string;
  sender: string;
  snippet?: string;
  subject: string;
};
