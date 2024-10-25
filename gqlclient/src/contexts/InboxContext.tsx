import { createContext, ReactNode, useContext, useReducer } from "react";
import { Action, inboxReducer, InboxState, initialState } from "../reducers/inboxReducer";

const InboxContext = createContext<InboxState | null>(null)
const InboxDispatchContext = createContext<React.Dispatch<Action> | null>(null)


export const InboxProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(inboxReducer, initialState);

  return (
    <InboxContext.Provider value={state}>
      <InboxDispatchContext.Provider value={dispatch}>
        {children}
      </InboxDispatchContext.Provider>
    </InboxContext.Provider>
  );
};

export const useInboxState = () => useContext(InboxContext) as InboxState;
export const useInboxDispatch = () => useContext(InboxDispatchContext) as React.Dispatch<Action>;
