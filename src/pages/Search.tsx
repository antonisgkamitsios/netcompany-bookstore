import { Box, Typography } from '@mui/material';
import { BookList } from '~/components/BookList';

function Search() {
  return (
    <Box textAlign="center">
      <Typography variant="h4" textAlign="center">
        Search your book
      </Typography>

      <BookList />
    </Box>
  );
}

export { Search };
