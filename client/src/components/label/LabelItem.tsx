import { Box, ListItem, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import theme from "../../styles/theme";
import { Label } from "../../types/Label";

interface LabelItemProps {
  label: Label;
  isSelected: boolean;
  onSelectLabel: (label: Label) => void;
}

export default function LabelItem({ label, isSelected, onSelectLabel }: LabelItemProps) {
  const [ highlight, setHighlight ] = useState(false);

  useEffect(() => {
    setHighlight(true);
    const timeout = setTimeout(() => setHighlight(false), 3000);
    return () => clearTimeout(timeout);
  }, [label.messagesTotal]);

  return (
    <ListItem
      component="button"
      onClick={() => onSelectLabel(label)}
        sx={{ 
        padding: '8px 12px',
        margin: '4px 0',
        borderRadius: '3px', // Slight rounding for a modern look
        border: 'none',
        borderLeft: isSelected ? '4px solid ' + theme.palette.secondary.main : 'none',
        borderRight: highlight ? '10px solid ' + theme.palette.secondary.main : 'none',
        backgroundColor: isSelected ? theme.palette.action.selected : theme.palette.action.selected + '80',
        '&:hover': {
          backgroundColor: theme.palette.action.hover, // Material-UI action hover color
          cursor: 'pointer',
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <ListItemText
          primary={`${label.name}`} // Format as "LABEL_NAME: (COUNT)"
        primaryTypographyProps={{
          variant: 'body1', // Keep it simple and readable
          noWrap: true,     // Prevent long labels from wrapping
        }}
      />
        <ListItemText
          className={highlight ? 'smooth-transition' : ''}
          sx={{ 
            textAlign: 'right', 
          }}
          secondary={`(${label.messagesTotal})`}
          secondaryTypographyProps={{
            variant: 'body2',
            color: highlight ? theme.palette.primary.main : 'inherit',
            fontWeight: highlight ? 'bolder' : 'normal'
          }}
        />
      </Box>
    </ListItem>
  );
}
