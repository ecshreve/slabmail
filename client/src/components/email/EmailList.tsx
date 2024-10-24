// src/components/EmailList.tsx

import {
  List
} from '@mui/material';
import React from 'react';
import { Email } from '../../types/Email';
import LoadingSpinner from '../shared/LoadingSpinner';
import EmailListItem from './EmailListItem';

interface EmailListProps {
  items: Email[];
  selectedId: string | null;
  onSelectEmail: (id: string) => void;
}

const EmailList: React.FC<EmailListProps> = ({ items, selectedId, onSelectEmail }) => {

  if (items.length === 0) {
    return <LoadingSpinner />;
  }

  const handleEmailSelect = (id: string) => {
    onSelectEmail(id);
  };

  return (
    <>
      <List disablePadding>
        {items.map((email) => (
          <EmailListItem
            key={email.id}
            email={email}
            selected={selectedId === email.id}
            onSelectEmail={handleEmailSelect}
          />
        ))}
      </List>

    </>
  );
};

export default EmailList;
