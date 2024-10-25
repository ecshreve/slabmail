import { ListItemButton, ListItemText, IconButton, Box } from '@mui/material';
import { Star, StarOutline } from '@mui/icons-material';
import { stripSpaces, formatEmailAddress } from '../helpers'
import { memo } from 'react';
import { Message } from '../types';
import { useTheme } from '@mui/material/styles';

const MessageListItem: React.FC<{ email: Message; selected: boolean; onSelect: () => void; onStarClick: () => void }> = ({ email, selected, onSelect, onStarClick }) => {
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
                <MessageContent subject={email.subject} sender={email.sender} />

                {/* Star Icon */}
                <IconButton
                    sx={{ width: '48px', height: '48px', '&:hover': { backgroundColor: theme.palette.action.focus } }}
                    edge="end"
                    onClick={onStarClick}
                >
                    {email.labels.includes('STARRED') ? <Star sx={{ color: '#fbc02d' }} /> : <StarOutline />}
                </IconButton>
            </Box>

            {/* Footer: Email Date */}
            <Box display="flex" width="100%" justifyContent="flex-end">
                <MessageFooter date={email.receivedAt} />
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
