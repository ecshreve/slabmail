import { Message } from "../types";

export interface InboxState {
  messages: Message[];
  visibleMessages: Message[];
  selectedMessage: Message | null;
  starredMessages: Message[];
  currentPage: number;
  totalPages: number;
  starFilter: boolean;
}

export const initialState: InboxState = {
  messages: [],
  visibleMessages: [],
  selectedMessage: null,
  starredMessages: [],
  currentPage: 1,
  totalPages: 1,
  starFilter: false,
};

export type Action =
  | { type: "SET_MESSAGES"; payload: Message[] }
  | { type: "SET_SELECTED_MESSAGE"; payload: Message }
  | { type: "SET_VISIBLE_MESSAGES"; payload: Message[] }
  | { type: "TOGGLE_STARRED_MESSAGE"; payload: Message }
  | { type: "SET_CURRENT_PAGE"; payload: number }
  | { type: "SET_TOTAL_PAGES"; payload: number }
  | { type: "TOGGLE_STAR_FILTER"; payload: boolean }
  | { type: "NEXT_PAGE" }
  | { type: "PREV_PAGE" };

export function inboxReducer(state: InboxState, action: Action): InboxState {
  switch (action.type) {
    case "SET_MESSAGES":
      return { ...state, messages: action.payload };
    case "SET_SELECTED_MESSAGE":
      return { ...state, selectedMessage: action.payload };
    case "SET_VISIBLE_MESSAGES":
      return { ...state, visibleMessages: action.payload }; 
    case "TOGGLE_STARRED_MESSAGE":
      return {
        ...state,
        starredMessages: state.starredMessages.includes(action.payload)
          ? state.starredMessages.filter((m) => m.id !== action.payload.id)
          : [...state.starredMessages, action.payload],
      };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_TOTAL_PAGES":
      return { ...state, totalPages: action.payload };
    case "TOGGLE_STAR_FILTER":
      return { ...state, starFilter: action.payload };
    case "NEXT_PAGE":
      return nextPage(state);
    case "PREV_PAGE":
      return prevPage(state);
    default:
      return state;
  }
}


export const nextPage = (state: InboxState) => {
  if (state.currentPage < state.totalPages) {
    return {
      ...state,
      currentPage: state.currentPage + 1,
      visibleMessages: state.messages.slice((state.currentPage - 1) * 5, state.currentPage * 5)
    };
  }
  return state;
};

export const prevPage = (state: InboxState) => {
  if (state.currentPage > 1) {
    return {
      ...state,
      currentPage: state.currentPage - 1,
      visibleMessages: state.messages.slice((state.currentPage - 2) * 5, (state.currentPage - 1) * 5)
    };
  }
  return state;
};