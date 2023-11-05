import { Alert, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';

import { useFilters, useSetFilters } from '~/contexts/FilterProvider';

import { useAuthors, usePublishers } from '~/queries/books';

import { Filters as FiltersType } from '~/types';

type FilterWithId = Partial<{
  [key in keyof FiltersType]: string | undefined;
}> & { id: number };

type FilterProps<T extends FilterWithId> = {
  label: string;
  name: keyof FiltersType;
  isLoading: boolean;
  options: T[];
};

function Filter<T extends FilterWithId>({ label, name, isLoading, options }: FilterProps<T>) {
  const filters = useFilters();
  const setFilters = useSetFilters();

  const handleChange = (e: SelectChangeEvent) => {
    setFilters((prevFilters) => ({ ...prevFilters, [e.target.name]: e.target.value }));
  };

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
        value={filters[name] || ''}
        onChange={handleChange}
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

function Filters() {
  const publishers = usePublishers();

  const authors = useAuthors();

  if (publishers.error instanceof Error || authors.error instanceof Error) {
    return <Alert severity="error">Something went wrong</Alert>;
  }

  return (
    <Stack direction="row" gap={1} alignItems="center">
      <TuneIcon />
      <Filter label="Publisher" name="publisher" isLoading={publishers.isLoading} options={publishers.data || []} />
      <Filter label="Author" name="author" isLoading={authors.isLoading} options={authors.data || []} />
    </Stack>
  );
}

export { Filters };
