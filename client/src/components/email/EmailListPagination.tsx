import { Star, StarOutline } from "@mui/icons-material";
import { Box, IconButton, Paper, Tooltip } from "@mui/material";
import { ChangeEvent } from "react";
import CustomPagination from "../shared/CustomPagination";

interface EmailListPaginationProps {
  currentPage: number;
  selectedEmailPage: number | null;
  totalItems: number;
  itemsPerPage: number;
  filterStarred: boolean;
  setFilterStarred: (value: boolean) => void;
  onChange: (event: ChangeEvent<unknown> | null, page: number) => void;
}

const EmailListPagination: React.FC<EmailListPaginationProps> = ({ currentPage, totalItems, itemsPerPage, filterStarred, setFilterStarred, onChange, selectedEmailPage }) => {
  if (totalItems === 0) {
    return null;
  }

  return (
    <>
      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" p={1}>
        <CustomPagination
          currentPage={currentPage}
          selectedEmailPage={selectedEmailPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          filterStarred={filterStarred}
          setFilterStarred={setFilterStarred}
          onChange={onChange}
        />
        {/* Starred Emails Filter */}
        <Paper elevation={1} sx={{ padding: '0px' }} >
          <Box display="flex" alignItems="center">
            <Tooltip title={filterStarred ? 'Show All Emails' : 'Show Starred Emails'}>
              <IconButton onClick={() => setFilterStarred(!filterStarred)}>
                {filterStarred ? <Star sx={{ color: '#fbc02d' }} /> : <StarOutline />}
              </IconButton>
            </Tooltip>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default EmailListPagination;