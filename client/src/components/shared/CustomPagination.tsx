// src/components/CustomPagination.tsx

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
    Box,
    IconButton,
    Pagination,
    Paper
} from '@mui/material';
import React, { useState } from 'react';

interface CustomPaginationProps {
    totalPages: number;
    onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
    totalPages,
    onPageChange,
}) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        onPageChange(page);
    };

    const handlePrev = () => currentPage > 1 && handlePageChange(currentPage - 1);
    const handleNext = () => currentPage < totalPages && handlePageChange(currentPage + 1);

    return (
        <Paper elevation={1} sx={{ padding: '0px' }} >
            <Box display="flex" alignItems="center" flexWrap="nowrap" justifyContent="space-between" width="100%">
                {/* Pagination Controls */}
                {totalPages > 0 && (
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <IconButton onClick={handlePrev} disabled={currentPage === 1}>
                            <ArrowBackIcon />
                        </IconButton>

                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={(_event, page) => handlePageChange(page)}
                            color="primary"
                            siblingCount={1}
                            boundaryCount={1}
                            hidePrevButton
                            hideNextButton
                            size="small"
                        />

                        <IconButton onClick={handleNext} disabled={currentPage === totalPages}>
                            <ArrowForwardIcon />
                        </IconButton>
                    </Box>
                )}
            </Box>
        </Paper>
    );
};

export default CustomPagination;
