// /components/Header.tsx
import { Search as SearchIcon } from '@mui/icons-material';
import { AppBar, Box, IconButton, InputBase, Toolbar, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';

interface HeaderProps {
  title: string;
  onClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onClick }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Here you would call a search API or filter function with searchQuery
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main, borderRadius: '5px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo/Title */}

        <IconButton onClick={onClick} sx={{ '&:hover': { backgroundColor: theme.palette.primary.light, borderRadius: '5px', border: '1px solid white' } }}>
          <Typography variant="h6" sx={{ cursor: 'pointer', textDecoration: 'none', color: 'white' }}>
            {title}
          </Typography>
        </IconButton>

        {/* Search Bar */}
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            borderRadius: '4px',
            padding: '0 10px',
            width: '50%',
          }}
        >
          <SearchIcon sx={{ color: 'gray', marginRight: '8px' }} />
          <InputBase
            placeholder="Search emails..."
            value={searchQuery}
            onChange={handleSearch}
            sx={{ width: '100%' }}
          />
        </Box>
        {/* <Button sx={{ marginLeft: '16px', width: '100px' }} variant="contained" color="secondary">Settings</Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
