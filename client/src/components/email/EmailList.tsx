// src/components/EmailList.tsx

import {
  Box,
  List
} from '@mui/material';
import React, { ChangeEvent, useContext, useEffect, useMemo, useState } from 'react';
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
  const emailsPerPage = 7;

  // Filter emails based on filterStarred
  const filteredEmails = useMemo(() => {
    return filterStarred ? emails.filter((email) => email.starred) : emails;
  }, [emails, filterStarred]);

  const totalPages = useMemo(() => Math.ceil(filteredEmails.length / emailsPerPage), [filteredEmails.length, emailsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [filteredEmails.length, currentPage, totalPages, setCurrentPage]);

  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;

  const currentEmails = useMemo(() => {
    return filteredEmails.slice(indexOfFirstEmail, indexOfLastEmail);
  }, [filteredEmails, indexOfFirstEmail, indexOfLastEmail]);

  const handleEmailClick = (id: string) => {
    setSelectedId(id);
    onSelectEmail(id);
  };

  const handlePageChange = (event: ChangeEvent<unknown> | null, value: number) => {
    setCurrentPage(value);
  };

  const firstEmailNumber = indexOfFirstEmail + 1;
  const lastEmailNumber = Math.min(indexOfLastEmail, filteredEmails.length);

  return (
    <Box flex={1} overflow="auto" borderRight="1px solid #ccc" display="flex" flexDirection="column">
      <Box display="flex" flexDirection="row" justifyContent="space-between" p={2}>
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalEmails={filteredEmails.length}
          firstEmailNumber={firstEmailNumber}
          lastEmailNumber={lastEmailNumber}
          filterStarred={filterStarred}
          setFilterStarred={setFilterStarred}
          onChange={handlePageChange}
          selectedEmailPage={selectedEmailPage} 
        />
      </Box>
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
