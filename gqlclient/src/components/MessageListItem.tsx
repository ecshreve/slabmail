import { useQuery } from '@apollo/client';
import { Star, StarOutline } from '@mui/icons-material';
import { Box, IconButton, ListItemButton, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { memo } from 'react';
import { formatDate, formatEmailAddress, stripSpaces } from '../helpers';
import { GET_MESSAGE_SUMMARY } from '../queries';
import LoadingSpinner from './LoadingSpinner';

interface MessageListItemProps {
  messageId: string;
  selected: boolean;
  onSelect: () => void;
  onStarClick: () => void;
}

const MessageListItem: React.FC<MessageListItemProps> = ({ messageId, selected, onSelect, onStarClick }) => {
    const { loading, error, data } = useQuery(GET_MESSAGE_SUMMARY, { variables: { messageId } });

    if (loading) return <LoadingSpinner />;
    if (error) return <p>Error : {error.message}</p>;
    if (!data || !data.message) return <p>No data</p>;

    const message = data.message;
    const starred = message.labels?.includes('STARRED');

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
                <MessageContent subject={message.subject ?? ''} sender={message.sender ?? ''} />

                {/* Star Icon */}
                <IconButton
                    sx={{ width: '48px', height: '48px', '&:hover': { backgroundColor: theme.palette.action.focus } }}
                    edge="end"
                    onClick={onStarClick}
                >
                    {starred ? <Star sx={{ color: '#fbc02d' }} /> : <StarOutline />}
                </IconButton>
            </Box>

            {/* Footer: Email Date */}
            <Box display="flex" width="100%" justifyContent="flex-end">
                <MessageFooter date={formatDate(message.receivedMs)} />
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
