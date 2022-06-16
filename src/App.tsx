import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, Typography } from '@mui/material';
import { Rocket } from '@mui/icons-material';

function App() {
  return (
    <div className="App">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 64,
        }}
      >
        <Typography>Hello there</Typography>
        <Rocket />
      </Box>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Editt <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
