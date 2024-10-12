// /contexts/LabelContext.tsx
import React, { createContext, ReactNode, useReducer } from 'react';
import { LabelAction, labelReducer, LabelState } from '../reducers/labelReducer';

interface LabelContextType {
  state: LabelState;
  dispatch: React.Dispatch<LabelAction>;
}

const initialState: LabelState = {
  labels: [],
  loading: false,
  error: null,
};

export const LabelContext = createContext<LabelContextType>({
  state: initialState,
  dispatch: () => null,
});

export const LabelProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(labelReducer, initialState);

  return (
    <LabelContext.Provider value={{ state, dispatch }}>
      {children}
    </LabelContext.Provider>
  );
};
