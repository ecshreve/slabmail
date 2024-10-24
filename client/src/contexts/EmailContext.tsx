// src/context/EmailContext.tsx

import { createContext, useEffect, useState } from "react";
import { Email } from "../types/Email";
import { dbPromise, getEmails } from "../utils/db";
import { syncEmails } from "../utils/sync";
const STORE_NAME = 'emails';

export const EmailContext = createContext<{
  emails: Email[];
  setEmails: (emails: Email[]) => void;
  updateEmail: (updatedEmail: Email) => void;
  toggleStarred: (id: string) => void;
}>({ emails: [], setEmails: () => { }, updateEmail: () => { }, toggleStarred: () => { } });

export const EmailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [emails, setEmails] = useState<Email[]>([]);

  useEffect(() => {
    const loadEmails = async () => {
      const storedEmails = await getEmails();
      setEmails(storedEmails);
    };
    loadEmails();
  }, []);

  const updateEmail = async (updatedEmail: Email) => {
    const emailIndex = emails.findIndex((email) => email.id === updatedEmail.id);
    if (emailIndex === -1) return;

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
  };

  const toggleStarred = async (id: string) => {
    const emailIndex = emails.findIndex((email) => email.id === id);
    if (emailIndex === -1) return;
    const updatedEmail = { ...emails[emailIndex], starred: !emails[emailIndex].starred };
    await updateEmail(updatedEmail);
  };

  return (
    <EmailContext.Provider
      value={{ emails, setEmails, updateEmail, toggleStarred }}
    >
      {children}
    </EmailContext.Provider>
  );
};
