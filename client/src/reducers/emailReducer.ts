import { Email } from "../types/Email";
import { Label } from "../types/Label";

export type emailState = {
  emails: Email[];
  labels: Label[];
  selectedEmail: Email | null;
  selectedLabel: Label | null;
};

export type emailAction =
  | { type: "SET_EMAILS"; payload: Email[] }
  | { type: "SET_LABELS"; payload: Label[] }
  | { type: "SET_SELECTED_EMAIL"; payload: Email }
  | { type: "SET_SELECTED_LABEL"; payload: Label }
  | { type: "TOGGLE_STAR"; payload: Email };

export const emailReducer = (state: emailState, action: emailAction): emailState => {
  switch (action.type) {
    case "SET_EMAILS":
      return { ...state, emails: action.payload };
    case "SET_LABELS":
      return { ...state, labels: action.payload };
    case "SET_SELECTED_EMAIL":
      return { ...state, selectedEmail: action.payload };
    case "SET_SELECTED_LABEL":
      return { ...state, selectedLabel: action.payload };
    case "TOGGLE_STAR":
      return {
        ...state,
        labels: state.labels.map((label) =>
          label.id === 'STARRED'
            ? { ...label, messagesTotal: label.messagesTotal + (action.payload.labelIds.includes('STARRED') ? -1 : 1) }
            : label
        ),
        emails: state.emails.map((email) =>
          email.id === action.payload.id
            ? { 
                ...email, 
                starred: !email.labelIds.includes('STARRED'), 
                labelIds: email.labelIds.includes('STARRED') ? email.labelIds.filter((labelId) => labelId !== 'STARRED') : [...email.labelIds, 'STARRED'] 
              }
            : email
        ),
      };
   
    default:
      return state;
  }
};
