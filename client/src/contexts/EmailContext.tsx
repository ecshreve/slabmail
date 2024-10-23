// src/context/EmailContext.tsx

import React, { createContext, useEffect, useState } from 'react';
import { Email } from '../types/Email';
import { getEmails } from '../utils/db';

interface EmailContextProps {
  emails: Email[];
  setEmails: React.Dispatch<React.SetStateAction<Email[]>>;
}

export const EmailContext = createContext<EmailContextProps>({
  emails: [],
  setEmails: () => {},
});

export const EmailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [emails, setEmails] = useState<Email[]>([]);

  useEffect(() => {
    const loadEmails = async () => {
      const storedEmails = await getEmails();
      setEmails(storedEmails);
    };
    loadEmails();
  }, []);

  return (
    <EmailContext.Provider value={{ emails, setEmails }}>
      {children}
    </EmailContext.Provider>
  );
};
