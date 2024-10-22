import { ListItemButton, ListItemText } from '@mui/material';
import { memo } from 'react';
import { Label } from '../../types/Label';
import './Label.css';
interface LabelItemProps {
  item: Label;
  selected: boolean;
  onSelectLabel: () => void;
}

const LabelItem: React.FC<LabelItemProps> = memo(({ item, selected, onSelectLabel }) => {
  return (
    <ListItemButton 
      selected={selected} 
      onClick={(event) => onSelectLabel()}
    >
      <ListItemText primary={item.name} />
      <ListItemText secondary={`(${item.messagesTotal})`} sx={{ textAlign: 'right' }} />
    </ListItemButton>
  );
}, (prevProps, nextProps) => {
  return prevProps.item === nextProps.item && prevProps.selected === nextProps.selected;
});

export default LabelItem;
