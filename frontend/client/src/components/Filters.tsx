// src/components/Filters.tsx

import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    TextField,
} from "@mui/material";
import React, { useState } from "react";

interface FiltersProps {
  onFilterChange: (filters: {
    isStarred?: boolean;
    sender?: string;
    subjectContains?: string;
  }) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [isStarred, setIsStarred] = useState<boolean | undefined>(undefined);
  const [sender, setSender] = useState<string>("");
  const [subject, setSubject] = useState<string>("");

  const handleApplyFilters = () => {
    onFilterChange({
      isStarred,
      sender: sender.trim() || undefined,
      subjectContains: subject.trim() || undefined,
    });
  };

  const handleResetFilters = () => {
    setIsStarred(undefined);
    setSender("");
    setSubject("");
    onFilterChange({});
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      mb={4}
      flexWrap="wrap"
      data-testid="filters-component"
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={isStarred || false}
            indeterminate={isStarred === undefined}
            onChange={(e) =>
              setIsStarred(e.target.checked ? true : isStarred === true ? undefined : false)
            }
          />
        }
        label="Starred"
      />
      <TextField
        label="Sender"
        variant="outlined"
        value={sender}
        onChange={(e) => setSender(e.target.value)}
        data-testid="sender-filter"
      />
      <TextField
        label="Subject Contains"
        variant="outlined"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        data-testid="subject-filter"
      />
      <Button variant="contained" color="primary" onClick={handleApplyFilters}>
        Apply
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleResetFilters}>
        Reset
      </Button>
    </Box>
  );
};

export default Filters;
