import { Box, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Box textAlign="center" sx={{ mt: 5 }}>
      <Typography variant="h4">Ooh, looks like the page you are looking for is not found 👀</Typography>

      <MuiLink underline="none" component={Link} to="/" variant="animatedLink">
        Go back to home
      </MuiLink>
    </Box>
  );
}

export { NotFound };
