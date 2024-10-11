// /components/Shared/ErrorComponent.tsx
import { Alert, Snackbar } from '@mui/material';
import React from 'react';

interface ErrorComponentProps {
  message: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message }) => (
  <Snackbar open={true} autoHideDuration={6000}>
    <Alert severity="error">{message}</Alert>
  </Snackbar>
);

export default ErrorComponent;
