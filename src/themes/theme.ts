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
      display: 'block',
      border: `1px solid ${theme.primary.main}`,
      padding: '16px',
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        width: '0',
        height: '0',
        border: '2px solid transparent',
      },
      '&::before': {
        bottom: 0,
        right: 0,
      },
      '&::after': {
        top: 0,
        left: 0,
      },
      '&:hover': {
        opacity: 1,
        '&::before, &::after': {
          width: '100%',
          height: '100%',
        },
        '&::before': {
          borderBottomColor: theme.primary.main,
          borderLeftColor: theme.primary.main,
          transition: 'width 0.25s ease-out, height 0.25s ease-out 0.25s',
        },
        '&::after': {
          borderTopColor: theme.primary.main,
          borderRightColor: theme.primary.main,
          transition: 'border-color 0s ease-out 0.5s, width 0.25s ease-out 0.5s, height 0.25s ease-out 0.75s',
        },
      },
    },
  }),
});

export { theme };
