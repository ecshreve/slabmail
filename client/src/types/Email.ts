export interface Email {
  id: string;
  subject: string;
  body: string;
  sender: string;
  date: string;
  labelIds: string[];
  starred: boolean;
}

export const STARRED_LABEL_ID = 'STARRED';
