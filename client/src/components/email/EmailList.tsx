// src/components/EmailList.tsx

import {
  Box,
  Divider,
  List
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { EmailContext } from '../../contexts/EmailContext';
import CustomPagination from '../CustomPagination';
import EmailListItem from './EmailListItem';
interface EmailListProps {
  onSelectEmail: (emailId: string) => void;
}

const EmailList: React.FC<EmailListProps> = ({ onSelectEmail }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const { emails, toggleStarred } = useContext(EmailContext);
  const emailsPerPage = 5;
  // Calculate indices for slicing the emails array
  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;

  // Get the emails for the current page
  const currentEmails = emails.slice(indexOfFirstEmail, indexOfLastEmail);


  const handlePageChange = (event: React.ChangeEvent<unknown> | null, value: number) => {
    setCurrentPage(value);
  };
  
  const handleSelectEmail = (emailId: string) => {
    setSelectedEmailId(emailId);
    onSelectEmail(emailId);
  };

  return (
    <Box flex={1} overflow="auto" borderRight="1px solid #ccc" display="flex" flexDirection="column">
      {/* Pagination Controls */}
      <CustomPagination
        totalPages={Math.ceil(emails.length / emailsPerPage)}
        currentPage={currentPage}
        onChange={handlePageChange}
      />
      <Divider />
      <List disablePadding>
        {currentEmails.map((email) => (
            <EmailListItem
              key={email.id}
              email={email}
              selectedEmailId={selectedEmailId}
              handleSelectEmail={handleSelectEmail}
              toggleStarred={toggleStarred}
            />
          ))}
        </List>
    </Box>
  );
};

export default EmailList;
