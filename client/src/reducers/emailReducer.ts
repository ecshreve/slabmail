// /reducers/emailReducer.ts
import { Email } from "../types/Email";

export interface EmailState {
  emails: Email[];
  selectedEmail: Email | null;
  loading: boolean;
  error: string | null;
}

export type EmailAction =
  | { type: "FETCH_EMAILS_START" }
  | { type: "FETCH_EMAILS_SUCCESS"; payload: Email[] }
  | { type: "FETCH_EMAILS_ERROR"; payload: string }
  | { type: "SELECT_EMAIL"; payload: Email }
  | { type: "TOGGLE_STAR"; payload: Email };

export const emailReducer = (
  state: EmailState,
  action: EmailAction
): EmailState => {
  switch (action.type) {
    case "FETCH_EMAILS_START":
      return { ...state, loading: true, error: null };
    case "FETCH_EMAILS_SUCCESS":
      return { ...state, loading: false, emails: action.payload };
    case "FETCH_EMAILS_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "SELECT_EMAIL":
      return { ...state, selectedEmail: action.payload };
    case "TOGGLE_STAR":
      return {
        ...state,
        emails: state.emails.map((email) =>
          email.id === action.payload.id
            ? { ...email, labelIds: action.payload.labelIds }
            : email
        ),
      };
    default:
      return state;
  }
};
