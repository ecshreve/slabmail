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
import { useInboxDispatch, useInboxState } from '../contexts/InboxContext';

interface MessageListControlsProps {
  totalMessages: number;
}

const MessageListControls: React.FC<MessageListControlsProps> = ({
  totalMessages
}) => {
  const state = useInboxState();
  const dispatch = useInboxDispatch();

  const handlePrev = () => {
    if (state.currentPage > 1) {
      dispatch({ type: 'SET_CURRENT_PAGE', payload: state.currentPage - 1 });
    }
  };

  const handleNext = () => {
    if (state.currentPage < state.totalPages) {
      dispatch({ type: 'SET_CURRENT_PAGE', payload: state.currentPage + 1 });
    }
  };

  const totalPages = Math.ceil(totalMessages / 5);

  return (
    <>
      <Paper elevation={1} sx={{ padding: '0px' }} >
        <Box display="flex" alignItems="center" flexWrap="nowrap" justifyContent="space-between" width="100%">
          {/* Pagination Controls */}
          {totalPages > 0 && (
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <IconButton onClick={handlePrev} disabled={state.currentPage === 1}>
                <ArrowBackIcon />
              </IconButton>

              <Pagination
                count={state.totalPages}
                page={state.currentPage}
                onChange={(_event, page) => dispatch({ type: 'SET_CURRENT_PAGE', payload: page })}
                color="primary"
                siblingCount={1}
                boundaryCount={1}
                hidePrevButton
                hideNextButton
                size="small"
              />

              <IconButton onClick={handleNext} disabled={state.currentPage === state.totalPages}>
                <ArrowForwardIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      </Paper>
      <Paper elevation={1} sx={{ padding: '0px' }} >
        <Box display="flex" alignItems="center">
          <Tooltip title={state.starFilter ? 'Show All Emails' : 'Show Starred Emails'}>
            <IconButton onClick={() => dispatch({ type: 'TOGGLE_STAR_FILTER', payload: !state.starFilter })}>
              {state.starFilter ? <Star sx={{ color: '#fbc02d' }} /> : <StarOutline />}
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>
    </>
  );
};

export default MessageListControls;
