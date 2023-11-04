import { Box, Divider, Stack, Typography } from '@mui/material';
import { useState } from 'react';
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

      <Box sx={{ width: 'min(1248px, 100%)' }} margin="auto">
        <SearchInput search={search} setSearch={setSearch} />

        <Filters />
        <Divider sx={{ my: 2 }} />

        <BookList search={search} />
      </Box>
    </Stack>
  );
}

export { Search };
