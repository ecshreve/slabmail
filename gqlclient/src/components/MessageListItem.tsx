import { Star, StarOutline } from '@mui/icons-material';
import { Box, IconButton, ListItemButton, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { memo } from 'react';
import { formatEmailAddress, stripSpaces } from '../helpers';
import { Message } from '../types';

interface MessageListItemProps {
  message: Message;
  selected: boolean;
  onSelect: () => void;
  onStarClick: () => void;
}

const MessageListItem: React.FC<MessageListItemProps> = ({ message, selected, onSelect, onStarClick }) => {
    const theme = useTheme();
    return (
        <ListItemButton
            selected={selected}
            onClick={onSelect}
            sx={{
                margin: '4px 0',
                borderRadius: '3px',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                alignItems: 'flex-start',
                textAlign: 'left',
                borderBottom: `1px solid ${theme.palette.divider}`,
                '&:hover': { backgroundColor: theme.palette.action.hover },
                '&.Mui-selected': { borderLeft: `4px solid ${theme.palette.action.focus}` }
            }}
        >
            {/* Header: Subject, Sender, Star */}
            <Box display="flex" justifyContent="space-between" width="100%">
                {/* Email Subject and Sender */}
                <MessageContent subject={message.subject} sender={message.sender} />

                {/* Star Icon */}
                <IconButton
                    sx={{ width: '48px', height: '48px', '&:hover': { backgroundColor: theme.palette.action.focus } }}
                    edge="end"
                    onClick={onStarClick}
                >
                    {message.labels.includes('STARRED') ? <Star sx={{ color: '#fbc02d' }} /> : <StarOutline />}
                </IconButton>
            </Box>

            {/* Footer: Email Date */}
            <Box display="flex" width="100%" justifyContent="flex-end">
                <MessageFooter date={message.receivedAt} />
            </Box>
        </ListItemButton>
    );
};

const MessageFooter: React.FC<{ date: string }> = memo(({ date }) => {
    return (
        <ListItemText
            secondary={new Date(parseInt(date)).toLocaleString()}
            sx={{ fontSize: '14px' }}
        />
    );
}, (prevProps, nextProps) => {
    return prevProps.date === nextProps.date;
});

// Reusable Component for Email Content (Subject and Sender)
const MessageContent: React.FC<{ subject: string; sender: string }> = memo(({ subject, sender }) => {
    return (
        <ListItemText
            primary={stripSpaces(subject)}
            primaryTypographyProps={{
                sx: {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                },
            }}
            secondary={formatEmailAddress(sender)}
            secondaryTypographyProps={{
                sx: {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineBreak: 'anywhere',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                },
            }}
        />
    );
}, (prevProps, nextProps) => {
    return prevProps.subject === nextProps.subject && prevProps.sender === nextProps.sender;
} );

export default MessageListItem;
