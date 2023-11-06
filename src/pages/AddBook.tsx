import { Stack, Typography } from '@mui/material';
import { AddBookForm } from '~/components/AddBookForm';

function AddBook() {
  return (
    <Stack textAlign="center" gap={2} alignItems="center">
      <Typography variant="h4" textAlign="center">
        Add Book
      </Typography>

      <AddBookForm />
    </Stack>
  );
}

export { AddBook };
