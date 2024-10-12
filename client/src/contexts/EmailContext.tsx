// /contexts/EmailContext.tsx
import React, { createContext, ReactNode, useReducer } from 'react';
import { EmailAction, emailReducer, EmailState } from '../reducers/emailReducer';

interface EmailContextType {
  state: EmailState;
  dispatch: React.Dispatch<EmailAction>;
}

const initialState: EmailState = {
  emails: [],
  selectedEmail: null,
  loading: false,
  error: null,
};

export const EmailContext = createContext<EmailContextType>({
  state: initialState,
  dispatch: () => null,
});

export const EmailProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(emailReducer, initialState);

  return (
    <EmailContext.Provider value={{ state, dispatch }}>
      {children}
    </EmailContext.Provider>
  );
};
