// src/Emails.tsx
import { Box, CircularProgress, Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getEmailsFromIndexedDB, saveEmailsToIndexedDB } from './IndexedDB'; // Import IndexedDB utility functions

const Emails: React.FC = () => {
  const [emails, setEmails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cacheHits, setCacheHits] = useState(0);  // Track cache hits per email
  const [cacheMisses, setCacheMisses] = useState(0);  // Track cache misses per email
  const [totalCachedEmails, setTotalCachedEmails] = useState(0);  // Track total cached emails

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        // First, try to get cached emails
        const cachedEmails = await getEmailsFromIndexedDB();
        if (cachedEmails.length > 5) {
          const isCacheStale = cachedEmails.some((email: any) => {
            const currentDate = new Date().getTime();
            return currentDate - email.cachedAt > 3600; // 1 minute in milliseconds
          });

          if (isCacheStale) {
            setCacheMisses(cachedEmails.length);
            setTotalCachedEmails(0);
            setCacheHits(0);
          } else {
            setEmails(cachedEmails);
            setTotalCachedEmails(cachedEmails.length); // Update total cached emails
            setCacheHits(cachedEmails.length);  // Count each cached email as a hit
            setLoading(false);  // Stop loading after using cached emails
            return;  // No need to fetch from the server
          }
        }

        // No cached emails found, so fetch fresh emails from the server
        const response = await fetch('/api/emails');
        const data = await response.json();
        setEmails(data);

        // Count each fresh email as a cache miss
        setCacheMisses(data.length);

        // Save the new emails in IndexedDB
        await saveEmailsToIndexedDB(data);
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
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Your Emails
      </Typography>
      <Typography variant="body2" align="center" gutterBottom>
        Total Cached Emails: {totalCachedEmails} | Cache Hits: {cacheHits} | Cache Misses: {cacheMisses}
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
