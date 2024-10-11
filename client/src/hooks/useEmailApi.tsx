// /hooks/useEmailApi.ts
import { useEffect, useState } from 'react';
import { useEmailContext } from '../contexts/EmailContext';

interface UseEmailApiReturn {
  loading: boolean;
  error: string | null;
  refreshEmails: () => Promise<void>;
}

export const useEmailApi = (): UseEmailApiReturn => {
  const { emails, setEmails } = useEmailContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/emails'); // Calls Express backend
      const data = await response.json();
      setEmails(data);
    } catch (err) {
      setError('Failed to fetch emails.');
    } finally {
      setLoading(false);
    }
  };

  const refreshEmails = async () => {
    await fetchEmails();
  };

  useEffect(() => {
    fetchEmails();
  }, []); // Fetch emails on component mount

  return { loading, error, refreshEmails };
};
