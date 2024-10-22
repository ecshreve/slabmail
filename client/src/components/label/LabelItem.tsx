import { ListItemButton } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import theme from '../../styles/theme';
interface LabelItemProps {
  name: string;
  count: number;      
  selected: boolean;
  onSelectLabel: () => void;
}

export default function LabelItem({ name, count, selected, onSelectLabel }: LabelItemProps) {

  return (
    <ListItemButton
      selected={selected}
      onClick={onSelectLabel}
      sx={{
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 12px',
        paddingRight: '20px',
        margin: '4px 0',
        borderRadius: '3px',
        border: 'none',
        '&.Mui-selected': {
          paddingRight: '10px',
          borderRight: `10px solid ${theme.palette.primary.main}`,
        },
      }}
    >
      <ListItemText primary={name} />
      <ListItemText secondary={`(${count})`} sx={{ color: theme.palette.text.secondary, textAlign: 'right' }} />
    </ListItemButton>
  );
}