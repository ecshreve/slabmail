import { Box, Divider, Typography } from '@mui/material';
import React, { ChangeEvent, useContext, useMemo, useState } from 'react';
import EmailDetails from '../components/email/EmailDetails';
import EmailList from '../components/email/EmailList';
import EmailListPagination from '../components/email/EmailListPagination';
import Header from '../components/header/Header';
import { EmailContext } from '../contexts/EmailContext';

const PAGE_SIZE = 5;

const Inbox: React.FC = () => {
  const { emails } = useContext(EmailContext);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [selectedEmailPage, setSelectedEmailPage] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStarred, setFilterStarred] = useState<boolean>(false);
  const [indexRange, setIndexRange] = useState<{ start: number, end: number }>({ start: 0, end: PAGE_SIZE });

  const filteredEmails = useMemo(() => {
    return filterStarred ? emails.filter((email) => email.starred) : emails;
  }, [emails, filterStarred]);

  const currentEmails = useMemo(() => {
    return filteredEmails.slice(indexRange.start, indexRange.end);
  }, [filteredEmails, indexRange]);

  const handleHeaderClick = () => {
    setCurrentPage(1);
  };

  const handleEmailSelect = (id: string) => {
    setSelectedEmailId(id);
    setSelectedEmailPage(currentPage);
  };

  const handlePageChange = (event: ChangeEvent<unknown> | null, value: number) => {
    setCurrentPage(value);
    setIndexRange({ start: (value - 1) * PAGE_SIZE, end: value * PAGE_SIZE });
  }

  return (
    <>
      <Header title="slabmail" onClick={handleHeaderClick} />
      <Box display="flex" height="100vh">
        <Box
          sx={{
            width: '400px',
            borderRight: '1px solid #ccc',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <EmailListPagination
            currentPage={currentPage}
            totalItems={filteredEmails.length}
            itemsPerPage={PAGE_SIZE}
            filterStarred={filterStarred}
            setFilterStarred={setFilterStarred}
            onChange={handlePageChange}
            selectedEmailPage={selectedEmailPage}
          />
          <Divider />
          <EmailList
            items={currentEmails}
            selectedId={selectedEmailId}
            onSelectEmail={handleEmailSelect}
          />
          {filteredEmails.length > 0 && (
            <Box p={1} display="flex" alignItems="center" justifyContent="center">
              <Typography variant="body2" color="text.secondary">
                showing {indexRange.start + 1} - {filteredEmails.length < indexRange.end ? filteredEmails.length : indexRange.end} of {filteredEmails.length}
              </Typography>
            </Box>
          )}
        </Box>
        {/* Right Column: Email Details */}
        <EmailDetails
          emailId={selectedEmailId}
        />
      </Box>
    </>
  );
};

export default Inbox;
