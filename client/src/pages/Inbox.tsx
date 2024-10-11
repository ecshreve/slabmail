import React, { useEffect, useState } from 'react';
import EmailList from '../components/email/EmailList';
import ErrorComponent from '../components/shared/ErrorComponent';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { fetchEmails } from '../services/emailService'; // API service
import { Email } from '../types/Email';
const Inbox: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getEmails = async () => {
      try {
        const fetchedEmails = await fetchEmails(); // Fetch emails from the backend
        setEmails(fetchedEmails);
      } catch (err) {
        setError('Failed to fetch emails.');
      } finally {
        setLoading(false);
      }
    };

    getEmails();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorComponent message={error} />;

  return <EmailList emails={emails} onEmailClick={(id) => window.location.href = `/email/${id}`} />;
};

export default Inbox;
