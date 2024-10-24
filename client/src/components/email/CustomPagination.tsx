// src/components/CustomPagination.tsx

import { Star, StarOutline } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
    Box,
    Divider,
    IconButton,
    Pagination,
    PaginationItem,
    Paper,
    Tooltip
} from '@mui/material';
import React, { ChangeEvent, useEffect, useMemo } from 'react';

interface CustomPaginationProps {
    // Pagination Data
    currentPage: number;
    selectedEmailPage: number | null;

    // Email Data
    totalEmails: number;

    // Filter Controls
    filterStarred: boolean;
    setFilterStarred: (filterStarred: boolean) => void;

    // Event Handlers
    onChange: (event: ChangeEvent<unknown> | null, page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
    // Pagination Data
    currentPage,
    selectedEmailPage,

    // Email Data
    totalEmails,

    // Filter Controls
    filterStarred,
    setFilterStarred,

    // Event Handlers
    onChange,
}) => {
    const emailsPerPage = 7;
    const totalPages = useMemo(() => Math.ceil(totalEmails / emailsPerPage), [totalEmails, emailsPerPage]);
    const indexOfLastEmail = currentPage * emailsPerPage;
    const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
    const firstEmailNumber = indexOfFirstEmail + 1;
    const lastEmailNumber = Math.min(indexOfLastEmail, totalEmails);

    useEffect(() => {
        if (currentPage > totalPages) {
            onChange(null, totalPages || 1);
        }
    }, [currentPage, totalPages, onChange]);

    // Handlers for pagination navigation
    const handlePrev = () => currentPage > 1 && onChange(null, currentPage - 1);
    const handleNext = () => currentPage < totalPages && onChange(null, currentPage + 1);

    // Render custom pagination items
    // If the selected email page is not the current page, render a divider under it
    const renderPaginationItem = (item: any) => (
        <>
            <PaginationItem {...item} />
            {selectedEmailPage !== currentPage && item.page === selectedEmailPage && <Divider />}
        </>
    );

    return (
        <Paper elevation={1} sx={{ padding: '0px' }} >
            <Box display="flex" alignItems="center" flexWrap="nowrap" justifyContent="space-between" width="100%">
                {/* Pagination Controls */}
                <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="nowrap" width="100%">
                    <IconButton onClick={handlePrev} disabled={currentPage === 1}>
                        <ArrowBackIcon />
                    </IconButton>

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
                        renderItem={renderPaginationItem}
                    />

                    <IconButton onClick={handleNext} disabled={currentPage === totalPages}>
                        <ArrowForwardIcon />
                    </IconButton>

                    {/* <Typography variant="body2">
                        {firstEmailNumber}-{lastEmailNumber} of {totalEmails}
                    </Typography> */}
                </Box>

                {/* Starred Emails Filter */}
                <Box display="flex" alignItems="center" p={2}>
                    <Tooltip title={filterStarred ? 'Show All Emails' : 'Show Starred Emails'}>
                        <IconButton onClick={() => setFilterStarred(!filterStarred)}>
                            {filterStarred ? <Star sx={{ color: '#fbc02d' }} /> : <StarOutline />}
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        </Paper>
    );
};

export default CustomPagination;
