// src/components/EmailList.tsx

import {
  Box,
  List
} from '@mui/material';
import React, { ChangeEvent, useContext, useMemo, useState } from 'react';
import { EmailContext } from '../../contexts/EmailContext';
import CustomPagination from '../shared/CustomPagination';
import EmailListItem from './EmailListItem';

interface EmailListProps {
  currentPage: number;
  selectedEmailPage: number | null;
  setCurrentPage: (page: number) => void;
  onSelectEmail: (id: string) => void;
}

const EmailList: React.FC<EmailListProps> = ({ currentPage, selectedEmailPage, setCurrentPage, onSelectEmail }) => {
  const { emails, toggleStarred } = useContext(EmailContext);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterStarred, setFilterStarred] = useState<boolean>(false);
  const [indexRange, setIndexRange] = useState<{ start: number, end: number }>({ start: 0, end: 7 });

  const filteredEmails = useMemo(() => {
    return filterStarred ? emails.filter((email) => email.starred) : emails;
  }, [emails, filterStarred]);

  const currentEmails = useMemo(() => {
    return filteredEmails.slice(indexRange.start, indexRange.end);
  }, [filteredEmails, indexRange]);

  const handleEmailClick = (id: string) => {
    setSelectedId(id);
    onSelectEmail(id);
  };

  const handlePageChange = (event: ChangeEvent<unknown> | null, value: number) => {
    setCurrentPage(value);
    setIndexRange({ start: (value - 1) * 7, end: value * 7 });
  }
  return (
    <Box 
      sx={{
        width: '400px',
        borderRight: '1px solid #ccc', 
        display: 'flex', 
        flexDirection: 'column' 
      }}
    >
      <CustomPagination
        currentPage={currentPage}
        totalEmails={filteredEmails.length}
        filterStarred={filterStarred}
        setFilterStarred={setFilterStarred}
        onChange={handlePageChange}
        selectedEmailPage={selectedEmailPage}
      />

      <List disablePadding>
        {currentEmails.map((email) => (
          <EmailListItem
            key={email.id}
            email={email}
            toggleStarred={toggleStarred}
            selectedEmailId={selectedId}
            handleSelectEmail={handleEmailClick}
          />
        ))}
      </List>
    </Box>
  );
};

export default EmailList;
