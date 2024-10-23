// src/utils/sync.ts

import { Email } from '../types/Email';
import { getEmails, saveEmails } from './db';

export const syncEmails = async () => {
  try {
    const response = await fetch('/api/emails');
    if (!response.ok) throw new Error('Network response was not ok');
    const serverEmails: Email[] = await response.json();

    // Merge local emails with server emails
    const localEmails = await getEmails();
    const mergedEmails = await Promise.all(serverEmails.map(async (serverEmail) => {
      const localEmail = localEmails.find((e) => e.id === serverEmail.id);
      if (localEmail) {
        // If the local email has a different starred status, prefer the local one
        if (localEmail.starred !== serverEmail.starred) {
          serverEmail.starred = localEmail.starred;
          // update the server email with the local starred status
          try {
            await fetch(`/api/emails/${serverEmail.id}/star/${serverEmail.starred}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
            });
          } catch (error) {
            console.error('Failed to update star status on server:', error);
            // Handle offline scenario
          }
        }
      }
      return serverEmail;
    }));

    await saveEmails(mergedEmails);
  } catch (error) {
    console.error('Failed to sync emails:', error);
  }
};
