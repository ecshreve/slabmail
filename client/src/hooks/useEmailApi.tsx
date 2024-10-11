// /hooks/useEmailApi.ts
import { useEffect, useState } from 'react';
import { useEmailContext } from '../contexts/EmailContext';

interface UseEmailApiReturn {
  loading: boolean;
  error: string | null;
  refreshEmails: () => Promise<void>;
  refreshLabels: () => Promise<void>;
}

export const useEmailApi = (): UseEmailApiReturn => {
  const { emails, setEmails, labels, setLabels } = useEmailContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLabels = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/labels');
      const data = await response.json();
      setLabels(data);
    } catch (err) {
      setError('Failed to fetch labels.');
    } finally {
      setLoading(false);
    }
  };

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

  const refreshLabels = async () => {
    await fetchLabels();
  };

  useEffect(() => {
    fetchEmails();
    fetchLabels();
  }, []); // Fetch emails on component mount

  return { loading, error, refreshEmails, refreshLabels };
};
