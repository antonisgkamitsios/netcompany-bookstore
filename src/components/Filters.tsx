import TuneIcon from '@mui/icons-material/Tune';
import { Alert, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { useState } from 'react';
import { useAuthors, usePublishers } from '~/queries/books';

function Filter<T extends { id: number; [key: string]: string | number }>({
  label,
  name,
  isLoading,
  options,
}: {
  label: string;
  name: keyof T & string;
  isLoading: boolean;
  options: T[];
}) {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id={`select-label-${label}`}>{label}</InputLabel>
      <Select
        disabled={isLoading}
        size="small"
        labelId="demo-select-small-label"
        id={`select-label-${label}`}
        label={label}
        name={name}
        onChange={(e) => {
          console.log(e.target.value);
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((val) => (
          <MenuItem value={val[name]} key={val.id}>
            {val[name]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

type Filters = {
  author?: string;
  publisher?: string;
};
function Filters() {
  const publishers = usePublishers();

  const authors = useAuthors();

  const [filters, setFilters] = useState<Filters>(() => ({ author: undefined, publisher: undefined }));

  if (publishers.error instanceof Error || authors.error instanceof Error) {
    return <Alert severity="error">Something went wrong</Alert>;
  }

  const handleChange = (e: SelectChangeEvent<string>) => {
    setFilters((old) => ({ ...old, [e.target.name]: e.target.value }));
  };

  return (
    <Stack direction="row" gap={1} alignItems="center">
      <TuneIcon />
      <Filter label="Publisher" name="publisher" isLoading={publishers.isLoading} options={publishers.data || []} />
      <Filter label="Author" name="author" isLoading={authors.isLoading} options={authors.data || []} />
    </Stack>
  );
}

export { Filters };
