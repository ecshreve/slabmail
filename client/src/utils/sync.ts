// src/utils/sync.ts

import { Email, STARRED_LABEL_ID } from '../types/Email';
import { getEmails, saveEmails } from './db';

export const syncEmails = async () => {
  try {
    const response = await fetch('/api/emails');
    if (!response.ok) throw new Error('Network response was not ok');
    const serverEmails: Email[] = await response.json();
    await saveEmails(serverEmails);
  } catch (error) {
    console.error('Failed to sync emails:', error);
  }
};

export const syncStarredEmails = async () => {
  const emails = await getEmails();
  const starredEmails = emails.filter((email: Email) => email.labelIds.includes(STARRED_LABEL_ID));
  await saveEmails(starredEmails);
};
