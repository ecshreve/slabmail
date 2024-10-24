// src/components/EmailListItem.tsx

import { Star, StarOutline } from "@mui/icons-material";
import { Box, IconButton, ListItemButton, ListItemText } from "@mui/material";
import theme from "../../styles/theme";
import { Email } from "../../types/Email";
import { formatEmailAddress, stripSpaces } from "../../utils/helpers";

interface EmailListItemProps {
    // Email Data
    email: Email;
    selectedEmailId: string | null;

    // Handlers
    onSelectEmail: (id: string) => void;
    onToggleStarred: (id: string) => void;
}

const EmailListItem: React.FC<EmailListItemProps> = ({
    email,
    selectedEmailId,
    onSelectEmail,
    onToggleStarred,
}) => {
    // Prevent propagation of click event to avoid selecting email when starring it
    const handleStarClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onToggleStarred(email.id);
    };

    return (
        <ListItemButton
            selected={selectedEmailId === email.id}
            onClick={() => onSelectEmail(email.id)}
            sx={{
                padding: '8px 12px',
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
                    onClick={handleStarClick}
                >
                    {email.starred ? <Star sx={{ color: '#fbc02d' }} /> : <StarOutline />}
                </IconButton>
            </Box>

            {/* Footer: Email Date */}
            <Box display="flex" width="100%" justifyContent="flex-end">
                <ListItemText
                    secondary={new Date(parseInt(email.date)).toLocaleString()}
                    sx={{ fontSize: '14px' }}
                />
            </Box>
        </ListItemButton>
    );
};

// Reusable Component for Email Content (Subject and Sender)
const EmailContent: React.FC<{ subject: string; sender: string }> = ({ subject, sender }) => (
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

export default EmailListItem;
