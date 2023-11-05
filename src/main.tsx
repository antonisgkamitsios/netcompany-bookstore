import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from '@mui/material';
import { theme } from './themes/theme.ts';

import { makeServer } from './server.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FilterProvider } from './contexts/FilterProvider.tsx';

const queryClient = new QueryClient();

// mock server, data are stored in memory
makeServer();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <FilterProvider>
          <App />
        </FilterProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
