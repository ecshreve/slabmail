import { Box, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import theme from "../../styles/theme";

interface LabelItemProps {
  labelId: string;
  isSelected: boolean;
}

const fetchLabelCount = async (labelId: string) => {
  const response = await fetch(`/api/labels/${labelId}`);
  const data = await response.json();
  return data.messagesTotal;
}

export default function LabelItem({ labelId, isSelected }: LabelItemProps) {
  // const [ highlight, setHighlight ] = useState(false);

  // TODO: revisit this, useMemo, useCallback? prop?
  const [labelCount, setLabelCount] = useState(0);
  useEffect(() => {
    fetchLabelCount(labelId).then((count) => {
      setLabelCount(count);
    });
  }, [labelId]);

  const highlight = isSelected;
  return (
   
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <ListItemText
          primary={`${labelId}`} // Format as "LABEL_NAME: (COUNT)"
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
          secondary={`(${labelCount})`}
          secondaryTypographyProps={{
            variant: 'body2',
            color: highlight ? theme.palette.primary.main : 'inherit',
            fontWeight: highlight ? 'bolder' : 'normal'
          }}
        />
      </Box>
  );
}
