// src/Emails.tsx
import { Box, CircularProgress, Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Emails: React.FC = () => {
    const [emails, setEmails] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await fetch('/api/emails');
                const data = await response.json();
                setEmails(data);
            } catch (error) {
                console.error('Error fetching emails:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmails();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h4" align="center" gutterBottom>
                Your Emails
            </Typography>
            <List>
                {emails.map((email) => (
                    <ListItem key={email.id} divider>
                        <ListItemText
                            primary={`From: ${email.from}`}
                            secondary={
                                <>
                                    <Typography component="span" variant="body2">
                                        Subject: {email.subject}
                                    </Typography>
                                    <br />
                                    Snippet: {email.snippet}
                                </>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default Emails;
