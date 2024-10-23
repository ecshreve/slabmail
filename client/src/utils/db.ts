// src/utils/db.ts
import { DBSchema, openDB } from 'idb';
import { Email } from '../types/Email';

const DB_NAME = 'slabmail-client-db';
const STORE_NAME = 'emails';

interface EmailDB extends DBSchema {
  emails: {
    key: string;
    value: Email;
    indexes: {
      'by-starred': string;
    };
  };
}

export const dbPromise = openDB<EmailDB>(DB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
  }
});

export const getEmails = async () => {
  const db = await dbPromise;
  return db.getAll(STORE_NAME);
};

export const saveEmails = async (emails: Email[]) => {
  const db = await dbPromise;
  const tx = db.transaction(STORE_NAME, 'readwrite');
  emails.forEach((email) => tx.store.put(email));
  await tx.done;
};