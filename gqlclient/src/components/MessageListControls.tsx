// src/components/CustomPagination.tsx

import { Star, StarOutline } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
    Box,
    IconButton,
    Pagination,
    Paper,
    Tooltip
} from '@mui/material';
import React from 'react';

interface MessageListControlsProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    currentFilter: string[];
    onStarredFilterChange: () => void;
}

const MessageListControls: React.FC<MessageListControlsProps> = ({
    totalPages,
    currentPage,
    onPageChange,
    currentFilter,
    onStarredFilterChange,
}) => {

    const handlePrev = () => currentPage > 1 && onPageChange(currentPage - 1);
    const handleNext = () => currentPage < totalPages && onPageChange(currentPage + 1);

    const filterStarred = currentFilter.includes('STARRED');
    return (
        <>
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
                            onChange={(_event, page) => onPageChange(page)}
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
        <Paper elevation={1} sx={{ padding: '0px' }} >
        <Box display="flex" alignItems="center">
          <Tooltip title={filterStarred ? 'Show All Emails' : 'Show Starred Emails'}>
            <IconButton onClick={onStarredFilterChange}>
              {filterStarred ? <Star sx={{ color: '#fbc02d' }} /> : <StarOutline />}
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>
      </>
    );
};

export default MessageListControls;
