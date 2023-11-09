import { Box, Stack, Typography } from '@mui/material';
import { Book } from '~/types';

function BookDetailItem({ label, value }: { label: string; value: string | number }) {
  return (
    <Box
      display="flex"
      sx={{
        border: (theme) => `2px solid ${theme.palette.grey['300']}`,
        p: 1,
        justifyContent: 'space-between',
        borderRadius: 2,
      }}
    >
      <Typography sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{label}:</Typography>
      <Typography>{value}</Typography>
    </Box>
  );
}

type BookDetail<K extends keyof Book> = {
  label: K;
  value: K extends infer Item extends keyof Book ? Book[Item] : never;
};
type BookDetails = BookDetail<keyof Omit<Book, 'id'>>[];

function BookDetailList({ details }: { details: BookDetails }) {
  return (
    <Stack
      sx={{
        backgroundColor: (theme) => theme.palette.grey['A100'],
        gap: 2,
        py: 4,
        px: 2,
        borderRadius: 2,
        width: '100%',
      }}
    >
      {details.map(({ label, value }) => (
        <BookDetailItem key={label} label={label} value={value} />
      ))}
    </Stack>
  );
}

export { BookDetailList };
