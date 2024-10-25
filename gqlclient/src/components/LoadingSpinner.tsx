import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const LoadingSpinner: React.FC = () => (
  <Box display="flex" justifyContent="center" m={4}>
    <CircularProgress />
  </Box>
);

export default LoadingSpinner;
