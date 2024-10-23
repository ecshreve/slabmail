// src/components/CustomPagination.tsx

import { Star, StarOutline } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
    Box,
    IconButton,
    Pagination,
    Paper,
    Tooltip,
    Typography,
} from '@mui/material';
import React, { ChangeEvent } from 'react';

interface CustomPaginationProps {
    totalEmails: number;
    totalPages: number;
    currentPage: number;
    firstEmailNumber: number;
    lastEmailNumber: number;
    filterStarred: boolean;
    setFilterStarred: (filterStarred: boolean) => void;
    onChange: (event: ChangeEvent<unknown> | null, page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ totalPages, currentPage, firstEmailNumber, lastEmailNumber, totalEmails, filterStarred, setFilterStarred, onChange }) => {
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
        <Paper elevation={1} sx={{ width: '100%', padding: 0 }} >
            <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="nowrap" width="100%">
                <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="nowrap" width="100%">
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
                    <Typography variant="body2">
                        {firstEmailNumber}-{lastEmailNumber} of {totalEmails}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
                    {/* Starred Emails Filter */}
                    <Tooltip title={filterStarred ? 'Show All Emails' : 'Show Starred Emails'}>
                        <IconButton onClick={() => setFilterStarred(!filterStarred)}>
                            {filterStarred ? <Star sx={{ color: '#fbc02d' }} /> : <StarOutline />}
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        </Paper >
    );
};

export default CustomPagination;
