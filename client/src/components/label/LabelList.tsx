// /components/LabelList.tsx
import { List } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { fetchDefaultLabels } from '../../services/emailService';
import { Label } from '../../types/Label';
import './Label.css';
import LabelItem from './LabelItem';
interface LabelListProps {
  onSelectLabel: (labelId: string) => void;
}

const LabelList: React.FC<LabelListProps> = ({ onSelectLabel }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [items, setItems] = useState<Label[]>([]);
  
  useEffect(() => {
    const fetchLabels = async () => {
      const fetchedLabels = await fetchDefaultLabels();
      setItems(fetchedLabels);
    };
    fetchLabels();
  }, []);

  const handleListItemClick = useCallback(
    (item: Label, index: number) => {
      setSelectedIndex(index);
      onSelectLabel(item.id);
    },
    [onSelectLabel]
  );

  return (
    <List sx={{ padding: 0, borderRadius: '3px' }}>
      {items.map((item, index) => (
          <LabelItem
            key={item.id}
            item={item} 
            selected={selectedIndex === index} 
            onSelectLabel={() => handleListItemClick(item, index)}
          />
      ))}
    </List>
  );
};

export default LabelList;
