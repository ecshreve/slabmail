// src/components/EmailList.tsx

import React, { useContext } from 'react';
import { EmailContext } from '../../contexts/EmailContext';

const EmailList: React.FC = () => {
  const { emails } = useContext(EmailContext);

  return (
    <div>
      {emails.map((email) => (
        <div key={email.id}>
          <h3>{email.subject}</h3>
          <p>From: {email.sender}</p>
          {/* Link to EmailDetail component */}
        </div>
      ))}
    </div>
  );
};

export default EmailList;
