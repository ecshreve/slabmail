// src/context/EmailContext.tsx

import { createContext, useEffect, useState } from "react";
import { Email } from "../types/Email";
import { dbPromise, getEmails } from "../utils/db";

const STORE_NAME = 'emails';

export const EmailContext = createContext<{
  emails: Email[];
  setEmails: (emails: Email[]) => void;
  toggleStarred: (id: string) => void;
}>({ emails: [], setEmails: () => { }, toggleStarred: () => { } });

export const EmailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [emails, setEmails] = useState<Email[]>([]);

  useEffect(() => {
    const loadEmails = async () => {
      const storedEmails = await getEmails();
      setEmails(storedEmails);
    };
    loadEmails();
  }, []);

  const toggleStarred = async (id: string) => {
    const emailIndex = emails.findIndex((email) => email.id === id);
    if (emailIndex === -1) return;

    const updatedEmail = {
      ...emails[emailIndex],
      labelIds: emails[emailIndex].labelIds.includes('STARRED') 
        ? emails[emailIndex].labelIds.filter(label => label !== 'STARRED') 
        : [...emails[emailIndex].labelIds, 'STARRED'],
      starred: !emails[emailIndex].starred,
    };

    // Update IndexedDB
    const db = await dbPromise;
    const tx = db.transaction(STORE_NAME, 'readwrite');
    await tx.store.put(updatedEmail);
    await tx.done;

    // Update state
    setEmails((prevEmails) => {
      const newEmails = [...prevEmails];
      newEmails[emailIndex] = updatedEmail;
      return newEmails;
    });

    // Optionally, inform the backend server
    try {
      await fetch(`/api/emails/${id}/star/${updatedEmail.starred}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Failed to update star status on server:', error);
      // Handle offline scenario
    }
  };

  return (
    <EmailContext.Provider
      value={{ emails, setEmails, toggleStarred }}
    >
      {children}
    </EmailContext.Provider>
  );
};
