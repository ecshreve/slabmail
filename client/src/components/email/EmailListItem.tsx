import { Star, StarOutline } from "@mui/icons-material";
import { Box, IconButton, ListItemButton, ListItemText } from "@mui/material";
import theme from "../../styles/theme";
import { Email } from "../../types/Email";
import { formatEmailAddress, stripSpaces } from "../../utils/helpers";

interface EmailListItemProps {
    email: Email;
    selectedEmailId: string | null;
    handleSelectEmail: (id: string) => void;
    toggleStarred: (id: string) => void;
}

const EmailListItem: React.FC<EmailListItemProps> = ({ email, selectedEmailId, handleSelectEmail, toggleStarred }) => {
    return (
        <ListItemButton
            selected={selectedEmailId === email.id}
            onClick={() => handleSelectEmail(email.id)}
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
            }}>
            <Box display="flex" flexDirection="row" width="100%" justifyContent="space-between">
                <ListItemText primary={stripSpaces(email.subject)} primaryTypographyProps={{
                    sx: {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                    },
                }}
                secondary={`${formatEmailAddress(email.sender)}`}
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
                <IconButton
                    sx={{
                        width: '48px',
                        height: '48px',
                        '&:hover': {
                            backgroundColor: theme.palette.action.focus,
                        }
                    }}
                    edge="end"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevents triggering the email selection
                        toggleStarred(email.id);
                    }}
                >
                    {email.starred ? <Star sx={{ color: '#fbc02d' }} /> : <StarOutline />}
                </IconButton>
            </Box>
            <Box display="flex" flexDirection="row" width="100%" textAlign="right">
                <ListItemText secondary={`${new Date(parseInt(email.date)).toLocaleString()}`} sx={{ fontSize: '14px' }} />
            </Box>
        </ListItemButton>
    );
};

export default EmailListItem;
