import { Alert, Skeleton, Typography } from '@mui/material';
import { useBook } from '~/queries/books';

function BookDetail({ id }: { id: string }) {
  const book = useBook(id);

  if (book.isLoading) {
    return <Skeleton variant="rectangular" width="100%" height={400} data-testid="loading" />;
  }
  if (book.error instanceof Error) {
    return (
      <Alert data-testid="error-message" severity="error" sx={{ mt: 4 }}>
        Something wrong has happened and we could not retrieve the books at the moment
      </Alert>
    );
  }
  return (
    <Typography variant="h4" textAlign="center">
      {book.data?.title}
    </Typography>
  );
}

export { BookDetail };
