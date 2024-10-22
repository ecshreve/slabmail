// /components/LabelList.tsx
import { List } from '@mui/material';
import React, { useState } from 'react';
import { Label } from '../../types/Label';
import LabelItem from './LabelItem';
interface LabelListProps {
  labels: Label[];
  onSelectLabel: (labelId: string) => void;
}

const LabelList: React.FC<LabelListProps> = ({ labels, onSelectLabel }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleListItemClick = (
    index: number,
  ) => {
    setSelectedIndex(index);
    onSelectLabel(labels[index].id);
  };

  return (
    <List sx={{ padding: 0, borderRadius: '3px' }}>
      {labels.map((label, index) => (
        <LabelItem
          key={label.id}
          name={label.name}
          count={label.messagesTotal}
          selected={selectedIndex === index}
          onSelectLabel={() => handleListItemClick(index)}
        />
      ))}
    </List>
  );
};

export default LabelList;
