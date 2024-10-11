// /contexts/EmailContext.tsx
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Email } from '../types/Email';
import { Label } from '../types/Label';
interface EmailContextType {
  emails: Email[];
  labels: Label[];
  setEmails: (emails: Email[]) => void;
  setLabels: (labels: Label[]) => void;
}

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export const EmailProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  
  return (
    <EmailContext.Provider value={{ emails, labels, setEmails, setLabels }}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmailContext = () => {
  const context = useContext(EmailContext);
  if (!context) throw new Error('useEmailContext must be used within EmailProvider');
  return context;
};
