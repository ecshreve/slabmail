// /contexts/EmailContext.tsx
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Email } from '../types/Email';

interface EmailContextType {
  emails: Email[];
  setEmails: (emails: Email[]) => void;
}

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export const EmailProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [emails, setEmails] = useState<Email[]>([]);

  return (
    <EmailContext.Provider value={{ emails, setEmails }}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmailContext = () => {
  const context = useContext(EmailContext);
  if (!context) throw new Error('useEmailContext must be used within EmailProvider');
  return context;
};
