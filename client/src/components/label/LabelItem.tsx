import { ListItemButton, ListItemText } from '@mui/material';
import { memo } from 'react';
import { Label } from '../../types/Label';
import './Label.css';

const MemoizedLabelText = memo(({ name, messagesTotal }: { name: string; messagesTotal: number }) => (
  <>
    <ListItemText primary={name} />
    <ListItemText secondary={`(${messagesTotal})`} sx={{ textAlign: 'right' }} />
  </>
), (prevProps, nextProps) => {
  return prevProps.name === nextProps.name && prevProps.messagesTotal === nextProps.messagesTotal;
});

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
      <MemoizedLabelText name={item.name} messagesTotal={item.messagesTotal} />
    </ListItemButton>
  );
}, (prevProps, nextProps) => {
  return prevProps.item === nextProps.item && prevProps.selected === nextProps.selected;
});

export default LabelItem;
