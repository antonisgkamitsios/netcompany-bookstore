import { Link } from 'react-router-dom';
import { Typography, Link as MuiLink, Stack } from '@mui/material';

function NotFound() {
  return (
    <Stack textAlign="center" sx={{ mt: 5, alignItems: 'center', gap: 2 }}>
      <Typography variant="h4">Ooh, looks like the page you are looking for is not found 👀</Typography>

      <MuiLink underline="none" component={Link} to="/" variant="animatedLink">
        Go back to home
      </MuiLink>
    </Stack>
  );
}

export { NotFound };
