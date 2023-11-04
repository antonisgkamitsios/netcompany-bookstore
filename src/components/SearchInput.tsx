import { Box, TextField } from '@mui/material';
import { debounceFn } from '~/utils/utilities';

type SearchInputProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

function SearchInput({ setSearch }: SearchInputProps) {
  const debounce = debounceFn(600);

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <TextField
        sx={{ width: 'min(500px,100%)' }}
        label="Search"
        onChange={(e) =>
          debounce(() => {
            setSearch(e.target.value);
          })
        }
      />
    </Box>
  );
}

export { SearchInput };
