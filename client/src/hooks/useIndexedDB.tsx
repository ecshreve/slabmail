// /hooks/useIndexedDb.ts
import { openDB } from 'idb';
import { useEmailContext } from '../contexts/EmailContext';
import { Email } from '../types/Email';

interface UseIndexedDbReturn {
  saveEmailsToCache: (emails: Email[]) => Promise<void>;
  loadEmailsFromCache: () => Promise<void>;
}

const useIndexedDb = (): UseIndexedDbReturn => {
  const { dispatch } = useEmailContext();
  
  const setEmails = (emails: Email[]) => {
    dispatch({ type: 'SET_EMAILS', payload: emails });
  };

  const dbPromise = openDB('email-db', 1, {
    upgrade(db) {
      db.createObjectStore('emails', { keyPath: 'id' });
    },
  });

  const saveEmailsToCache = async (emails: Email[]) => {
    const db = await dbPromise;
    const tx = db.transaction('emails', 'readwrite');
    emails.forEach(email => tx.store.put(email));
    await tx.done;
  };

  const loadEmailsFromCache = async () => {
    const db = await dbPromise;
    const cachedEmails = await db.getAll('emails');
    setEmails(cachedEmails);
  };

  return { saveEmailsToCache, loadEmailsFromCache };
};

export default useIndexedDb;
