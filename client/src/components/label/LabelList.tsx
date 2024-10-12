// /components/LabelList.tsx
import { List } from '@mui/material';
import React from 'react';
import { Label } from '../../types/Label';
import LabelItem from './LabelItem';

interface LabelListProps {
  labels: Label[];
  selectedLabel: Label | null;
  onSelectLabel: (label: Label) => void;
}

const LabelList: React.FC<LabelListProps> = ({ labels, selectedLabel, onSelectLabel }) => {
  return (
    <List sx={{ padding: 0, borderRadius: '3px' }}>
      {labels.map((label) => (
        <LabelItem 
          key={label.id} 
          label={label} 
          isSelected={selectedLabel?.id === label.id} 
          onSelectLabel={onSelectLabel} 
        />
      ))}
    </List>
  );
};

export default LabelList;
