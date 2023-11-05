import { useState } from 'react';
import { Stack, Typography } from '@mui/material';

import { BookList } from '~/components/BookList';
import { Filters } from '~/components/Filters';
import { SearchInput } from '~/components/SearchInput';

function Search() {
  const [search, setSearch] = useState('');

  return (
    <Stack textAlign="center" gap={2}>
      <Typography variant="h4" textAlign="center">
        Search your book
      </Typography>

      <Stack gap={2} sx={{ width: 'min(1248px, 100%)' }} margin="auto">
        <SearchInput search={search} setSearch={setSearch} />

        <Filters />

        <BookList search={search} />
      </Stack>
    </Stack>
  );
}

export { Search };
