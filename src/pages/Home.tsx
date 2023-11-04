import { Box, Divider, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h4" textAlign="center">
        Welcome to our bookstore
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body1">You can find the best books and also insert your own!</Typography>

      <MuiLink component={Link} underline="none" to="search" variant="animatedLink">
        Find the book you're interested in
      </MuiLink>
    </Box>
  );
}

export { Home };
