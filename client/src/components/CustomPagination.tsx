// src/components/CustomPagination.tsx

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
    Box,
    IconButton,
    Pagination,
    Paper,
} from '@mui/material';
import React from 'react';

interface CustomPaginationProps {
  totalPages: number;
  currentPage: number;
  onChange: (event: React.ChangeEvent<unknown> | null, page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ totalPages, currentPage, onChange }) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onChange(null, currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onChange(null, currentPage + 1);
    }
  };

  return (
    <Paper elevation={2} sx={{ width: '100%' }} >

    <Box display="flex" alignItems="center" justifyContent="center" flexWrap="nowrap" width="100%" p={1}>
        {/* Prev Arrow */}
        <IconButton onClick={handlePrev} disabled={currentPage === 1}>
            <ArrowBackIcon />
        </IconButton>

        {/* Page Numbers */}
        <Pagination
            count={totalPages}
            page={currentPage}
            onChange={onChange}
            color="primary"
            siblingCount={1}
            boundaryCount={1}
            hidePrevButton
            hideNextButton
            size="small"
        />

        {/* Next Arrow */}
        <IconButton onClick={handleNext} disabled={currentPage === totalPages}>
            <ArrowForwardIcon />
            </IconButton>   
        </Box>
    </Paper>
  );
};

export default CustomPagination;
