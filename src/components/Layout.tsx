import { PropsWithChildren } from 'react';
import { AppBar, Box, Typography } from '@mui/material';

import { useStateRef } from '../hooks/useStateRef';

function Layout({ children }: PropsWithChildren) {
  const [ref, height] = useStateRef((node) => node.getBoundingClientRect().height);

  return (
    <>
      <AppBar ref={ref}>
        <Typography textAlign="center" variant="h3">
          Bookstore
        </Typography>
      </AppBar>
      <Box
        sx={{
          mt: `${height}px`,
          pb: 4,
          px: 2,
          overflow: 'hidden',
          maxWidth: 1400,
          mx: 'auto',
          minHeight: `calc(100vh - ${height}px )`,
        }}
      >
        {children}
      </Box>
    </>
  );
}

export { Layout };
