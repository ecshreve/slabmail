// src/hooks/useOnlineStatus.ts

import { useEffect, useState } from 'react';

export const useOnlineStatus = () => {
  const [online, setOnline] = useState(navigator.onLine);

  const updateOnlineStatus = () => setOnline(navigator.onLine);

  useEffect(() => {
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return online;
};
