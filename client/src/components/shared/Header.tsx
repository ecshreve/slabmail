// /components/Header.tsx
import { Search as SearchIcon } from '@mui/icons-material';
import { AppBar, Box, InputBase, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import theme from '../../styles/theme';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigator = useNavigate();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Here you would call a search API or filter function with searchQuery
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main, borderRadius: '5px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo/Title */}
        <Typography variant="h6" sx={{ cursor: 'pointer', textDecoration: 'none', color: 'white' }} onClick={() => navigator('/')}>
          slabmail
        </Typography>

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
