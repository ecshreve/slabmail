import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmailActions from '../components/email/EmailAction';
import EmailDetails from '../components/email/EmailDetails';
import ErrorComponent from '../components/shared/ErrorComponent';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import { archiveEmail, fetchEmailById, markEmailAsRead, starEmail } from '../services/emailService'; // Assume these are in emailService

const EmailView: React.FC = () => {
  const { emailId } = useParams<{ emailId: string }>(); // Retrieve emailId from URL params
  const navigate = useNavigate(); // For navigating back after actions
  const [email, setEmail] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getEmailDetails = async () => {
      if (!emailId) return;
      try {
        const fetchedEmail = await fetchEmailById(emailId); // Fetch single email details by ID
        setEmail(fetchedEmail);
      } catch (err) {
        setError('Failed to fetch email details.');
      } finally {
        setLoading(false);
      }
    };

    getEmailDetails();
  }, [emailId]); // Re-run the effect if the emailId changes

  const handleStar = async () => {
    if (!emailId) return;
    try {
      await starEmail(emailId);
    } catch (err) {
      setError('Failed to star the email.');
    }
  };

  const handleMarkAsRead = async () => {
    if (!emailId) return;
    try {
      await markEmailAsRead(emailId);
      setEmail({ ...email, isRead: true }); // Update the email state to reflect "read" status
    } catch (err) {
      setError('Failed to mark the email as read.');
    }
  };

  const handleArchive = async () => {
    if (!emailId) return;
    try {
      await archiveEmail(emailId);
      navigate('/'); // Navigate back to inbox after archiving
    } catch (err) {
      setError('Failed to archive the email.');
    }
  };

  // Show loading spinner while fetching email details
  if (loading) return <LoadingSpinner />;

  // Show error message if something went wrong
  if (error) return <ErrorComponent message={error} />;

  return (
    <div>
      {email ? (
        <>
          <EmailDetails email={email} />
          <EmailActions
            starred={email.labelIds.includes('STARRED')}
            onStar={handleStar}
            onMarkAsRead={handleMarkAsRead}
            onArchive={handleArchive}
          />
        </>
      ) : (
        <p>No email found.</p>
      )}
    </div>
  );
};

export default EmailView;
