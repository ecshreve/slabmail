// /contexts/EmailContext.tsx
import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { emailState, emailReducer, emailAction } from '../reducers/emailReducer';

interface EmailContextType {
  state: emailState;
  dispatch: React.Dispatch<emailAction>;
}

const EmailContext = createContext<EmailContextType | undefined>(undefined);

export const EmailProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(emailReducer, {
    emails: [],
    labels: [],
    selectedEmail: null,
    selectedLabel: null,
  });

  return (
    <EmailContext.Provider value={{ state, dispatch }}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmailContext = () => {
  const context = useContext(EmailContext);
  if (!context) throw new Error('useEmailContext must be used within EmailProvider');
  return context;
};
