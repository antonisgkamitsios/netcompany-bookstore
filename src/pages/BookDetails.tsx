import { Navigate, useParams } from 'react-router-dom';
import { Stack } from '@mui/material';
import { BookDetail } from '~/components/BookDetail';

function BookDetails() {
  const { bookId } = useParams();

  // if the book id does not match a number we probably don't want to be in here
  if (!bookId?.match(/^\d+$/)) {
    return <Navigate to="/page-not-found" replace />;
  }

  /**  render a component that will contain all the hooks and stuff.
    Could put them inline in here but react wouldn't like putting hooks under
    my if, so I would write them on top and now I have code that will be executed even
    if my component will never render (the bookId is not a number)
  */
  return (
    <Stack textAlign="center" gap={2} alignItems="center" maxWidth={1000} mx="auto">
      <BookDetail id={bookId} />
    </Stack>
  );
}

export { BookDetails };
