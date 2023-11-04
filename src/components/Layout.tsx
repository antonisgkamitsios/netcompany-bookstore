import { AppBar, Box, Typography } from '@mui/material';
import { useStateRef } from '../hooks/useStateRef';
import { PropsWithChildren } from 'react';

function Layout({ children }: PropsWithChildren) {
  const [ref, height] = useStateRef((node) => node.getBoundingClientRect().height);

  return (
    <>
      <AppBar ref={ref}>
        <Typography textAlign="center" variant="h3">
          Bookstore
        </Typography>
      </AppBar>
      <Box sx={{ mt: `${height}px`, mx: 2, overflow: 'hidden', minHeight: `calc(100vh - ${height}px )` }}>
        {children}
      </Box>
    </>
  );
}

export { Layout };
