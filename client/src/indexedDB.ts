// src/indexedDB.ts
import { openDB } from 'idb';

// Initialize IndexedDB
const initDB = async () => {
  return openDB('gmailSyncDB', 1, {
    upgrade(db) {
      // Create an object store for emails if it doesn't exist
      if (!db.objectStoreNames.contains('emails')) {
        db.createObjectStore('emails', { keyPath: 'id' });
      }
    },
  });
};

// Save emails to IndexedDB
export const saveEmailsToIndexedDB = async (emails: any[]) => {
  const db = await initDB();
  const tx = db.transaction('emails', 'readwrite');
  const store = tx.objectStore('emails');
  emails.forEach((email) => store.put({...email, cachedAt: new Date().toISOString()})); // Add or update each email
  await tx.done;
};

// Get emails from IndexedDB
export const getEmailsFromIndexedDB = async () => {
  const db = await initDB();
  return db.getAll('emails');
};
