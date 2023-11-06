import { Box, Fade } from '@mui/material';

function FormError({ error }: { error: string | undefined }) {
  if (error == null) {
    return null;
  }
  return (
    <Fade in timeout={700}>
      <Box
        component="span"
        data-testid="error-message"
        sx={{
          backgroundColor: (theme) => theme.palette.error.main,
          color: (theme) => theme.palette.getContrastText(theme.palette.error.main),
          px: 1,
          py: 0.5,
          position: 'relative',
          display: 'block',
          maxWidth: 'max-content',
          zIndex: 1,
          '&::before': {
            content: '""',
            backgroundColor: (theme) => theme.palette.error.main,
            position: 'absolute',
            top: -5,
            height: '16px',
            width: '16px',
            transform: 'rotate(45deg)',
            zIndex: -1,
          },
        }}
      >
        {error}
      </Box>
    </Fade>
  );
}

export { FormError };
