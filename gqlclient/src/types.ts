export type Message = {
  id: string;
  body?: string | null;
  labels?: string[] | null;
  receivedAt: string;
  sender: string;
  snippet?: string | null;
  subject?: string | null;
};
