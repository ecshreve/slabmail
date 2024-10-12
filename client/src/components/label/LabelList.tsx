// /components/LabelList.tsx
import { List } from '@mui/material';
import React from 'react';
import { Label } from '../../types/Label';
import LabelItem from './LabelItem';

interface LabelListProps {
  labels: Label[];
}

const LabelList: React.FC<LabelListProps> = ({ labels }) => {
  return (
    <List sx={{ padding: 0, borderRadius: '3px' }}>
      {labels.map((label) => (
        <LabelItem key={label.id} label={label} />
      ))}
    </List>
  );
};

export default LabelList;
