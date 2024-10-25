// src/components/MessageDetail.tsx

import { useQuery } from '@apollo/client';
import { Star, StarOutline } from '@mui/icons-material';
import {
    Box,
    Button,
    Divider,
    IconButton,
    Paper,
    Typography
} from '@mui/material';
import { memo } from 'react';
import { formatDate, formatEmailAddress } from '../helpers';
import { GET_MESSAGE_DETAIL } from '../queries';
import LoadingSpinner from './LoadingSpinner';


interface MessageDetailProps {
    messageId: string;
    onStarClick: () => void;
}

const MessageDetail: React.FC<MessageDetailProps> = ({ messageId, onStarClick }) => {
    const { loading, error, data } = useQuery(GET_MESSAGE_DETAIL, { variables: { messageId } });

    if (loading) return <LoadingSpinner />;
    if (error) return <p>Error: {error.message}</p>;
    if (!data || !data.message) return <p>No data</p>;

    const message = data.message;

    return (
        <>
            {message && (
                <Box flex={2} p={2} overflow="auto">
                    {/* Message Header */}
                    <MessageHeader
                        subject={message.subject ?? ''}
                        starred={message.labels?.includes('STARRED') ?? false}
                        onClick={onStarClick}
                    />

                    <MessageInfo sender={message.sender} date={formatDate(message.receivedMs)} />

                    {/* Action Buttons */}
                    <MessageActions onDelete={() => { }} />

                    <Divider sx={{ my: 2 }} />

                    {/* Message Body */}
                    {message.body && <MessageBody body={message.body} />}
                </Box>
            )}
        </>
    );
};

// Message Header Component
const MessageHeader: React.FC<{ subject: string, starred: boolean, onClick: () => void }> = memo(({ subject, starred, onClick }) => {
    return (
        <Box display="flex" justifyContent="space-between" width="100%">
            <Typography variant="h5" gutterBottom>
                {subject}
            </Typography>
            <IconButton edge="end" onClick={onClick}>
                {starred ? <Star sx={{ color: '#fbc02d' }} /> : <StarOutline />}
            </IconButton>
        </Box>
    );
}, (prevProps, nextProps) => {
    return prevProps.starred === nextProps.starred && prevProps.subject === nextProps.subject;
});

const MessageInfo: React.FC<{ sender: string, date: string }> = memo(({ sender, date }) => (
    <>
        <Typography variant="subtitle1" color="textSecondary">
            From: {formatEmailAddress(sender)}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
            Date: {formatDate(date)}
        </Typography>
    </>
), (prevProps, nextProps) => {
    return prevProps.sender === nextProps.sender && prevProps.date === nextProps.date;
});

// Message Action Buttons Component
const MessageActions: React.FC<{ onDelete: () => void }> = ({ onDelete }) => (
    <Box mt={3} display="flex" gap={2}>
        <Button variant="contained" color="primary" onClick={() => { /* Implement Reply */ }}>
            Reply
        </Button>
        <Button variant="outlined" color="primary" onClick={() => { /* Implement Forward */ }}>
            Forward
        </Button>
        <Button variant="text" color="error" onClick={onDelete}>
            Delete
        </Button>
    </Box>
);

// Message Body Component
const MessageBody: React.FC<{ body: string }> = ({ body }) => (
    <Paper elevation={1} sx={{ p: 2, overflow: 'auto' }}>
        <Typography variant="body1" component="div">
            {body.split('\n').map((line, index) => (
                <Typography key={index} component="div">
                    {line}
                </Typography>
            ))}
        </Typography>
    </Paper>
);

export default MessageDetail;
