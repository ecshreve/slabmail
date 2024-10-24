// src/components/EmailList.tsx

import { Star, StarOutline } from '@mui/icons-material';
import {
  Box,
  IconButton,
  List,
  Paper,
  Tooltip
} from '@mui/material';
import { useLiveQuery } from 'dexie-react-hooks';
import React, { useState } from 'react';
import { Email } from '../../types/Email';
import { db } from '../../utils/dbdexie';
import tracer from '../../utils/otel';
import CustomPagination from '../shared/CustomPagination';
import LoadingSpinner from '../shared/LoadingSpinner';
import EmailListItem from './EmailListItem';
interface EmailListProps {
  selectedEmailId: string | null;
  onSelect: (id: string) => void;
  onStarClick: (email: Email) => void;
}

const EmailList: React.FC<EmailListProps> = ({ selectedEmailId, onSelect, onStarClick }) => {
  const [filterStarred, setFilterStarred] = useState<boolean>(false);

  const emails = useLiveQuery(async () => {
    tracer.startActiveSpan("EmailList", async (span) => {
      const emails = await db.emails.toArray();
      return emails.filter((email) => filterStarred ? email.starred : true);
    });
  }, [filterStarred]);

  if (!emails) return (<LoadingSpinner />);

  // const [indexRange, setIndexRange] = useState<{ start: number, end: number }>({ start: 0, end: 5 });
  // const totalPages = Math.ceil(emails?.length! / 5);

  // const handlePageChange = (page: number) => {
  //   setIndexRange({ start: (page - 1) * 5, end: page * 5 });
  // };

  // const currentEmails = emails?.slice(indexRange.start, indexRange.end);

  return (
    <>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" p={1}>
        <CustomPagination
          totalPages={9}
          onPageChange={() => { }}
        />
        {/* Starred Emails Filter */}
        <Paper elevation={1} sx={{ padding: '0px' }} >
          <Box display="flex" alignItems="center">
            <Tooltip title={filterStarred ? 'Show All Emails' : 'Show Starred Emails'}>
              <IconButton onClick={() => setFilterStarred(!filterStarred)}>
                {filterStarred ? <Star sx={{ color: '#fbc02d' }} /> : <StarOutline />}
              </IconButton>
            </Tooltip>
          </Box>
        </Paper>
      </Box>
      <List>
        {emails.map((em ail) => (
          <EmailListItem
            key={email.id}
            email={email}
            selected={selectedEmailId === email.id}
            onSelect={onSelect}
            onStarClick={() => onStarClick(email)}
          />
        ))}
      </List>
    </>
  );
};

export default EmailList;
