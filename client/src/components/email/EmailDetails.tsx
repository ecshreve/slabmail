// src/components/EmailDetail.tsx

import React, { useContext, useEffect, useState } from 'react';
import { EmailContext } from '../../contexts/EmailContext';
import { Email } from '../../types/Email';
import { formatDate } from '../../utils/helpers';

interface EmailDetailProps {
  emailId: string | null;
}

const EmailDetail: React.FC<EmailDetailProps> = ({ emailId }) => {
  const { emails } = useContext(EmailContext);
  const [email, setEmail] = useState<Email | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (emailId) {
      setIsLoading(true);
      const selectedEmail = emails.find((e) => e.id === emailId) || null;
      setEmail(selectedEmail);
      setIsLoading(false);
    } else {
      setEmail(null);
    }
  }, [emailId, emails])

  const handleDelete = () => {
    if (email) {
      //deleteEmail(email.id);
      setEmail(null);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!email) {
    return (
      <div style={{ flex: '2', padding: '20px' }}>
        <p>Select an email to view its details.</p>
      </div>
    );
  }

  return (
    <div style={{ flex: '2', padding: '20px', overflowY: 'auto' }}>
      <h2>{email.subject}</h2>
      <p>
        <strong>From:</strong> {email.sender}
      </p>
      <p>
        <strong>Date:</strong> {formatDate(email.date)}
      </p>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => /* Implement Reply */ {}}>Reply</button>
        <button onClick={() => /* Implement Forward */ {}}>Forward</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <hr />
      <div>
        <p>{email.body}</p>
      </div>
    </div>
  );
};

export default EmailDetail;
