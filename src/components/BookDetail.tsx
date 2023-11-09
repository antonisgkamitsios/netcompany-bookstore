import { Alert, Box, Skeleton, Stack, Typography } from '@mui/material';
import { useBook } from '~/queries/books';

import bookImage from '~/assets/book-placeholder.png?w=400&format=webp&imagetools';
import { BookDetailList } from './BookDetailList';
import dayjs from 'dayjs';

function BookDetail({ id }: { id: string }) {
  const { isLoading, error, data: book } = useBook(id);

  if (isLoading) {
    return <Skeleton variant="rectangular" width="100%" height={400} data-testid="loading" />;
  }
  if (error instanceof Error) {
    return (
      <Alert data-testid="error-message" severity="error" sx={{ mt: 4 }}>
        Something wrong has happened and we could not retrieve the books at the moment
      </Alert>
    );
  }

  return (
    <>
      <Typography variant="h4" textAlign="center">
        {book?.title}
      </Typography>
      <Typography variant="h5" color="text.secondary">
        {book?.subtitle}
      </Typography>
      <Typography color="text.secondary">{book?.description}</Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" gap={{ xs: 4, sm: 8 }} width="100%">
        <Box
          sx={{
            backgroundColor: (theme) => theme.palette.grey['A100'],
            border: (theme) => `2px solid ${theme.palette.grey['300']}`,
            p: 2,
            width: '100%',
            maxWidth: 400,
          }}
        >
          <img src={bookImage} />
        </Box>
        <BookDetailList
          details={[
            { label: 'publisher', value: book!.publisher },
            { label: 'published', value: dayjs(book!.published).format('DD-MM-YYYY') },
            { label: 'author', value: book!.author },
            { label: 'pages', value: book!.pages },
            { label: 'website', value: book!.website },
            { label: 'isbn', value: book!.isbn },
          ]}
        />
      </Stack>
    </>
  );
}

export { BookDetail };
