// src/utils/db.ts
import { openDB } from 'idb';
import { Email } from '../types/Email';

const DB_NAME = 'slabmail-client-db';
const STORE_NAME = 'emails';

export const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore('emails', { keyPath: 'id' });
  },
});

export const getEmails = async (): Promise<Email[]> => {
  const db = await dbPromise;
  return db.getAll(STORE_NAME);
};

export const saveEmails = async (emails: Email[]) => {
  const db = await dbPromise;
  const tx = db.transaction(STORE_NAME, 'readwrite');
  emails.forEach((email) => tx.store.put(email));
  await tx.done;
};

