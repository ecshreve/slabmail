// src/components/EmailListItem.tsx

import { Star, StarOutline } from "@mui/icons-material";
import { Box, IconButton, ListItemButton, ListItemText } from "@mui/material";
import { memo } from "react";
import theme from "../../styles/theme";
import { Email } from "../../types/Email";
import { formatEmailAddress, stripSpaces } from "../../utils/helpers";

interface EmailListItemProps {
    email: Email;
    selected: boolean;
    onSelect: (id: string) => void;
    onStarClick: () => void;
}

const EmailListItem: React.FC<EmailListItemProps> = memo(({
    email,
    selected,
    onSelect,
    onStarClick
}) => {

    const handleSelect = () => {
        onSelect(email.id);
    };

    return (
        <ListItemButton
            selected={selected}
            onClick={handleSelect}
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
                <EmailContent subject={email.subject} sender={email.sender} />

                {/* Star Icon */}
                <IconButton
                    sx={{ width: '48px', height: '48px', '&:hover': { backgroundColor: theme.palette.action.focus } }}
                    edge="end"
                    onClick={onStarClick}
                >
                    {email.starred ? <Star sx={{ color: '#fbc02d' }} /> : <StarOutline />}
                </IconButton>
            </Box>

            {/* Footer: Email Date */}
            <Box display="flex" width="100%" justifyContent="flex-end">
                <EmailFooter date={email.date} />
            </Box>
        </ListItemButton>
    );  
}, (prevProps, nextProps) => {
    return prevProps.selected === nextProps.selected && prevProps.email.starred === nextProps.email.starred;
});

const EmailFooter: React.FC<{ date: string }> = memo(({ date }) => {
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
const EmailContent: React.FC<{ subject: string; sender: string }> = memo(({ subject, sender }) => {
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

export default EmailListItem;
