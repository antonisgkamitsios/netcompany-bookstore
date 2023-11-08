import { useState } from 'react';
import { Fab, Stack, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { BookList } from '~/components/BookList';
import { Filters } from '~/components/Filters';
import { SearchInput } from '~/components/SearchInput';
import { Link } from 'react-router-dom';

function Search() {
  const [search, setSearch] = useState('');

  return (
    <Stack textAlign="center" gap={2}>
      <Typography variant="h4" textAlign="center">
        Search your book
      </Typography>

      <Stack gap={2} sx={{ width: 'min(1248px, 100%)' }} margin="auto">
        <SearchInput search={search} setSearch={setSearch} />

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Filters />
          <Tooltip title={<Typography variant="body2">Add new book</Typography>}>
            <Fab color="success" aria-label="add" data-testid="add-book" component={Link} to="add-book">
              <AddIcon />
            </Fab>
          </Tooltip>
        </Stack>

        <BookList search={search} />
      </Stack>
    </Stack>
  );
}

export { Search };
