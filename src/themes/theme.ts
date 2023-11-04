import { CSSInterpolation, createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    animatedLink: CSSInterpolation;
  }

  interface TypographyVariantsOptions {
    animatedLink?: CSSInterpolation;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    animatedLink: true;
  }
}

const FONT_FAMILY = 'Roboto, Helvetica, Arial, sans-serif';

const theme = createTheme({
  typography: (theme) => ({
    animatedLink: {
      opacity: 0.6,
      fontSize: '1.5rem',
      fontFamily: FONT_FAMILY,
      position: 'relative',
      transition: 'all .2s ease',
      '&::after': {
        content: '""',
        position: 'absolute',
        width: '0',
        height: '1px',
        bottom: '0',
        left: '0',
        backgroundColor: theme.primary.main,
        transition: 'all .4s ease',
      },
      '&:hover': {
        opacity: 1,
        '&::after': {
          width: '100%',
        },
      },
    },
  }),
});

export { theme };
