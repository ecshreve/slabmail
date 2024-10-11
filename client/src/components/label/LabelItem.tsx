import { ListItem, ListItemText } from "@mui/material";
import theme from "../../styles/theme";
import { Label } from "../../types/Label";
interface LabelItemProps {
  label: Label;
  onLabelClick: (labelId: string) => void;
}

export default function LabelItem({ label, onLabelClick }: LabelItemProps) {
  return (
    <ListItem
      component="button"
      onClick={() => onLabelClick(label.id)}
      sx={{
        padding: '8px 12px',
        borderRadius: '0px', // Slight rounding for a modern look
        border: 'none',
        '&:hover': {
          backgroundColor: theme.palette.action.hover, // Material-UI action hover color
        },
        '&:focus': {
          outline: `2px solid ${theme.palette.action.focus}`, // Blue outline when focused
          backgroundColor: theme.palette.action.focus,
        },
        '&.Mui-selected': {
          backgroundColor: theme.palette.action.selected, // Light blue for selected state
          '&:hover': {
            backgroundColor: theme.palette.action.hover, // Darker blue on hover while selected
          },
        },
      }}
    >
      <ListItemText
        primary={`${label.name}: (${label.messagesTotal})`} // Format as "LABEL_NAME: (COUNT)"
        primaryTypographyProps={{
          variant: 'body1', // Keep it simple and readable
          noWrap: true,     // Prevent long labels from wrapping
        }}
      />
    </ListItem>
  );
}
