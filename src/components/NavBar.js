import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

const NavBar = ({ value, onChange }) => {
  return (
    <AppBar
      position="fixed"
      elevation={3}
      sx={{
        background: 'linear-gradient(90deg, #1e3a8a, #2563eb)',
        boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Typography
          variant="h6"
          role="button"
          onClick={(e) => onChange?.(e, 'home')}
          sx={{ fontWeight: 700, letterSpacing: 0.5, cursor: 'pointer', userSelect: 'none' }}
        >
          AutoMart
        </Typography>
        <Tabs
          value={value}
          onChange={onChange}
          textColor="inherit"
          TabIndicatorProps={{ style: { height: 3, background: '#93c5fd' } }}
          sx={{
            '.MuiTab-root': {
              color: '#e5e7eb',
              fontWeight: 600,
              letterSpacing: 0.4,
              textTransform: 'none',
              minWidth: 90
            },
            '.Mui-selected': { color: '#ffffff !important' },
          }}
        >
          <Tab label="Home" value="home" />
          <Tab label="Info" value="info" />
          <Tab label="Signup" value="signup" />
        </Tabs>
        <div />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;


