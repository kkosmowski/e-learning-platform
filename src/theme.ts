import { createTheme, ThemeOptions } from '@mui/material';
import colors from './colors';

export const consts = {
  navbarHeight: 64,
  menuWidth: 200,
  containerPadding: 16,
};

const baseThemeOptions: ThemeOptions = {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          paddingTop: 4,
          paddingBottom: 4,
        },
        contained: {
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          ':last-child': {
            padding: 16,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: 'inherit',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {},
      },
    },
  },
  typography: {
    fontFamily: 'Lato, sans-serif',
    h1: {
      fontSize: 18,
      fontWeight: 400,
    },
    h2: {
      fontSize: 22,
      fontWeight: 400,
    },
  },
  palette: {
    background: colors.background,
    error: colors.error,
    info: colors.info,
    mode: 'light',
    primary: colors.primary,
    secondary: colors.secondary,
    success: colors.success,
    text: colors.text,
    warning: colors.warning,
  },
};

const theme = createTheme(baseThemeOptions);

export default theme;
