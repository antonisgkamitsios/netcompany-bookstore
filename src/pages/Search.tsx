import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { BookList } from '~/components/BookList';
import { SearchInput } from '~/components/SearchInput';

function Search() {
  const [search, setSearch] = useState('');

  return (
    <Stack textAlign="center" gap={2}>
      <Typography variant="h4" textAlign="center">
        Search your book
      </Typography>

      <SearchInput search={search} setSearch={setSearch} />

      <BookList search={search} />
    </Stack>
  );
}

export { Search };
