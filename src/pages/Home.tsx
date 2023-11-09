import { Link } from 'react-router-dom';
import { Divider, Typography, Link as MuiLink, Stack } from '@mui/material';

function Home() {
  return (
    <Stack sx={{ textAlign: 'center' }} gap={2}>
      <Typography variant="h4" textAlign="center">
        Welcome to our bookstore
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body1">You can find the best books and also insert your own!</Typography>

      <MuiLink
        component={Link}
        underline="none"
        to="search"
        // variant='h6'
        variant="animatedLink"
        sx={{ alignSelf: 'center' }}
      >
        Find the book you're interested in
      </MuiLink>
    </Stack>
  );
}

export { Home };
