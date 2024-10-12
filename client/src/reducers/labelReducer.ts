// /reducers/labelReducer.ts
import { Label } from '../types/Label';

export interface LabelState {
  labels: Label[];
  selectedLabel: Label | null;
  loading: boolean;
  error: string | null;
}

export type LabelAction =
  | { type: "FETCH_LABELS_START" }
  | { type: "FETCH_LABELS_SUCCESS"; payload: Label[] }
  | { type: "FETCH_LABELS_ERROR"; payload: string }
  | { type: "SELECT_LABEL"; payload: Label }
  | {
      type: "UPDATE_LABEL_COUNT";
      payload: { labelId: string; delta: number };
    };

export const labelReducer = (
  state: LabelState,
  action: LabelAction
): LabelState => {
  switch (action.type) {
    case "FETCH_LABELS_START":
      return { ...state, loading: true, error: null };
    case "FETCH_LABELS_SUCCESS":
      return { ...state, loading: false, labels: action.payload };
    case "FETCH_LABELS_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "SELECT_LABEL":
      return { ...state, selectedLabel: action.payload };
    case "UPDATE_LABEL_COUNT":
      return {
        ...state,
        labels: state.labels.map((label) =>
          label.id === action.payload.labelId
            ? {
                ...label,
                messagesTotal: label.messagesTotal + action.payload.delta,
              }
            : label
        ),
      };
    default:
      return state;
  }
};
