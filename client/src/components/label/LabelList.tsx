// /components/LabelList.tsx
import { List, ListItem } from '@mui/material';
import React, { useState } from 'react';
import theme from '../../styles/theme';
import LabelItem from './LabelItem';

interface LabelListProps {
  onSelectLabel: (labelId: string) => void;
}

const LabelList: React.FC<LabelListProps> = ({ onSelectLabel }) => {  
  const [selectedLabelId, setSelectedLabelId] = useState<string>('INBOX');

  const handleLabelSelect = (labelId: string) => {
    setSelectedLabelId(labelId);
    onSelectLabel(labelId);
  };

  return (
    <List sx={{ padding: 0, borderRadius: '3px' }}>
      {['INBOX', 'STARRED', 'UNREAD'].map((labelId) => (
        <ListItem
        component="button"
        onClick={() => handleLabelSelect(labelId)}
          sx={{ 
          padding: '8px 12px',
          margin: '4px 0',
          borderRadius: '3px', // Slight rounding for a modern look
          border: 'none',
          borderLeft: selectedLabelId === labelId ? '4px solid ' + theme.palette.secondary.main : 'none',
          borderRight: selectedLabelId === labelId ? '10px solid ' + theme.palette.secondary.main : 'none',
          // backgroundColor: selectedLabelId === labelId ? theme.palette.action.selected : theme.palette.action.selected + '80',
          '&:hover': {
            backgroundColor: theme.palette.action.hover, // Material-UI action hover color
            cursor: 'pointer',
          },
          '&:MuiSelected': {
            backgroundColor: theme.palette.action.focus,
          }
        }}
      >
        <LabelItem
          key={labelId} 
          labelId={labelId}
          isSelected={selectedLabelId === labelId}
        />
      </ListItem>
      ))}
    </List>
  );
};

export default LabelList;
