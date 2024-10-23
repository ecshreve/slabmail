export interface Email {
  id: string;
  subject: string;
  body: string;
  sender: string;
  date: string;
  starred: boolean;
}

export const STARRED_LABEL_ID = 'STARRED';
