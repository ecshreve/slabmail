// src/utils/sync.ts

import { Email } from '../types/Email';
import { saveEmails } from './db';

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
