import { Alert, Skeleton, Stack } from '@mui/material';
import { useBooks } from '~/queries/books';
import { BookCard } from './BookCard';

function BookList({ search }: { search: string }) {
  // todo: add search as argument in query hook to extract the filtering logic
  const books = useBooks();

  if (books.isLoading) {
    return (
      <Stack direction="row" flexWrap="wrap" gap={2} maxWidth={1400} margin="auto">
        {[...Array(8)].map((_, index) => (
          <Skeleton key={index} variant="rectangular" width={300} height={300} />
        ))}
      </Stack>
    );
  }

  if (books.error instanceof Error) {
    return (
      <Alert severity="error">Something wrong has happened and we could not retrieve the books at the moment</Alert>
    );
  }

  const filteredBooks = books.data?.filter(
    (book) => book.title.toLowerCase().includes(search) || book.author.toLowerCase().includes(search)
  );

  return (
    <Stack direction="row" flexWrap="wrap" gap={2} justifyContent="center">
      {filteredBooks?.length === 0 ? (
        <Alert severity="info">No books found matching the current filters</Alert>
      ) : (
        filteredBooks?.map((book) => <BookCard key={book.id} book={book} />)
      )}
    </Stack>
  );
}

export { BookList };
